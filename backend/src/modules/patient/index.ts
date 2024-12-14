import { Router } from "express";
import * as patientController from "./patient.controller";
import {
    validateCreatePatientData,
    validateUpdatePatientData,
} from "../../middlewares/patient.validation";

export const patientRouter = Router();

// [GET] /patients/
patientRouter.get("/", patientController.getAllPatients);

// [GET] /patients/:hospitalNumber
patientRouter.get(
    "/:hospitalNumber",
    patientController.getPatientByHospitalNumber
);

// [POST] /patients
patientRouter.post(
    "/",
    [validateCreatePatientData],
    patientController.createPatient
);

// [PUT] /patients/:hospitalNumber
patientRouter.put(
    "/:hospitalNumber",
    [validateUpdatePatientData],
    patientController.updatePatient
);

// สำหรับกรณีที่ใช้ HTTP Method ที่ไม่รองรับ
patientRouter.all("/", (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});
