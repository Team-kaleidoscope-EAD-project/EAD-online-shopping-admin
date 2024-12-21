export interface Order {
  id: string;
  status: string;
  totalAmount: number;
  userId: string;
  orderDate: Date;
  discountAmount: number;
}
