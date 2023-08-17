import React, { useContext, useEffect } from "react";

import { isLoggedIn } from "../helpers";

import { UserContext } from "@/Contexts/UserContext";
import { useRouter } from "next/router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useContext<any>(UserContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth/login");
    }
  }, []);

  //setting themes

  return <div>{children}</div>;
};
