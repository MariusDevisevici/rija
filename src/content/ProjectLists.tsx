import React from "react";
import { useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";
import Cursor from "~/content/Cursor";
import { api } from "~/utils/api";
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
let socket: undefined | Socket;

interface IProjectLists {
  userName: string;
}

const ProjectLists = ({ userName }: IProjectLists) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalCloseHandler = () => {
    setIsModalVisible(false);
  };

  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    void fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-mouse-position", (msg: { x: number; y: number }) => {
      setPosition(msg);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("update-mouse-position");
      }
    };
  }, []);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (socket !== undefined) {
        socket.emit("mouse-position-update", {
          x: event.clientX,
          y: event.clientY,
        });
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Cleanup function to clear the interval when the component unmounts
    };
  }, []);

  const { data: projects } = api.projects.read.useQuery();

  useEffect(() => {
    console.log("proj", projects);
  }, [projects]);
  return (
    <>
      {position && <Cursor position={position} userName={userName} />}
      {projects?.map((p, i: number) => {
        return <ProjectCard projectName={p.name} key={i} createdAt={p.createdAt} updatedAt={p.updatedAt} />;
      })}
      {isModalVisible && (
        <CreateProjectModal
          isVisible={isModalVisible}
          onClose={onModalCloseHandler}
        />
      )}
    </>
  );
};

export default ProjectLists;
