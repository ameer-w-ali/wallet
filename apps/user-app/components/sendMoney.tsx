"use client";
import { p2pTransfer } from "@/app/lib/actions/p2pTransfer";
import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import Input from "@repo/ui/input";
import { useState } from "react";

export default function SendMoney() {
  const [number, setNumber] = useState<string>();
  const [amount, setAmount] = useState(0);

  async function handleSend() {
    try {
      if (!number) throw new Error("number is not defined");
      await p2pTransfer(number, amount * 100);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card title="Send Money" className="basis-1/2 h-full">
      <Input
        id="number"
        label="Phone No"
        type="tel"
        onChange={(val) => setNumber(val)}
        placeholder="e.g. 9988776655"
      />
      <Input
        id="amount"
        label="Amount"
        type="number"
        onChange={(val) => setAmount(Number(val))}
        placeholder="e.g. 2000"
      />
      <div className="text-center">
        <Button onClick={handleSend}>Send Money</Button>
      </div>
    </Card>
  );
}
