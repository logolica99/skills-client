import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  loading: any;
  gradientStyle: any;
  label: any;
  type?: any;
  callBackFunction?: any;
};

export default function GradientButton({
  loading,
  gradientStyle,
  label,
  type,
  callBackFunction,
}: Props) {
  return (
    <button
      onClick={callBackFunction}
      type={type}
      className={`py-3 w-full rounded-xl justify-center flex gap-2 items-center  px-6 ${
        loading
          ? "cursor-not-allowed"
          : ` cursor-pointer hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80`
      }    rounded font-semibold text-white text-lg`}
      style={{
        background: loading ? " #666699" : gradientStyle,
      }}
      disabled={loading}
    >
      {loading ? <CircularProgress color="inherit" size={20} /> : ""} {label}
    </button>
  );
}
