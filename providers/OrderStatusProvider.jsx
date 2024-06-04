"use client";

import { useState } from "react";
import { OrderStatusContext } from "@/context";

const OrderStatusProvider = ({ children }) => {
  const [orderStatus, setOrderStatus] = useState({});

  return (
    <OrderStatusContext.Provider value={{ orderStatus, setOrderStatus }}>
      {children}
    </OrderStatusContext.Provider>
  );
};

export default OrderStatusProvider;
