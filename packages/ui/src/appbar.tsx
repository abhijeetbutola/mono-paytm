import { Button } from "./button";
import { signIn, signOut } from "next-auth/react";

type AppbarProps = {
  user?: {
    name?: string | null;
  };
  onSignin: typeof signIn;
  onSignout: typeof signOut;
};

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
