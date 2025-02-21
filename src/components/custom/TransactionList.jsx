import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionCard } from "./TransactionCard";
import { useSelector } from "react-redux";

export function TransactionList() {
  const invoices = useSelector((state) => state.counter.value);
  return (
    <>
      <h2 className="text-2xl font-extrabold">Transaction List...</h2>
      <div className="flex flex-auto gap-4 m-4 flex-wrap">
        {invoices.map((invoice, index) => (
          <TransactionCard invoice={invoice} key={index} index={index} />
        ))}
      </div>
    </>
  );
}
