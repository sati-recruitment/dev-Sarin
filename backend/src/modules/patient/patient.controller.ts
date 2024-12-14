import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { patientInfo } from "@/dto/patientInfo.dto";

const db = new PrismaClient();

// GET /patients
export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await db.patient.findMany();

        if (patients.length === 0) {
            return res.status(404).json({ message: "No encounters found" });
        }
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET /patients/:hospitalNumber
export const getPatientByHospitalNumber = async (
    req: Request,
    res: Response
) => {
    const { hospitalNumber } = req.params;

    try {
        const patient = await db.patient.findUnique({
            where: { hospitalNumber },
        });

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error("Error fetching patient by hospital number:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /patients
export const createPatient = async (req: Request, res: Response) => {
    const { hospitalNumber, firstName, lastName, birthday, sex }: patientInfo =
        req.body;
    try {
        const existingPatient = await db.patient.findUnique({
            where: { hospitalNumber },
        });

        if (existingPatient) {
            return res.status(500).json({
                error: "Hospital number already exists in the system",
            });
        }

        const newPatient = await db.patient.create({
            data: {
                hospitalNumber,
                firstName,
                lastName,
                birthday: new Date(birthday),
                sex,
            },
        });
        res.status(201).json(newPatient);
    } catch (error) {
        console.error("Error creating patient:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT /patients/:hospitalNumber
export const updatePatient = async (req: Request, res: Response) => {
    const { hospitalNumber } = req.params;
    const {
        hospitalNumber: bodyHospitalNumber,
        firstName,
        lastName,
        birthday,
        sex,
    }: patientInfo = req.body;

    try {
        const patient = await db.patient.findUnique({
            where: { hospitalNumber },
        });

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        const updatedPatient = await db.patient.update({
            where: { hospitalNumber },
            data: {
                firstName,
                lastName,
                birthday: new Date(birthday),
                sex,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
