export const categories = [
    { name: "Total Dispatch", info: "Total number of items dispatched" },
    { name: "Production", info: "Total number of items produced" },
    { name: "Packing", info: "Total number of items packed" },
    { name: "Sales", info: "Total sales amount in dollars" },
];

export const materialCodeOptions = [
    "GLOVES3BFTBU01",
    "GLOVES3CFTBU01",
    "GLOVES3DFTBU01",
    "GLOVES3CFTVB01",
    "GLOVES3DFTVB01",
    "GLOVES3BFTCB01",
    "GLOVES3CFTCB01",
    "GLOVE3DFTCB01",
    "GLOVES4BFTBL01",
    "GLOVE4DFTBL02",
    "GLOVES4CFTBU01",
    "GLOVE4DFTBU01",
    "GLOVES4DDTBL02",
    "GLOVES5CFTBU01",
    "GLOVES6BFTBU01",
    "GLOVES6CFTBU01",
    "GLOVES6DFTBU01"
];

export const gradeOptions = ["A", "B", "Non moving"];

// export const packingTypeOptions = [
//     "Box packing",
//     "Poly packing",
//     "50 golves",
//     "100 gloves",
// ];

export const packingTypeOptions = ["Box packing", "Poly packing"];

export const gloveOptions = [50, 100];

export const getNormalizedDate = (date) => {
        const dateObj = new Date(date); // ✅ convert string to Date object safely
        const year = dateObj.getFullYear().toString();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const day = dateObj.getDate().toString().padStart(2, "0");
        return { year, month, day };
    };



export const isValidBatchId = (batchId) => {
  const regex = /^\d{2}[a-l](0[1-9]|[12][0-9]|3[01])[dn]$/;
  return regex.test(batchId);
};
