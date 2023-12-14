"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/useModal";
import { ServerMemberProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ServerHeaderProps {
  server: ServerMemberProfile;
  role?: MemberRole;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const { onOpen } = useModal();
  const [isDropOpen, setIsDropOpen] = useState(false);
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu onOpenChange={setIsDropOpen}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex-center h-12 w-full border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown
            className={`ml-auto h-5 w-5 transition ${
              isDropOpen && "rotate-180"
            }`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
            onClick={() => onOpen("invite", { server })}
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen("editServer", { server })}
              className="cursor-pointer px-3 py-2 text-sm"
            >
              Server Settings
              <Settings className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen("members", { server })}
              className="cursor-pointer px-3 py-2 text-sm"
            >
              Manage Members
              <Users className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen("createChannel")}
              className="cursor-pointer px-3 py-2 text-sm"
            >
              Add Channel
              <PlusCircle className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="!my-1" />
          </>
        )}
        {isAdmin ? (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-rose-500 hover:!bg-rose-300/50 hover:!text-rose-500 dark:hover:!bg-rose-800/50"
            onClick={() => onOpen("deleteServer", { server })}
          >
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-rose-500 hover:!bg-rose-300/50 hover:!text-rose-500 dark:hover:!bg-rose-800/50"
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ServerHeader;
