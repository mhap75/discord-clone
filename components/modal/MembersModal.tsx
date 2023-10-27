"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/useModal";
import useOrigin from "@/hooks/useOrigin";
import http from "@/lib/rest/http";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const MembersModal = () => {
  const {
    type,
    onClose,
    isOpen,
    data: { server },
    onOpen,
  } = useModal();

  return (
    <Dialog open={isOpen && type === "members"} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Your Friends to the Server
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          Hello everyone!
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
