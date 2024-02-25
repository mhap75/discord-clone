"use client";

import UserAvatar from "@/components/user/UserAvatar";
import { roleIconMap } from "@/components/utils/role-icon-map";
import { cn } from "@/lib/utils";
import { Member, Profile, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const ServerMember: FC<ServerMemberProps> = ({
  server,
  member: {
    role,
    id,
    profile: { imageUrl, name },
  },
}) => {
  const params = useParams();
  const { push } = useRouter();

  const icon = roleIconMap[role];

  const handleGotoConversation = () => {
    push(`/servers/${params?.serverId}/conversations/${id}`);
  };

  return (
    <button
      onClick={handleGotoConversation}
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
        params?.memberId === id && "bg-zinc-700/20 dark:bg-zinc-700",
      )}
    >
      <UserAvatar src={imageUrl} className="size-8 md:size-8" />
      <p
        className={cn(
          "text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400" +
            " line-clamp-1 dark:group-hover:text-zinc-300",
          params?.memberId === id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
