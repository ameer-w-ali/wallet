import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}
