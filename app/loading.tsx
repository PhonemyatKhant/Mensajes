import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className=" text-primary w-full h-full z-50 bg-white/70 absolute inset-0 flex items-center justify-center">
      <Loader2 className=" h-20 w-20 p-0 animate-spin" />
    </div>
  );
};

export default loading;
