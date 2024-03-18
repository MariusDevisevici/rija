import React, { useEffect, useRef } from "react";
import Button from "./Button";
interface IModalProps {
  modalContent: React.ReactNode;
  headerText: string;
  isVisible: boolean;
  onClose: () => void;
}

const Modal = ({
  modalContent,
  headerText,
  isVisible,
  onClose,
}: IModalProps) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault(); // Prevent the default behavior of closing the modal
      }
    };
    if (isVisible) {
      dialogRef.current?.showModal();
      document.addEventListener("keydown", handleKeyDown); // Add event listener when modal is visible
    } else {
      dialogRef.current?.close();
      document.removeEventListener("keydown", handleKeyDown); // Remove event listener when modal is hidden
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Cleanup: remove event listener when component unmounts
    };
  }, [isVisible]);

  const onCloseHandler = () => {
    onClose();
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className="min-w-40 rounded-sm">
      <header className="flex w-full select-none items-center gap-4 bg-secondary p-2 text-white">
        <h1 className="text-xl">{headerText}</h1>
        <Button onClick={onCloseHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </header>
      {modalContent}
    </dialog>
  );
};

export default Modal;
