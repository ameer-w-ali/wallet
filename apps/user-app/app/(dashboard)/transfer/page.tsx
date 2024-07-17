import { authOptions } from "@/app/lib/auth";
import AddMoney from "@/components/addMoney";
import Balance from "@/components/balance";
import Transactions from "@/components/transactions";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return txns.map(txn=>({
    time:txn.startTime,
    amount:txn.amount,
    status:txn.status,
    provider:txn.provider
  }))
}

export default async function page() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <section>
      <h1 className="text-5xl font-extrabold text-purple-500">Transfer</h1>
      <div className="flex gap-2 mt-4">
        <AddMoney />
        <Balance amount={balance.amount} locked={balance.locked} />
      </div>
      <Transactions transactions={transactions} />
    </section>
  );
}
