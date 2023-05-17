interface User {
  username: string;
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
  const session: Session = {
    status: "authenticated",
    user: {
      username: "John DOe",
    },
  };
  return session;
};

export default useSession;
