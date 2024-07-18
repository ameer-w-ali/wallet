import AddMoney from "@/components/addMoney";
import Balance from "@/components/balance";
import Transactions from "@/components/rampTransactions";

export default async function page() {
  return (
    <section>
      <h1 className="text-5xl font-extrabold text-purple-500 mb-4">Transfer</h1>
      <div className="flex gap-2">
        <AddMoney />
        <div className="basis-1/2">
          <Balance />
          <Transactions />
        </div>
      </div>
    </section>
  );
}
