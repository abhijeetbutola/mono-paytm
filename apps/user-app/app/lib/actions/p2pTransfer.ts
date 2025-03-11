"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  console.log("INvoked");

  const session = await getServerSession(authOptions);
  const from = session?.user.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message:
        "The person you are trying to send the money doesn't exist in our database",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    const fromBalance = await tx.balance.findUnique({
      where: {
        userId: Number(from),
      },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: {
        userId: Number(from),
      },
      data: {
        amount: { decrement: amount },
      },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        amount,
        fromUserId: Number(from),
        toUserId: Number(toUser.id),
        timestamp: new Date(),
      },
    });
  });
}
