import Balance from "@/components/balance";
import SendMoney from "@/components/sendMoney";
import Transactions from "@/components/transactions";

export default function page() {
  return (
    <section>
      <h1 className="text-5xl font-extrabold text-purple-500 mb-4">
        P2P Transfer
      </h1>
      <div className="flex gap-4">
        <SendMoney />
        <div className="basis-1/2">
        <Balance />
        <Transactions />
        </div>
      </div>
    </section>
  );
}
