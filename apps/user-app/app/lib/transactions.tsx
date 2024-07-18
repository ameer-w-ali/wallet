"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db";

export async function getBalance() {
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

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return txns.map((txn) => ({
    time: txn.startTime,
    amount: txn.amount,
    status: txn.status,
    provider: txn.provider,
  }));
}

export async function getTransfers() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const sentTxns = await prisma.p2pTransfer.findMany({
    where: {
      from: userId,
    },
    select: {
      timestamp: true,
      amount: true,
      toUser: {
        select: {
          name: true,
          number: true,
        },
      },
    },
  });

  const receivedTxns = await prisma.p2pTransfer.findMany({
    where: {
      to: userId,
    },
    select: {
      timestamp: true,
      amount: true,
      fromUser: {
        select: {
          name: true,
          number: true,
        },
      },
    },
  });

  const formattedSentTxns = sentTxns.map(({ amount, toUser, timestamp }) => ({
    type: "sent",
    name: toUser.name,
    number: toUser.number,
    amount: amount / 100,
    time: new Date(timestamp),
  }));

  const formattedReceivedTxns = receivedTxns.map(({amount,fromUser,timestamp})=>({
    type:'received',
    name:fromUser.name,
    number:fromUser.number,
    amount:amount/100,
    time:new Date(timestamp)
  }))

  const allTxns = [...formattedReceivedTxns,...formattedSentTxns].sort(
    (a,b)=> a.time.getTime() - b.time.getTime()
  )
  return allTxns;
}
