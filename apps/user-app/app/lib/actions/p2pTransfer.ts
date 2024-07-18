"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function p2pTransfer(number: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) throw new Error("Unauthorized Action");

  const to = await prisma.user.findFirst({
    where: {
      number,
    },
  });

  if (!to) throw new Error("user not exist");
  if (to.id === Number(from)) throw new Error("Cannot transfer to yourself");

  await prisma.$transaction(async (tx) => {
    await tx.$queryRawUnsafe(
      'SELECT * FROM "Balance" WHERE "userId"=$1 FOR UPDATE',
      Number(from)
    );

    const fromBalance = await tx.balance.findUnique({
      where: {
        userId: Number(from),
      },
    });

    if (!fromBalance || fromBalance.amount < amount)
      throw new Error("Insufficient Funds");

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: Number(to.id) },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        from: Number(from),
        to: to.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
