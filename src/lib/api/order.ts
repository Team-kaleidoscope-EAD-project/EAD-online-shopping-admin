import { Order } from "@/types/order";
import axiosInstance from "./axiosInstance";
import { OrderItem } from "@/types/orderItem";

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axiosInstance.get("/order/getallorders");

  return response.data.map((order: any) => ({
    id: order.id,
    status: order.status,
    totalAmount: order.totalAmount,
    userId: order.userId,
    orderDate: new Date(order.orderDate),
    // discountAmount: order.discountAmount,
  }));
};

export const fetchOrderItems = async (orderId: any): Promise<OrderItem[]> => {
  const response = await axiosInstance.get(
    `/order/getallorderitemsbyorderid/${orderId}`
  );

  console.log(response.data);
  return response.data.map((orderItem: any) => ({
    id: orderItem.id,
    productId: orderItem.productId,
    orderId: orderItem.orderid,
    price: orderItem.price,
    quantity: orderItem.quantity,
    // discountAmount: order.discountAmount,
  }));
};
