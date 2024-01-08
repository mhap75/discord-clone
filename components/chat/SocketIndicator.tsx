"use client";

import { useSocket } from "@/Providers/ScoketProvider";
import { Badge } from "@/components/ui/badge";
import { MdSignalCellularAlt } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge className="aspect-square border-none bg-yellow-600 p-1.5 text-white">
        <TbPlugConnected size={16} />
      </Badge>
    );
  }

  return (
    <Badge className="aspect-square border-none bg-emerald-600 p-1.5 text-white">
      <MdSignalCellularAlt size={16} />
    </Badge>
  );
};
