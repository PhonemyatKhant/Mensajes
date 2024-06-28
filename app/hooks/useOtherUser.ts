import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

// TAKE IN CONVERSATION DATA AND FROM conversations.user ARRAY RETURN THE USERS EXCEPT FROM CURRENTLY LOGGED-IN-USER

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otherUser;
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
