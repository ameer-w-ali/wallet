"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./button";

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;
  const SignIn = () => signIn();
  const SignOut = () => signOut();
  return (
    <nav className="border-b flex justify-between px-4 h-14 items-center shadow">
      <div className="text-2xl font-bold">PayTM</div>
      <div className="pe-4">
        <Button onClick={user ? SignOut : SignIn}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
}
