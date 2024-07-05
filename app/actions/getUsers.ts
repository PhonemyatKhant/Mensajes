import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const users = await prisma?.user.findMany({
      // GET RECENT USER FIRST
      orderBy: {
        createdAt: "desc",
      },

      // FIND THE CURRENT USER AND EXCLUED IT
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
