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
  const session: Session = {
    status: "authenticated",
    user: {
      username: "John Doe",
      email: "johndoe@gmail.com",
      receiveEmail: true,
    },
  };
  return session;
};

export default useSession;
