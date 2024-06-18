// TAKES IN SIDEBAR COMPONENT ACT AS A SHELL FOR THE MAIN CONTENT
//SIDEBAR HAS DEKTOP SIDEBAR COMPONENT & MOBILE FOOTER

import Sidebar from "@/components/Sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className=" h-full">{children}</div>
    </Sidebar>
  );
}
