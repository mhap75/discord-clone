"use client";

import ActionTooltip from "@/components/common/ActionTooltip";
import { ModalType, useModal } from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: FC<ServerChannelProps> = ({ server, channel, role }) => {
  const params = useParams();
  const { push } = useRouter();
  const { onOpen } = useModal();
  const { name, type, id } = channel;

  const Icon = iconMap[type];

  const handleGotoChannel = () => {
    push(`/servers/${params?.serverId}/channels/${channel?.id}`);
  };

  const handleServerAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={handleGotoChannel}
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700",
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {name}
      </p>
      {name !== "general" && role !== MemberRole.GUEST && (
        <div className="flex-ic ms-auto gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => handleServerAction(e, "editChannel")}
              size={16}
              className="hidden text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => handleServerAction(e, "deleteChannel")}
              size={16}
              className="hidden text-red-500 transition hover:text-red-600 group-hover:block dark:text-red-400 dark:hover:text-red-300"
            />
          </ActionTooltip>
        </div>
      )}
      {name === "general" && (
        <Lock size={16} className="ms-auto text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};

export default ServerChannel;
