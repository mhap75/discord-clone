"use client";

import ActionTooltip from "@/components/common/ActionTooltip";
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";

const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip label="Add a server" side="right" align="center">
        <button onClick={() => onOpen("createServer")} className="group flex items-center">
          <div className="flex-center mx-3 h-[48px] w-[48px] overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
export default NavigationAction;
