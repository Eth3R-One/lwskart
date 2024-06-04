"use client";

import { toast } from "react-toastify";

export const ToastMessage = (message, type) => {
  switch (type) {
    case "success": {
      toast.success(message);
      break;
    }
    case "info": {
      toast.info(message);
      break;
    }
    default: {
      toast(message);
      break;
    }
  }
};
