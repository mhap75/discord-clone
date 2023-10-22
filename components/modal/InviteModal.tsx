"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/useModal";
import useOrigin from "@/hooks/useOrigin";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const InviteModal = () => {
  const {
    type,
    onClose,
    isOpen,
    data: { server },
  } = useModal();
  const [isCopied, setIsCopied] = useState(false);
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleCopy = async () => {
    setIsCopied(true);
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen && type === "invite"} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Your Friends to the Server
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server invitation link
            <div className="mt-2 flex items-center gap-x-2">
              <Input
                className="border-none bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                value={inviteUrl}
              />
              <Button size="icon" onClick={handleCopy}>
                {isCopied ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </Label>
          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500"
          >
            Generate a new link
            <RefreshCw className="size-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
