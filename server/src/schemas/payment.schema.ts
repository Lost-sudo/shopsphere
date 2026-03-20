import z from "zod";

export const paymentSchema = z.object({
  orderId: z.uuid(),
  amount: z.number().min(0),
  paymentMethod: z.string().min(1),
  status: z.string().optional().default("pending"),
});

export const updatePaymentSchema = paymentSchema.partial();

export const paymentQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.string().optional(),
  orderId: z.uuid().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type PaymentQuery = z.infer<typeof paymentQuerySchema>;
