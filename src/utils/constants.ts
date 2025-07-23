export const categories = [
  "Nusantara Flavors", // Indonesian cuisine, otentik & lokal
  "Pasta Creations", // Terdengar modern dan menggoda
  "Fresh Salads", // Lebih menggambarkan kesegaran
  "Ocean Catch", // Lebih menggoda daripada hanya "Seafood"
  "Warm Soups", // Lebih homey dan deskriptif
  "Roasted Meats", // Tetap dipertahankan, sudah jelas dan pas
  "Oven-Baked Specials", // Lebih spesifik dan eksklusif
  "Plant-Based Goodness", // Lebih positif dan mengundang
];

export const ORDER_STATUS = {
  pending: {
    label: "Order Received",
    color: "bg-yellow-100 text-yellow-800",
  },
  preparing: {
    label: "Being Prepared",
    color: "bg-blue-100 text-blue-800",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
  },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;