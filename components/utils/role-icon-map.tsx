import { MemberRole } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldAlert size={32} className="mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldCheck size={32} className="mr-2 text-indigo-500" />
  ),
};
