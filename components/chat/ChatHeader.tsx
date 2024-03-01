import { ChatVideoButton } from "@/components/chat/ChatVideoButton";
import { SocketIndicator } from "@/components/chat/SocketIndicator";
import MobileToggle from "@/components/mobile/MobileToggle";
import UserAvatar from "@/components/user/UserAvatar";
import { Hash } from "lucide-react";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  imageUrl,
  type,
  name,
  serverId,
}) => (
  <div className="flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
    <MobileToggle serverId={serverId} />
    {type === "channel" && (
      <Hash className="mr-2 size-5 text-zinc-500 dark:text-zinc-400" />
    )}
    {type === "conversation" && (
      <UserAvatar src={imageUrl} className="mr-2 size-8 md:size-8" />
    )}
    <p className="font-semibold text-black dark:text-white">{name}</p>
    <div className="ml-auto flex items-center">
      {type === "conversation" && <ChatVideoButton />}
      <SocketIndicator />
    </div>
  </div>
);

export default ChatHeader;
