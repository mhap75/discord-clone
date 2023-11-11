import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: {
    memberId: string;
  };
}

export async function PATCH(
  req: Request,
  { params: { memberId } }: ParamsProps,
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverId = searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!serverId)
      return new NextResponse("Server ID not found", { status: 400 });

    if (!memberId)
      return new NextResponse("Member ID not found", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json(server);
  } catch (err) {
    console.error("[Member Role Update]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const DELETE = async (
  req: Request,
  { params: { memberId } }: ParamsProps,
) => {
  try {
    const profile = await currentProfile();
    const serverId = new URL(req.url).searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Server ID not found", { status: 400 });
    if (!memberId)
      return new NextResponse("Member ID not found", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json(server);
  } catch (err) {
    console.error("[MEMBER DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
