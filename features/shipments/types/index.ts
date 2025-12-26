export type TripStatus = 'ASSIGNED' | 'LOADED' | 'COMPLETED' | 'PENDING';
export type DriverRole = 'primary' | 'secondary';
export type PaymentType = 'Tài xế thu' | 'Chuyển khoản' | 'Tiền mặt' | 'Đã thanh toán';

export interface Order {
  id: string;
  code: string;
  status: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  amount: number;
  paymentType: PaymentType;
  cargoDescription: string;
}

export interface DriverTrip {
  id: string;
  code: string;
  status: TripStatus;
  vehiclePlate: string;
  role: DriverRole;
  route: string;
  pickupAddress: string;
  deliveryAddress: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  estimatedTime: string;
  totalAmount: number;
  orderCount: number;
  scheduledDate: string;
  completedDate?: string;
  orders: Order[];
}
