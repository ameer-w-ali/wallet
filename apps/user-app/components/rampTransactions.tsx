import { getOnRampTransactions } from "@/app/lib/transactions";
import Card from "@repo/ui/card";

export default async function Transactions() {
  const transactions = await getOnRampTransactions();
  return (
    <Card title="Recent Transactions" className="mt-4">
      {!transactions.length ? (
        <div className="text-center py-8">No Recent transactions</div>
      ) : (
        <div>
          {transactions.map((t) => (
            <div className="flex justify-between">
              <div>
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs">
                  <span>{t.provider} | </span>
                  <span>{t.time.toDateString()}</span>
                </div>
              </div>
              <div>
                {t.status === "Success" && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded-full">
                    {t.status}
                  </span>
                )}
                {t.status === "Processing" && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded-full">
                    {t.status}
                  </span>
                )}
                {t.status === "Failure" && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded-full">
                    {t.status}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
