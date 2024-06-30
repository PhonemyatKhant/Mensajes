import ConversationList from "@/components/ConversationList";
import Sidebar from "@/components/Sidebar";
import React from "react";
import getConversations from "../actions/getConversations";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();
  return (
    // CHILDREN PL 20 H FULL
    <Sidebar>
      <ConversationList initialItems={conversations} />
      <div className=" h-full">{children} </div>
    </Sidebar>
  );
};

export default layout;
