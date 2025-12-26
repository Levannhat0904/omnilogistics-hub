import { z } from 'zod';

/**
 * Schema tạo đơn hàng
 */
export const createShipmentSchema = z.object({
  senderName: z
    .string()
    .min(1, 'Tên người gửi là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự'),
  senderPhone: z
    .string()
    .min(1, 'Số điện thoại người gửi là bắt buộc')
    .regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  senderAddress: z
    .string()
    .min(1, 'Địa chỉ người gửi là bắt buộc')
    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  
  receiverName: z
    .string()
    .min(1, 'Tên người nhận là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự'),
  receiverPhone: z
    .string()
    .min(1, 'Số điện thoại người nhận là bắt buộc')
    .regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  receiverAddress: z
    .string()
    .min(1, 'Địa chỉ người nhận là bắt buộc')
    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  
  weight: z
    .number()
    .min(0.1, 'Trọng lượng phải lớn hơn 0')
    .max(1000, 'Trọng lượng không được vượt quá 1000kg'),
  description: z
    .string()
    .optional(),
  codAmount: z
    .number()
    .min(0, 'Số tiền COD phải lớn hơn hoặc bằng 0')
    .optional(),
});

export type CreateShipmentFormData = z.infer<typeof createShipmentSchema>;

/**
 * Schema tìm kiếm đơn hàng
 */
export const searchShipmentSchema = z.object({
  trackingNumber: z
    .string()
    .min(1, 'Mã vận đơn là bắt buộc')
    .regex(/^[A-Z0-9]+$/, 'Mã vận đơn chỉ chứa chữ hoa và số'),
});

export type SearchShipmentFormData = z.infer<typeof searchShipmentSchema>;

