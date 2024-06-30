import prisma from "@/lib/prismadb";

// TAKE IN CONVERSATION ID RETURN MESSAGES:ARRAY
const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        // sender:User seen:User[]
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
