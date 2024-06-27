import EmptyState from "@/components/EmptyState";
import React from "react";

const page = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      {/* RIGHT SIDE GREY PANEL HIDDEN ON SMALL SCREEN */}
      <EmptyState />
    </div>
  );
};

export default page;
