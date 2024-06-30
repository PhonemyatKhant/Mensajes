import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";

// RETURN CONVERSATIONS THAT INCLUDES CURRENT USER ID INCLUDING GROUP CHATS
const getConversations = async () => {
  const currentUser = await getCurrentUser();

  //   IF NO CURRENT USER RETURN EMPTY ARRAY
  if (!currentUser?.id) return [];

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      //   GET CONVERSATIONS THAT INVOLVES CURRENT USER INCLUDING GROUP CHATS
      where: {
        userIds: {
          has: currentUser.id,
        },
      },

      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (error) {
    return [];
  }
};

export default getConversations;
