export type ApiErrorCode =
  | "STOCK_INSUFFICIENT"
  | "ORDER_NOT_FOUND"
  | "DUPLICATE_ORDER"
  | "PAYMENT_FAILED"
  | "INVALID_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "FAILED";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type PaymentFailureCode =
  | "CARD_DECLINED"
  | "INSUFFICIENT_FUNDS"
  | "EXPIRED_CARD"
  | "TIMEOUT"
  | "PROCESSING_ERROR";

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  unitPriceInPaise: number;
}

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  orderId?: string;
}

export interface ResponseMeta {
  requestId?: string;
  traceId?: string;
}

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;

  private constructor(params: {
    success: boolean;
    data?: T;
    error?: ApiError;
    meta?: ResponseMeta;
  }) {
    this.success = params.success;
    this.data = params.data;
    this.error = params.error;
    this.meta = params.meta;
  }

  static ok<T>(data: T, meta?: ResponseMeta): ApiResponse<T> {
    return new ApiResponse({ success: true, data, meta });
  }

  static fail<T>(error: ApiError): ApiResponse<T> {
    return new ApiResponse({ success: false, error });
  }
}
