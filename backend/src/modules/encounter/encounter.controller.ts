import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { encounterInfo } from "@/dto/encounterInfo.dto";

const db = new PrismaClient();

// [GET] /encounters
export const getAllEncounters = async (req: Request, res: Response) => {
    try {
        const encounters = await db.encounter.findMany({
            include: {
                patient: true,
            },
        });

        if (encounters.length === 0) {
            return res.status(404).json({ message: "No encounters found" });
        }

        res.status(200).json(encounters);
    } catch (error) {
        console.error("Error fetching encounters:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// [GET] /encounters/:transactionNumber
export const getEncounterByTransactionNumber = async (
    req: Request,
    res: Response
) => {
    const { transactionNumber } = req.params;

    try {
        const encounter = await db.encounter.findUnique({
            where: { transactionNumber },
            include: {
                patient: {
                    select: {
                        hospitalNumber: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!encounter) {
            return res.status(404).json({ message: "Encounter not found" });
        }

        res.status(200).json(encounter);
    } catch (error) {
        console.error("Error fetching encounter by transaction number:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// [POST] /encounters
export const createEncounter = async (req: Request, res: Response) => {
    const {
        transactionNumber,
        visitDate,
        physicalExamination,
        diagnosis,
        presentIllness,
        patientHospitalNumber,
    }: encounterInfo = req.body;

    // Reassign to a new variable to handle null assignment
    let finalPatientHospitalNumber = patientHospitalNumber || "null";

    try {
        const existingEncounter = await db.encounter.findUnique({
            where: { transactionNumber },
        });

        if (existingEncounter) {
            return res.status(500).json({
                error: "Transaction number already exists in the system",
            });
        }

        const newEncounter = await db.encounter.create({
            data: {
                transactionNumber,
                visitDate: new Date(visitDate),
                physicalExamination,
                diagnosis,
                presentIllness,
                patientHospitalNumber: finalPatientHospitalNumber,
            },
        });

        res.status(201).json(newEncounter);
    } catch (error) {
        console.error("Error creating encounter:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// [PUT] /encounters/:transactionNumber
export const updateEncounter = async (req: Request, res: Response) => {
    const { transactionNumber } = req.params;
    const {
        transactionNumber: bodyTransactionNumber,
        ...updates
    }: encounterInfo = req.body;

    try {
        const encounter = await db.encounter.findUnique({
            where: { transactionNumber },
        });

        if (!encounter) {
            return res.status(404).json({ error: "Encounter not found" });
        }

        if (
            bodyTransactionNumber &&
            bodyTransactionNumber !== transactionNumber
        ) {
            return res.status(500).json({
                error: "Transaction number in request body does not match request parameter",
            });
        }

        await db.encounter.update({
            where: { transactionNumber },
            data: updates,
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error updating encounter:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
