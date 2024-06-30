"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "./Avatar";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => {
  const otherUser = useOtherUser(conversation);

  // ACTIVE STATUS OR NO. OF GROUP MEMBERS
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    // return isActive ? "Active" : "Offline";
    return "Active";
  }, [conversation.isGroup, conversation.users.length]);
  return (
    <>
      {/* <ChatDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      /> */}
      <div
        className="
    bg-white 
    w-full 
    flex 
    border-b-[1px] 
    sm:px-4 
    py-3 
    px-4 
    lg:px-6 
    justify-between 
    items-center 
    shadow-sm
    dark:bg-dusk
    dark:border-lightgray
  "
      >
        <div className="flex gap-3 items-center">
          {/* BACK ICON  */}
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-primary/80
            hover:text-primary 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>

          {/* USER ICON  */}
          <Avatar user={otherUser} />

          {/* NAME AND STATUS  */}
          <div className="flex flex-col dark:text-gray-200">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500 dark:text-gray-400">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          // onClick={() => setDrawerOpen(true)}
          className="
          text-primary/80
          cursor-pointer
          hover:text-primary
          transition
        "
        />
      </div>
    </>
  );
};

export default ConversationHeader;
