import { FullConversationType } from "@/types";
import React from "react";

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
  return <div>ConversationBox</div>;
};

export default ConversationBox;
