import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "~/components/Button";
import Modal from "~/components/Modal";

const Header = () => {
  const { data: sessionData } = useSession();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <header className="bg-secondary text-white">
      <nav className="container m-auto flex items-center p-2">
        <div className="flex cursor-pointer items-center gap-2">
          <Image width={40} height={40} src={"/logo.webp"} alt="Logo" />
          <span className="hidden text-2xl opacity-85 sm:inline">Rija</span>
        </div>
        <ul className="ml-2 sm:ml-8">
          <li>Projects</li>
        </ul>
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
          {sessionData && (
            <li>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalVisible((prev) => !prev);
                }}
              >
                Create
              </Button>
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
      {isModalVisible && (
        <Modal
          headerText="Create New Project"
          modalContent={<ModalContent />}
          onConfirm={() => {
            console.log("sdasda");
          }}
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;

function ModalContent() {
  return <div className="p-2">adsas</div>;
}
