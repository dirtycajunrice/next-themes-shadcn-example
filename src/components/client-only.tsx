"use client";
import { type PropsWithChildren, useEffect, useState } from "react";

const ClientOnly = ({ children }: PropsWithChildren) => {
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted ? children : null;
};
ClientOnly.displayName = "ClientOnly";

export { ClientOnly };
