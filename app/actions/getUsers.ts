import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const users = prisma?.user.findMany({
      // GET RECENT USER FIRST
      orderBy: {
        createdAt: "desc",
      },

      //   where TO FIND THE CURRENT USER AND EXCLUED IT
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
