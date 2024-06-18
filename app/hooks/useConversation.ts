import { useMemo } from "react";
import { useParams } from "next/navigation";

// A CUSTOM HOOK FOR RETURNING THE CONVERSATION ID AND ISOPEN:BOOLEAN FROM URL PARAMETERS 

const useConversation = () => {
  const params = useParams();

  // RETURNS THE CONVERSATION ID FROM THE PARAMS IF EXISTS
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  // SET isOpen TRUE IF THE conversationId IS TRUE, ELSE FALSE
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
