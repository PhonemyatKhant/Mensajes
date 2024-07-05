// TAKES IN SIDEBAR COMPONENT ACT AS A SHELL FOR THE MAIN CONTENT
//SIDEBAR HAS DEKTOP SIDEBAR COMPONENT & MOBILE FOOTER

import Sidebar from "@/components/nav-links/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "@/components/users/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      {/* CHILDREN OF SIDEBAR PL 20 MAIN CONTAINER RIGHT  */}
      {/* FIXED CONTAINER USER LIST  */}
      <UserList items={users} />
      <div className=" h-full">{children}</div>
    </Sidebar>
  );
}
