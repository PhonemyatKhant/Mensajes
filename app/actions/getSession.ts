import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export default getSession;
