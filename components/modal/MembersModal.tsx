"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user/UserAvatar";
import { useModal } from "@/hooks/useModal";
import { ServerMemberProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Users2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const roleIconMap = {
  GUEST: null,
  ADMIN: <ShieldCheck className="role-icon" />,
  MODERATOR: <ShieldAlert className="role-icon" />,
};

const MembersModal = () => {
  const { type, onClose, isOpen, data, onOpen } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const { server } = data as {
    server: ServerMemberProfile;
  };
  const { refresh } = useRouter();

  const handleKickOut = async (memberId: string) => {
    setLoadingId(memberId);
    try {
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const { data } = await axios.delete(url);

      refresh();
      onOpen("members", { server: data });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId("");
    }
  };

  const handleRoleChange = async (memberId: string, role: MemberRole) => {
    setLoadingId(memberId);
    try {
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const { data } = await axios.patch(url, { role });

      refresh();
      onOpen("members", { server: data });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isOpen && type === "members"} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white py-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="flex-center mx-auto w-fit gap-1 rounded-md bg-zinc-300/50 px-2 py-1 text-zinc-500">
            <span className="font-bold">{server?.members?.length}</span>
            <Users2 size={16} />
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map(
            ({ id, profile: { imageUrl, name, email }, role, profileId }) => (
              <div
                key={id}
                className="flex-ic mb-4 gap-x-4 rounded-md py-2 ps-2.5 hover:bg-zinc-200/50"
              >
                <UserAvatar src={imageUrl} />
                <div className="flexCol gap-y-1">
                  <div className="flex-ic gap-x-1 text-xs font-semibold">
                    {name !== "null null" ? name : "User"}
                    {roleIconMap[role]}
                  </div>
                  <p className="text-xs text-zinc-500">{email}</p>
                </div>
                {server.profileId !== profileId && loadingId !== id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <MoreVertical className="size-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex-ic">
                            <ShieldQuestion className="size-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(id, "GUEST")}
                              >
                                <Shield className="size-4 mr-2" />
                                Guest
                                {role === "GUEST" && (
                                  <Check className="size-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(id, "MODERATOR")
                                }
                              >
                                <ShieldAlert className="size-4 mr-2" />
                                Moderator
                                {role === "MODERATOR" && (
                                  <Check className="size-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-amber-500 hover:!bg-amber-300/50 hover:!text-amber-500 dark:hover:!bg-amber-800/50"
                          onClick={() => handleKickOut(id)}
                        >
                          <Gavel className="size-4 mr-2" />
                          Kick out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {loadingId === id && (
                  <Loader2 className="size-4 ml-auto animate-spin text-zinc-500" />
                )}
              </div>
            ),
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
