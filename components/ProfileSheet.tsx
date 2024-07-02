import React, { useCallback, useMemo, useState } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format } from "date-fns";
import Avatar from "./Avatar";
import { FaTrash } from "react-icons/fa";
import { AlertDialogTrigger, AlertDialog } from "./ui/alert-dialog";
import AlertDialogComponent from "./AlertDialog";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import AvatarGroup from "./AvatarGroup";

interface ProfileSheetProps {
  data: Conversation & { users: User[] };
}

const ProfileSheet: React.FC<ProfileSheetProps> = ({ data }) => {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    // return isActive ? "Active" : "Offline";
    return "Active";
  }, [data.isGroup, data.users.length]);

  //   DELETE CONVERSATION FUNCTION
  const router = useRouter();
  const toast = useToast();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    console.log('this ran');
    
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        router.push("/conversations");
        router.refresh();
      })
      .catch((error) => {
        // if (error) {
        //   toast({
        //     variant: "destructive",
        //     title: "An Error Occured!",
        //     // description: `${error.response.data}`,
        //   });
        // }
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [router, conversationId]);
  return (
    <SheetContent>
      <SheetHeader className=" justify-center items-center">
        {/* AVATAR PIC  */}
        <div className=" w-fit relative">
          {" "}
          {data.isGroup ? (
            <AvatarGroup users={data.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
        </div>
        {/* NAME  */}
        <SheetTitle>{title} </SheetTitle>
        {/* STATUS TEXT  */}
        <SheetDescription>{statusText}</SheetDescription>
        {/* DELETE BTN  */}
        <div className="flex gap-10 h-fit py-8 ">
          <AlertDialog>
            <AlertDialogTrigger>
              <div
                // onClick={() => setConfirmOpen(true)}
                className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
              >
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center dark:bg-lightgray ">
                  <FaTrash className="text-destructive " size={20} />
                </div>
                <div className=" text-xs font-light text-destructive">
                  Delete
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogComponent
              type="destructive"
              desc="conversation"
              action={onDelete}
            />
          </AlertDialog>
        </div>

        {/* EMAIL JOINED AT  */}
        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
            {data.isGroup && (
              <div>
                <dt className=" text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 dark:text-gray-200">
                  Emails
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-gray-50">
                  {data.users.map((user) => user.email).join(", ")}
                </dd>
              </div>
            )}
            {!data.isGroup && (
              <div>
                <dt className="text-sm font-medium  text-gray-500 sm:w-40 sm:flex-shrink-0 dark:text-gray-200">
                  Email
                </dt>
                <dd className=" mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-gray-50">
                  {otherUser.email}
                </dd>
              </div>
            )}
            {/* EMAIL DISPLAY  */}
            {!data.isGroup && (
              <>
                <hr />
                <div>
                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0dark:text-gray-200">
                    Joined
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2dark:text-gray-50">
                    <time dateTime={joinedDate}>{joinedDate}</time>
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </SheetHeader>
    </SheetContent>
  );
};

export default ProfileSheet;
