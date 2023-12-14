"use client";

import ActionTooltip from "@/components/common/ActionTooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  name,
  imageUrl,
  id,
}) => {
  const { push } = useRouter();
  const params = useParams();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={() => push(`/servers/${id}`)}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 w-[4px] rounded-r-full bg-primary transition-all",
            params?.serverId === id
              ? "h-[36px]"
              : "h-[8px] group-hover:h-[20px]",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 flex h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]" +
              " overflow-hidden transition-all",
            params?.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image src={imageUrl} fill alt={name} className="object-contain" />
        </div>
      </button>
    </ActionTooltip>
  );
};
export default NavigationItem;
