export const EXTRACTION_PROMPT = `
You are an AI assistant specialized in extracting logistics documents.

Return ONLY valid JSON.

Fields:

- invoiceNumber
- supplierName
- consigneeName
- totalAmount
- currency
`;
