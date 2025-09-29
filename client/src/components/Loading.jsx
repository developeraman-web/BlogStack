import React from "react";
import loadingIcon from "@/assets/images/loading.svg";
export default function Loading() {
  return (
    <div className="min-w-screen h-screen fixed top-0 left-0  z-30 flex justify-center items-center">
      <img src={loadingIcon} alt="" width={100} />
    </div>
  );
}
