import Card from "@repo/ui/card";

type PropTypes = {
  amount: number;
  locked: number;
};

export default function Balance({ amount, locked }: PropTypes) {
  return (
    <Card title="Balance" className="basis-2/5 h-full">
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
