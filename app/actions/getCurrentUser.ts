import prisma from "@/lib/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // TAKE EMAIL FROM SESSION AND MATCH IT WITH THE USER FROM DB AND RETURN USER
    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
