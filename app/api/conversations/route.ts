import { NextResponse } from "next/server";

import getCurrentUser from "../../actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
// import { pusherEvents, pusherServer } from "../../libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    // IF NO CURRENT USER IS LOGGED IN OR EXIST
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    // IF GROUP CHAT AND NO INFO IS PROVIDED
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // CREATE NEW GROUP CHAT
    if (isGroup) {
      // console.log(isGroup, "THIS RAN");

      try {
        // CREATE NEW CONVERSATION AND PASS IN DATA
        const newConversation = await prisma.conversation.create({
          data: {
            name,
            isGroup,
            users: {
              connect: [
                ...members.map((member: { value: string }) => ({
                  id: member.value,
                })),
                {
                  id: currentUser.id,
                },
              ],
            },
          },
          include: {
            users: true,
          },
        });

        // Update all connections with new conversation
        newConversation.users.forEach((user) => {
          if (user.email) {
            pusherServer.trigger(
              user.email,
              'conversation:new',
              newConversation
            );
          }
        });

        return NextResponse.json(newConversation);
      } catch (error) {
        console.log(error, "ERROR");
      }

      
    }

    // IF CHAT ALREADY EXISTS
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // CREATE NEW ONE ON ONE CONVERSATION
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    // Update all connections with new conversation
    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          'conversation:new',
          newConversation
        );
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
