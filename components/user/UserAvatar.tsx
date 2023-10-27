import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  scr?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ scr, className }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={scr} />
    </Avatar>
  );
};
export default UserAvatar;
