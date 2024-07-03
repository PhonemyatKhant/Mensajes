"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
// import { find } from "lodash";

// import { pusherClient, pusherEvents } from "../../../libs/pusher";
import { FullMessageType } from "@/types";
import MessageBox from "../messages/MessageBox";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

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

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    // SCROLL INTO BOTTOM
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
    };
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          // update the message only if it matches the new message id
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    // BIND PUSHERCLIENT TO EXPECT THE NEW MESSAGE
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updateMessageHandler);

    // UNBIND BEFORE COMPONENT UNMOUNT
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages &&
        messages.map((message, i) => (
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
