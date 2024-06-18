import EmptyState from "@/components/EmptyState";
import React from "react";

const page = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default page;
