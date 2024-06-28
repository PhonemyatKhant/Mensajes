"use client";

import EmptyState from "@/components/EmptyState";
import React from "react";
import clsx from "clsx";
import useConversation from "../hooks/useConversation";

const ConversationsPage = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
