import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

function RecentTransaction() {
  const allTransactions = useSelector((state) => state.counter.value);
  const [recent, setRecent] = useState({
    Amount: 0,
    Desc: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    let maxIndex = 0;
    if (allTransactions.length === 0) return;
    let maxDate = new Date(allTransactions[0].date);

    allTransactions.forEach((transaction, index) => {
      const currentDate = new Date(transaction.date);
      if (currentDate >= maxDate) {
        maxDate = currentDate;
        maxIndex = index;
      }
    });
    setRecent(allTransactions[maxIndex]);
  }, [allTransactions]);

  return (
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">
            Rs <span className="text-1xl text-gray-500">{recent.Amount}</span>
          </h4>
          <p className="text-sm text-muted-foreground">{recent.date}</p>
          <Badge>{recent.category}</Badge>
          <p>{recent.Desc}</p>
        </div>
      </div>
    </PopoverContent>
  );
}

export default RecentTransaction;
