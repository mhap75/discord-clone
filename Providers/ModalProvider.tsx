"use client";

import AddServerModal from "@/components/modal/AddServerModal";
import EditServerModal from "@/components/modal/EditServerModal";
import InviteModal from "@/components/modal/InviteModal";
import { useEffect, useState } from "react";
import MembersModal from "@/components/modal/MembersModal";

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
    </>
  );
};
export default ModalProvider;
