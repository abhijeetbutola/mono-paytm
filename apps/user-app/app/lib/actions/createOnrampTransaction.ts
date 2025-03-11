"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = Number(session?.user.id);

  if (!userId) {
    return {
      message: "You are not logged in",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      userId,
      amount,
      status: "Processing",
      startTime: new Date(),
      provider,
      token: token,
    },
  });
}
