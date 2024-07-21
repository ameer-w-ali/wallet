import { type ReactNode } from "react";
import Sidebar from "@/components/sidebar";

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
