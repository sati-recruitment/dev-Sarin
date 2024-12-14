import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

async function main() {
    //  const patient = await db.patient.create({
    //     data: {
    //         hospitalNumber: "0000002",
    //         firstName: "Jane",
    //         lastName: "Doe",
    //         birthday: new Date("1990-01-01"),
    //         sex: "female",
    //     },
    //  });
    //  console.log(patient);
    //
    //  const encounter = await db.encounter.create({
    //    data: {
    //        transactionNumber: "0000001",
    //        visitDate: new Date("2024-02-24T00:00:00.000Z"),
    //        physicalExamination: "abnormal",
    //        diagnosis: "fever",
    //        presentIllness: "feeling unwell",
    //        patient: {
    //            connect: {
    //                hospitalNumber: "0000002",
    //            },
    //        },
    //    },
    //  });
    //  console.log("Encounter created:", encounter);
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
