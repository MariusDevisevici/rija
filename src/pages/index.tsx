import { useSession } from "next-auth/react";
import ProjectLists from "~/content/ProjectLists";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <main className="">
        {sessionData?.user ? (
          <ProjectLists userName={sessionData.user.name!} />
        ) : (
          <div>No auth</div>
        )}
      </main>
    </>
  );
}
