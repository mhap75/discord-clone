import ServerSidebar from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerLayout = async ({
  children,
  params: { serverId },
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="md:flexCol fixed inset-y-0 z-20 hidden h-full w-60">
        <ServerSidebar serverId={serverId} />
      </div>

      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};
export default ServerLayout;
