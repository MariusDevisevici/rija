import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";
import { api } from "~/utils/api";
let socket: undefined | Socket;

export default function Home() {
  const { data: sessionData } = useSession();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("/api/socket").catch((e) => console.log(e));
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg: { x: number; y: number }) => {
      console.log(msg);

      setPosition(msg);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("update-input");
      }
    };
  }, []);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (socket !== undefined) {
        socket.emit("input-change", { x: event.clientX, y: event.clientY });
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Cleanup function to clear the interval when the component unmounts
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none absolute h-4 w-4 rounded-full bg-black"
        style={{ left: position.x, top: position.y }}
      ></div>

      <main className="">
        {sessionData?.user ? <ProjectLists /> : <div>No auth</div>}
      </main>
    </>
  );
}

function ProjectLists() {
  const { data: sessionData } = useSession();
  const { data: projects } = api.projects.read.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <>
      {projects?.map((p, i: number) => {
        return <div key={i}>{p.name}</div>;
      })}
    </>
  );
}
