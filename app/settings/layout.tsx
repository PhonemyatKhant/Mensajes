
import Sidebar from "@/components/nav-links/Sidebar";
import React from "react";


const layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    // CHILDREN PL 20 H FULL
    <Sidebar>
      
      <div className=" h-full">{children} </div>
    </Sidebar>
  );
};

export default layout;
