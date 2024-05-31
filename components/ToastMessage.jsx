"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ToastMessage = ({ message, type }) => {
  switch (type) {
    case "success":
      return toast.success(message);
    default:
      return toast(message);
  }
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "default"]).isRequired,
};

export default ToastMessage;
