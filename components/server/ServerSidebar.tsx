import { ChannelType } from ".prisma/client";
import ServerHeader from "@/components/server/ServerHeader";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: React.FC<ServerSidebarProps> = async ({ serverId }) => {
  //? The reason of reusing profile authentication is that this component will be used independently somewhere else
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  //?

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  //? To separate channel types to render them separately in UI
  const txtChannels = server.channels.filter(
    (ch) => ch.type === ChannelType.TEXT,
  );
  const audChannels = server.channels.filter(
    (ch) => ch.type === ChannelType.AUDIO,
  );
  const vidChannels = server.channels.filter(
    (ch) => ch.type === ChannelType.VIDEO,
  );
  //?
  const otherMembers = server.members.filter(
    (mem) => mem.profileId !== profile.id,
  );
  const role = server.members.find((mem) => mem.profileId === profile.id)?.role;

  return (
    <div className="flexCol sizeFull bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
export default ServerSidebar;
