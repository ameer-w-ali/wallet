import express from "express";
import prisma from "@repo/db";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
  res.send("Running...")
})

app.post("/hdfc-webhook", async (req, res) => {
  const transaction = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.balance.updateMany({
        where: { userId: Number(transaction.userId) },
        data: {
          amount: {
            increment: Number(transaction.amount),
          },
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: { token: transaction.token },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (error) {
    console.error(error);
    res.status(211).json({ message: "Error while processing webhook" });
  }
});


app.listen(3002,()=>{
  console.log('Bank Webhook running on http://localhost:3002')
})