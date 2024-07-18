import { getBalance } from "@/app/lib/transactions";
import Card from "@repo/ui/card";

export default async function Balance() {
  const { amount, locked } = await getBalance();
  return (
    <Card title="Balance">
      <Para title="Unlocked Balance" value={amount} />
      <Para title="Locked Balance" value={locked} />
      <Para
        title="Total Balance"
        value={amount + locked}
        className="text-lg font-bold border-t"
      />
    </Card>
  );
}

function Para({
  value,
  title,
  className,
}: {
  value: number;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between items-center border-slate-300 pb-2 ${className}`}
    >
      <p>{title}</p>
      <p>{value / 100} INR</p>
    </div>
  );
}
