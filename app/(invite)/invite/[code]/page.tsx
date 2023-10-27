import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InvitedByCodeProps {
  params: {
    code: string;
  };
}

const InvitedByCode: React.FC<InvitedByCodeProps> = async ({
  params: { code },
}) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!code) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: code,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode: code,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return null;
};
export default InvitedByCode;
