import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransaction } from "../../../components/P2PTransaction";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const balance = await prisma.balance.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getP2PTransfers() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(userId),
    },
  });

  return txns.map((t) => ({
    amount: t.amount,
    time: t.timestamp,
    to: String(t.toUserId),
  }));
}

export default async function P2PTransfers() {
  const balance = await getBalance();
  const transactions = await getP2PTransfers();

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfers
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div>
          <SendMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <P2PTransaction transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
