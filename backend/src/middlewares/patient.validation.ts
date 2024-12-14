import { patientInfo } from "../dto/patientInfo.dto";
import { Request, Response, NextFunction } from "express";

// Middleware to validate patient data
export const validateCreatePatientData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { hospitalNumber, firstName, lastName, birthday, sex }: patientInfo =
        req.body;

    // Check if all required fields are provided
    if (!hospitalNumber || !firstName || !lastName || !birthday || !sex) {
        return res.status(500).json({
            error: "Missing required fields. Please provide all the required data.",
        });
    }

    // Validate that sex is one of the allowed values
    const allowedSexValues = ["male", "female", "unspecified"];
    if (!allowedSexValues.includes(sex.toLowerCase())) {
        return res.status(500).json({
            error: "Invalid 'sex'. Please provide a valid value (male, female, or unspecified).",
        });
    }

    // If validation passes, move to the next middleware/controller
    next();
};

// Middleware to validate update patient data
export const validateUpdatePatientData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { hospitalNumber } = req.params;
    const {
        hospitalNumber: bodyHospitalNumber,
        firstName,
        lastName,
        birthday,
        sex,
    }: patientInfo = req.body;

    // Check if the hospital number in the body matches the hospital number in the URL
    if (hospitalNumber !== bodyHospitalNumber) {
        return res.status(500).json({
            error: "Hospital number in request body does not match request parameter",
        });
    }

    // List of required fields
    const requiredFields = [
        "hospitalNumber",
        "firstName",
        "lastName",
        "birthday",
        "sex",
    ];
    const bodyFields = Object.keys(req.body);

    // Check if all required fields are provided
    const missingFields = requiredFields.filter(
        (field) => !bodyFields.includes(field)
    );
    if (missingFields.length > 0) {
        return res.status(500).json({
            error: "Missing required fields",
            missingFields,
        });
    }

    // Check if there are any extra fields in the request body
    const extraFields = bodyFields.filter(
        (field) => !requiredFields.includes(field)
    );
    if (extraFields.length > 0) {
        return res.status(500).json({
            error: "Request body contains extra fields",
            extraFields,
        });
    }

    // Validate sex field
    const allowedSexValues = ["male", "female", "unspecified"];
    if (!allowedSexValues.includes(sex.toLowerCase())) {
        return res.status(500).json({
            error: "Invalid 'sex'. Please provide a valid value (male, female, or unspecified).",
        });
    }

    // If all validations pass, continue to the next middleware/controller
    next();
};
