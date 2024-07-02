"use client";

import clsx from "clsx";
import { useState } from "react";

import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

import Avatar from "./Avatar";
import { FullMessageType } from "@/types";
// import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

// GOT PASSED IN MESSAGE DATA
const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  //   CHECK IF THE SENDER OF THIS MESSAGE IS THE CURRENT USER
  const isOwn = session.data?.user?.email === data?.sender?.email;

  //   FROM SEENLIST:USER[] EXCLUDE THE SENDER, MAP THE REMAINING OTHER USER/S AND JOIN THEM WITH COMMA
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  //   IF OWN MESSAGE ORDER 2 MOVE RIGHT AND HIDE
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primary text-white" : "bg-gray-100  dark:bg-lightgray",

    // IMAGE STYLE
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      {!isOwn && (
        <div className={avatar}>
          <Avatar user={data.sender} />
        </div>
      )}
      <div className={body}>
        {/* NAME DATE CONTAINER  */}
        <div className="flex items-center gap-1">
          {/* IF NOT OWN MESSAGE SHOW SENDER ON TOP  */}
          {!isOwn && (
            <div className="text-sm text-gray-500">{data.sender.name}</div>
          )}

          {/* DATE FORMAT DISPLAY  */}
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        {/* MESSAGE CONTAINER  */}
        <div className={message}>
          {/* IMAGE MODEL POP UP  */}
          {/* <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          /> */}

          {/* IF IMAGE SHOW IMAGE ELSE SHOW MESSAGE  */}
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="
              w-auto
              h-auto
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>

        {/* IF OWN MESSAGE'S SEEN LIST IS NOT EMPTY SHOW THE SEEN USER/S */}
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
