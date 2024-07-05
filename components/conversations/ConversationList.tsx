"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/types";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import ConversationBox from "./ConversationBox";
import { User } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import GroupChatDialog from "../messages/GroupChatDialog";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  users: User[];
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  users,
  initialItems,
}) => {
  const session = useSession();

  // ARRAY OF ALL CONVERSATIONS
  const [items, setItems] = useState(initialItems);
  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;
    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId == conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey,conversationId,router]);
  return (
    <aside
      className={clsx(
        `fixed 
    inset-y-0 
    pb-20
    lg:pb-0
    lg:left-20 
    lg:w-80 
    lg:block
    overflow-y-auto 
    border-r 
    border-gray-200 
    dark:border-lightgray
  `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800 dark:text-gray-200">
            Messages
          </div>
          {/* ADD GROUP CHAT BUTTON */}
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger>
              <div
                // onClick={() => setIsModalOpen(true)}
                className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
                dark:bg-lightgray
                dark:text-gray-200
              "
              >
                <MdOutlineGroupAdd size={20} />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <GroupChatDialog setOpenDialog={setOpenDialog} users={users} />
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {items.map((item, i) => (
          <ConversationBox
            key={item?.id}
            data={item}
            // IT IS SELECTED IF CONVERSATION ID FROM PARAMS IS EQUAL TO CONVERSATION BOX'S ID
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
