import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/nav-links/Sidebar";
import React from "react";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import { Loader2 } from "lucide-react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    // CHILDREN PL 20 H FULL
    <Sidebar>
      <ConversationList users={users!} initialItems={conversations} />
      <div className=" h-full">{children} </div>
    </Sidebar>
    
  );
};

export default layout;
