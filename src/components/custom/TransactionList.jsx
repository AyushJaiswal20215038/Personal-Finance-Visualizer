import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TransactionCard } from "./TransactionCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import RecentTransaction from "./RecentTransaction";

export function TransactionList() {
  const invoices = useSelector((state) => state.counter.value);
  const [category, setCategory] = useState("All");
  return (
    <>
      <div className="flex justify-between m-4">
        <h2 className="text-2xl font-extrabold">Transaction List...</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="mx-2 ml-auto"
              disabled={invoices.length === 0}
            >
              Recent
            </Button>
          </PopoverTrigger>
          <RecentTransaction />
        </Popover>
        <Select
          name="category"
          value={category}
          onValueChange={(e) => setCategory(e)}
        >
          <SelectTrigger className="w-auto col-span-2">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-auto gap-4 m-4 flex-wrap">
        {invoices
          .filter((invoice) => {
            return category === "All" || invoice.category === category;
          })
          .map((invoice, index) => (
            <TransactionCard invoice={invoice} key={index} index={index} />
          ))}
      </div>
    </>
  );
}
