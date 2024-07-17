import { ArrowRightLeft, Clock, Home } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="mt-2 mx-auto space-y-2">
        <Link href="/dashboard" className="icon">
          <Home size={18} /> Home
        </Link>
        <Link href="/transfer" className="icon">
          <ArrowRightLeft size={18} />
          Transfer
        </Link>
        <Link href="/transactions" className="icon">
          <Clock size={18} /> Transactions
        </Link>
      </div>
    </aside>
  );
}
