"use client";

import { Card } from "@repo/ui/card";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  const user = status === "authenticated" ? session?.user : undefined;

  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={user} />
      <Card title="Hello">Card in User-App</Card>
    </div>
  );
}
