export const InvoiceFieldConfig = {
  invoiceNumber: {
    label: 'Invoice Number',
    description: 'Unique identifier of the invoice.',
    type: 'string',
    required: true,
    confidenceThreshold: 0.9,
  },
  supplierName: {
    label: 'Supplier Name',
    description: 'Name of the supplier.',
    type: 'string',
    required: true,
    confidenceThreshold: 0.85,
  },
  consigneeName: {
    label: 'Consignee Name',
    description: 'Name of the consignee.',
    type: 'string',
    required: false,
    confidenceThreshold: 0.8,
  },
  totalAmount: {
    label: 'Total Amount',
    description: 'The total amount of the invoice.',
    type: 'number',
    required: true,
    confidenceThreshold: 0.9,
  },
  currency: {
    label: 'Currency',
    description: 'The currency of the invoice.',
    type: 'string',
    required: true,
    confidenceThreshold: 0.9,
  },
} as const;