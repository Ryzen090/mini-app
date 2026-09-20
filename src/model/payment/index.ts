export type PaymentStatus = {
  version?: string;
  code?: string;
  message?: string;
  tran_id?: string;
  lang?: string;
};

export type PaymentResponse = {
  tran_id: string;
  qrImage?: string;
  qrString?: string;
  abapay_deeplink?: string;
  app_store?: string;
  play_store?: string;
  description?: string;
  status?: PaymentStatus;
};

export type CreatePaymentData = {
  firstname: string;
  lastname: string;
  email?: string;
  phone: string;
};

export type PaymentCheckData = {
  payment_status_code?: number;
  total_amount?: number;
  original_amount?: number;
  refund_amount?: number;
  discount_amount?: number;
  payment_amount?: number;
  payment_currency?: string;
  apv?: string;
  payment_status?: string;
  transaction_date?: string;
};

export type PaymentCheckResponse = {
  data?: PaymentCheckData;
  status?: PaymentStatus;
};
