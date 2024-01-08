import { db } from "@/lib/db";

export const getConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  try {
    // Try to find an existing conversation
    const conversation = await findConversation(memberOneId, memberTwoId);
    if (conversation) {
      return conversation;
    }

    // If no conversation exists, create a new one
    return await createNewConversation(memberOneId, memberTwoId);
  } catch (error) {
    console.error("Error in getConversation:", error);
    throw new Error("Failed to get or create conversation");
  }
};

const findConversation = async (memberOneId: string, memberTwoId: string) =>
  await db.conversation.findFirst({
    where: {
      OR: [
        { memberOneId, memberTwoId },
        { memberOneId: memberTwoId, memberTwoId: memberOneId },
      ],
    },
    include: {
      memberOne: { include: { profile: true } },
      memberTwo: { include: { profile: true } },
    },
  });

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
) =>
  await db.conversation.create({
    data: { memberOneId, memberTwoId },
    include: {
      memberOne: { include: { profile: true } },
      memberTwo: { include: { profile: true } },
    },
  });
