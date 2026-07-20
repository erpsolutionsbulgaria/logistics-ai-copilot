export const shipmentQueryKeys = {
  all: ["shipments"] as const,

  lists: () =>
    [...shipmentQueryKeys.all, "list"] as const,

  list: () =>
    [...shipmentQueryKeys.lists()] as const,

  details: () =>
    [...shipmentQueryKeys.all, "detail"] as const,

  detail: (shipmentId: string) =>
    [
      ...shipmentQueryKeys.details(),
      shipmentId,
    ] as const,
};