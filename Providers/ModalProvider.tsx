"use client";

import AddChannelModal from "@/components/modal/AddChannelModal";
import AddServerModal from "@/components/modal/AddServerModal";
import DeleteChannelModal from "@/components/modal/DeleteChannelModal";
import DeleteServerModal from "@/components/modal/DeleteServerModal";
import EditChannelModal from "@/components/modal/EditChannelModal";
import EditServerModal from "@/components/modal/EditServerModal";
import InviteModal from "@/components/modal/InviteModal";
import LeaveServerModal from "@/components/modal/LeaveServerModal";
import MembersModal from "@/components/modal/MembersModal";
import MessageFileModal from "@/components/modal/MessageFileModal";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //? fixes the hydration error caused by the fact that this component is a modal.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  //?

  return (
    <>
      <AddServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <AddChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <Toaster />
    </>
  );
};
export default ModalProvider;
