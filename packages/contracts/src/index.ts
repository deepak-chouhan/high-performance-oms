export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "FAILED";

export type PaymentFailureCode =
  | "card_declined"
  | "insufficient_funds"
  | "expired_card"
  | "timeout"
  | "processing_error";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface AppError {
  statusCode: number;
  code: string;
  message: string;
  orderId?: string;
}
