import React from "react";
import Modal from "../components/Modal";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import { api } from "~/utils/api";

interface ICreateProjectModal {
  isVisible: boolean;
  onClose: () => void;
}

type FormValues = {
  name: string;
};

const CreateProjectModal = ({ isVisible, onClose }: ICreateProjectModal) => {
  const ModalContent = () => {
    const { register, handleSubmit } = useForm<FormValues>();

    const utils = api.useUtils();
    const { mutate } = api.projects.create.useMutation({
      onSuccess() {
        void utils.invalidate();
      },
    });

    const onSubmit: SubmitHandler<FormValues> = (d) => {
      mutate({ name: d.name });
      onClose();
    };
    return (
      <form
        className="flex flex-col gap-2 p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          <span className="font-bold text-gray-600">Name:</span>
          <input
            type="text"
            className="rounded-sm border border-secondary p-1 outline-secondary"
            {...register("name", { required: true })}
          />
        </label>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    );
  };

  return (
    <Modal
      headerText="Create New Project"
      modalContent={<ModalContent />}
      isVisible={isVisible}
      onClose={onClose}
    />
  );
};

export default CreateProjectModal;
