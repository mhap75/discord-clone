"use client";

import AddChannelModal from "@/components/modal/AddChannelModal";
import AddServerModal from "@/components/modal/AddServerModal";
import EditServerModal from "@/components/modal/EditServerModal";
import InviteModal from "@/components/modal/InviteModal";
import MembersModal from "@/components/modal/MembersModal";
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
      <Toaster />
    </>
  );
};
export default ModalProvider;
