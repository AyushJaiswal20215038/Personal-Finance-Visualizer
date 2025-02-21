import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { updateTransaction } from "@/redux/transaction/transactionSlice";
import { Button } from "../ui/button";

function TransactionUpdate({ invoice, index }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    Amount: 0,
    Desc: "",
    date: "",
    category: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const num = parseInt(input.Amount, 10);
    dispatch(updateTransaction({ data: input, index }));
    setInput({ Amount: 0, Desc: "", date: "", category: "" });
    return;
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }
  useEffect(() => {
    setInput({
      Amount: invoice.Amount,
      Desc: invoice.Desc,
      date: invoice.date,
      category: invoice.category,
    });
  }, [invoice]);
  return (
    <div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Transaction details</SheetTitle>
          <SheetDescription>
            Make changes to your transactions here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Amount" className="text-right">
              Amount
            </Label>
            <Input
              name="Amount"
              type="number"
              placeholder="Enter the Amount"
              value={input.Amount}
              onChange={handleChangeInput}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              date
            </Label>
            <Input
              name="date"
              type="date"
              className="justify-center col-span-3"
              value={input.date}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              name="category"
              value={input.category}
              onValueChange={(e) => setInput({ ...input, category: e })}
            >
              <SelectTrigger className="w-auto col-span-3">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Desc.
            </Label>
            <Textarea
              name="Desc"
              placeholder="Type your Description here."
              id="message"
              value={input.Desc}
              className="col-span-3"
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </div>
  );
}

export default TransactionUpdate;
