"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
// import { find } from "lodash";

// import { pusherClient, pusherEvents } from "../../../libs/pusher";
import { FullMessageType } from "@/types";
import MessageBox from "./MessageBox";

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages = [],
}) => {
  // BOTTOM SPACE
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  // ON PAGE LOAD UPDATE SEEN MESSAGES
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-1" ref={bottomRef} />
    </div>
  );
};

export default ConversationBody;
