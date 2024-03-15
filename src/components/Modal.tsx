import React, { useEffect, useRef } from "react";
import Button from "./Button";
interface IModalProps {
  modalContent: React.ReactNode;
  headerText: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  //   childred: React.ReactNode;
}

const Modal = ({
  modalContent,
  headerText,
  isVisible,
  onClose,
  onConfirm,
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

  const onConfirmHandler = () => {
    if (onConfirm) {
      onConfirm();
      onClose();
    }
  };
  console.log("Asdasd");

  return (
    <dialog ref={dialogRef} className="min-w-40 rounded-sm">
      <header className="w-full items-center bg-secondary p-2 text-white">
        <h1 className="text-xl">{headerText}</h1>
      </header>
      {modalContent}
      <div className="flex w-full justify-end gap-2 bg-secondary p-2">
        {onConfirm && (
          <Button variant="primary" onClick={onConfirmHandler}>
            Confirm
          </Button>
        )}
        <Button onClick={onCloseHandler}>Close</Button>
      </div>
    </dialog>
  );
};

export default Modal;
