import { useUserQuery } from "@/api/auth";
import { deleteCookie } from "cookies-next";
import { useMemo, useState } from "react";

interface User {
  username: string;
  email: string;
  receiveEmail: boolean;
}

type Session =
  | {
      status: "loading" | "unauthenticated";
      user: undefined;
    }
  | {
      status: "authenticated";
      user: User;
    };

const useSession = (): Session => {
  const { data, isLoading, isError, isSuccess, isFetching } = useUserQuery();
  const session = useMemo<Session>(() => {
    if (isLoading && isFetching) {
      return {
        status: "loading",
        user: undefined,
      };
    }
    if (!isSuccess && !isFetching) {
      return {
        status: "unauthenticated",
        user: undefined,
      };
    }
    if (!isSuccess || isError) {
      deleteCookie("authToken", { path: "/", domain: "localhost" });
      return {
        status: "unauthenticated",
        user: undefined,
      };
    }
    const user = data.data.data as User;
    user.receiveEmail = data.data.data.receive_email;
    const session: Session = {
      status: "authenticated",
      user: user,
    };
    return session;
  }, [data, isLoading, isError, isSuccess, isFetching]);

  return session;
};

export default useSession;
