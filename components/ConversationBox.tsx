import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
import clsx from "clsx";
import { format } from "date-fns";

interface ConversationBoxProps {
  key: string;
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
  key,
  data,
  selected,
}) => {
  // GET OTHER USER
  const otherUser = useOtherUser(data);

  const session = useSession();
  const router = useRouter();

  // ON CONVERSATION BOX CLICK GO TO CONVERSATION ROUTE
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  // GET THE LAST MESSAGE FROM THE ARRAY
  const lastMessage = useMemo(() => {
    // ALL MESSAGES:ARRAY FROM THE CONVERSATION
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  // GET USER EMAIL FROM THE SESSION
  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  // RETURN:BOOLEAN, THE CURRENT USER HAVE SEEN THE MESSAGE OR NOT
  const hasSeen = useMemo(() => {
    // IF NO MESSAGES BEEN SENT IN THE COVERSATION
    if (!lastMessage) {
      return false;
    }
    // lastMessage.seen:User[], GET USERS ARRAY THAT HAVE SEEN THE MESSAGE
    const seenArray = lastMessage.seen || [];

    // IF NO CURREENTLY LOGGED IN USER
    if (!userEmail) {
      return false;
    }

    // WHETHER IF THE CURRENT USER IS INCLUDED IN THE SEEN ARRAY OF THE MESSAGE, FILTERED RESULT OF LENGTH 0 MEANS NO CURRENT USER AKA NOT SEEN
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  // GET THE LAST MESSAGE TEXT OR IMAGE TO DISPLAY ON THE CONVERSATION BOX
  const lastMessageText = useMemo(() => {
    // IF IMAGE
    if (lastMessage?.image) {
      return "Sent an image";
    }

    // lastMessage.body: ACTUAL TEXT MESSAGE:STRING
    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    // IF NO MESSAGE BUT ONLY CONVERSATION
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      // key={key}
      onClick={handleClick}
      className={clsx(
        `
    w-full 
    relative 
    flex 
    items-center 
    space-x-3 
    p-3 
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    dark:hover:bg-lightgray
    `,
        selected ? "bg-neutral-100 dark:bg-lightgray" : ""
      )}
    >
      <Avatar user={otherUser} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            {/* CHAT NAME: data.name:GROUP CHAT NAME OR OTHER USER NAME  */}
            <p className="text-md font-medium text-gray-900 dark:text-gray-200">
              {data.name || otherUser.name}
            </p>

            {/* LAST MESSAGE: IF MESSAGE IN THE CONVERSATION TAKE THE LAST ONE'S DATE */}
            {lastMessage?.createdAt && (
              <p
                className="
              text-xs 
              text-gray-400 
              font-light
            "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>

          {/* LAST MESSAGE TEXT OR IMAGE  */}
          <p
            className={clsx(
              `
          truncate 
          text-sm
          `,
              hasSeen
                ? "text-gray-500 dark:text-gray-400"
                : "text-black font-medium dark:text-gray-100"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
