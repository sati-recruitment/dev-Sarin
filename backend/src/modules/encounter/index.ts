import { Router } from "express";
import * as encounterController from "./encounter.controller";
import {
    validateCreateEncounterData,
    validateUpdateEncounterData,
} from "../../middlewares/encounter.validation";

export const encounterRouter = Router();

// [GET] /encounters/
encounterRouter.get("/", encounterController.getAllEncounters);

// [GET] /encounters/:transactionNumber
encounterRouter.get(
    "/:transactionNumber",
    encounterController.getEncounterByTransactionNumber
);

// [POST] /encounters
encounterRouter.post(
    "/",
    [validateCreateEncounterData],
    encounterController.createEncounter
);

// [PUT] /encounters/:transactionNumber
encounterRouter.put(
    "/:transactionNumber",
    [validateUpdateEncounterData],
    encounterController.updateEncounter
);

// สำหรับกรณีที่ใช้ HTTP Method ที่ไม่รองรับ
encounterRouter.all("/", (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});
