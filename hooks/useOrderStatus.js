import { OrderStatusContext } from "@/context";
import { useContext } from "react";

const useOrderStatus = () => {
  return useContext(OrderStatusContext);
};

export default useOrderStatus;
