import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Button from "~/components/Button";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="bg-secondary text-white">
      <nav className="container m-auto flex items-center p-2">
        <div className="flex cursor-pointer items-center gap-2">
          <Image width={40} height={40} src={"/logo.webp"} alt="Logo" />
          <span className="hidden text-2xl opacity-85 sm:inline">Rija</span>
        </div>
        <ul className="flex w-full items-center justify-end gap-4">
          {sessionData && (
            <li className="flex cursor-pointer items-center gap-2">
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={sessionData.user.image!}
                alt="Profile Picture"
              />
              <span className="hidden sm:inline">{sessionData.user.name}</span>
            </li>
          )}
          <li>
            <Button
              variant="secondary"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
