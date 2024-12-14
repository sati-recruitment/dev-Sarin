import { Request, Response, NextFunction } from "express";
import { encounterInfo } from "../dto/encounterInfo.dto";

// Middleware to validate encounter data
export const validateCreateEncounterData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        transactionNumber,
        visitDate,
        physicalExamination,
        diagnosis,
        presentIllness,
        patientHospitalNumber,
    }: encounterInfo = req.body;

    // Check if all required fields are provided
    if (
        !transactionNumber ||
        !visitDate ||
        !physicalExamination ||
        !diagnosis ||
        !presentIllness
    ) {
        return res.status(500).json({
            error: "Missing required fields. Please provide all the required data.",
        });
    }

    // Validate patientHospitalNumber (optional field)
    if (patientHospitalNumber && typeof patientHospitalNumber !== "string") {
        return res.status(500).json({
            error: "Invalid patientHospitalNumber format. It should be a string.",
        });
    }

    // If validation passes, move to the next middleware/controller
    next();
};

export const validateUpdateEncounterData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { transactionNumber: bodyTransactionNumber, ...updates } = req.body;

    const allowedKeys = [
        "transactionNumber",
        "visitDate",
        "physicalExamination",
        "diagnosis",
        "presentIllness",
        "patientHospitalNumber",
    ];
    const bodyKeys = Object.keys(updates);
    const hasExtraKeys = bodyKeys.some((key) => !allowedKeys.includes(key));

    if (hasExtraKeys) {
        return res.status(500).json({
            error: "Invalid request body",
        });
    }

    // If all validations pass, continue to the next middleware/controller
    next();
};
