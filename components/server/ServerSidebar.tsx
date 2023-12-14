import { ChannelType } from ".prisma/client";
import ServerHeader from "@/components/server/ServerHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { redirect } from "next/navigation";
import ServerSearch from "./ServerSearch";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="size-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="size-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="size-4 mr-2" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className="size-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldCheck className="size-4 mr-2 text-indigo-500" />,
};

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
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channel",
                type: "channel",
                data: txtChannels.map(({ id, name, type }) => ({
                  id,
                  name,
                  icon: iconMap[type],
                })),
              },
              {
                label: "Voice Channel",
                type: "channel",
                data: audChannels.map(({ id, name, type }) => ({
                  id,
                  name,
                  icon: iconMap[type],
                })),
              },
              {
                label: "Video Channel",
                type: "channel",
                data: vidChannels.map(({ id, name, type }) => ({
                  id,
                  name,
                  icon: iconMap[type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: otherMembers.map(({ id, profile: { name }, role }) => ({
                  id,
                  name,
                  icon: roleIconMap[role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
export default ServerSidebar;
