import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import ConversationBody from "@/components/conversations/ConversationBody";
import ConversationForm from "@/components/conversations/ConversationForm";
import ConversationHeader from "@/components/conversations/ConversationHeader";
import EmptyState from "@/components/EmptyState";

interface IParams {
  conversationId: string;
}

const SingleConversationPage = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);

  const messages = await getMessages(params.conversationId);

  // IF NO CONVERSATION RETURN EMPTY GREY PANEL
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages} />
        <ConversationForm />
      </div>
    </div>
  );
};

export default SingleConversationPage;
