"use client";

import ActionTooltip from "@/components/common/ActionTooltip";
import { useModal } from "@/hooks/useModal";
import { ServerMemberProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { FC } from "react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerMemberProfile;
}

const ServerSection: FC<ServerSectionProps> = ({
  server,
  sectionType,
  channelType,
  role,
  label,
}) => {
  const { onOpen } = useModal();

  return (
    <div className="flex-between-center py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Plus size={16} />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Settings" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Settings size={16} />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
