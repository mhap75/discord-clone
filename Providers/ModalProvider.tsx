"use client";

import AddServerModal from "@/components/modal/AddServerModal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/modal/InviteModal";

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
    </>
  );
};
export default ModalProvider;
