import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  loading: any;
  bgColor: any;
  label: any;
  type?: any;
  callBackFunction?: any;
};

export default function Button({
  loading,
  bgColor,
  label,
  type,
  callBackFunction,
}: Props) {
  return (
    <button
      onClick={callBackFunction}
      type={type}
      className={`py-2  flex gap-2 items-center  px-6 ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : `bg-[${bgColor}] cursor-pointer hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80`
      }    rounded font-semibold text-white text-lg`}
      disabled={loading}
    >
      {loading ? <CircularProgress color="inherit" size={20} /> : ""} {label}
    </button>
  );
}
