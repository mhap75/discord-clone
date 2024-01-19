"use client";

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./ChatWelcome";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}) => {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <ChatWelcome type={type} name={name} />
    </div>
  );
};

export default ChatMessages;
