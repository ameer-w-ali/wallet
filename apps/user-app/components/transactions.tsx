"use client";
import { getTransfers } from "@/app/lib/transactions";
import Card from "@repo/ui/card";
import { useEffect, useState } from "react";

type TxnTypes = {
  type: string;
  name: string | null;
  number: string;
  time: Date;
  amount: number;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<TxnTypes[]>();
  useEffect(() => {
    async function get() {
      const data: TxnTypes[] = await getTransfers();
      setTransactions(data);
    }
    get();
  }, []);

  return (
    <Card title="Recent Transactions" className="mt-4">
      {!transactions || !transactions.length ? (
        <div className="text-center py-8">No Recent transactions</div>
      ) : (
        <div>
          {transactions.map((t, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <div className="font-bold">
                  {t.type === "sent" ? "Sent to" : "Received from"}{" "}
                  {t.name ? t.name : t.number}
                </div>
                <div className="text-xs">{t.time.toLocaleDateString()}</div>
              </div>
              <div
                className={`font-medium ${t.type === "sent" ? "text-red-700" : "text-green-700"}`}
              >
                {t.type === "sent" ? "-" : "+"}
                {t.amount} INR
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
