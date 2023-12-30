"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/useModal";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { revalidatePath } from "next/cache";

const DeleteChannelModal = () => {
  const {
    type,
    onClose,
    isOpen,
    data: { server, channel },
  } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { push, refresh } = useRouter();
  const { toast } = useToast();

  const handleDeleteChannel = async () => {
    setIsLoading(true);
    const url = qs.stringifyUrl({
      url: `/api/channels/${channel?.id}`,
      query: {
        serverId: server?.id,
      },
    });

    try {
      await axios.delete(url);

      onClose();
      toast({
        variant: "default",
        title: "Success!",
        description: "The Channel has been deleted.",
      });
      push(`/servers/${server?.id}`);
      refresh();
    } catch (error) {
      const err = error as AxiosError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.message,
        action: (
          <ToastAction onClick={handleDeleteChannel} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen && type === "deleteChannel"} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-destructive p-0 text-black">
        <DialogHeader className="px-6 pt-8 text-white">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-300">
            Are you sure to delete{" "}
            <span className="font-semibold text-indigo-200">
              {channel?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-rose-100 px-6 py-4">
          <div className="flex-between-center w-full">
            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={handleDeleteChannel}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
