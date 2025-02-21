import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { addTransaction } from "@/redux/transaction/transactionSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TransactionForm() {
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    Amount: 0,
    Desc: "",
    date: "",
    category: "",
  });
  const dispatch = useDispatch();
  let today = new Date();

  let formattedDate = today.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  function handleSubmit(e) {
    setError(false);
    console.log(formattedDate);
    e.preventDefault();
    if (
      !input.Amount ||
      input.Amount === 0 ||
      input.Desc.length == 0 ||
      input.date.length === 0 ||
      input.category.length === 0
    ) {
      setError(true);
      return;
    }
    const num = parseInt(input.Amount, 10);
    dispatch(addTransaction({ ...input, Amount: num }));
    setInput({ Amount: 0, Desc: "", date: "", category: "" });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <span>
          <Label htmlFor="message">Amount</Label>
          <input
            name="Amount"
            type="number"
            placeholder="Enter the Amount"
            value={input.Amount}
            onChange={handleChangeInput}
            required
            className="flex min-h-[37px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </span>
        <span>
          <Label htmlFor="message">Date</Label>
          <input
            name="date"
            type="date"
            className="justify-center min-h-[37px] w-full border border-input bg-background rounded-md flex"
            value={input.date}
            max={formattedDate}
            onChange={handleChangeInput}
            required
          />
        </span>
        <Select
          name="category"
          value={input.category}
          onValueChange={(e) => setInput({ ...input, category: e })}
        >
          <SelectTrigger className="w-auto col-span-2">
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
        <div className="col-span-2">
          <Label htmlFor="message">Desc</Label>
          <Textarea
            name="Desc"
            placeholder="Type your Description here."
            id="message"
            value={input.Desc}
            onChange={handleChangeInput}
            className="required:"
          />
        </div>
        {error ? (
          <p className="col-span-2 text-center text-orange-400/70 dark:text-orange-500">
            Some Input fields are empty!!
          </p>
        ) : (
          ""
        )}
        <Button type="submit" className="col-span-2" onClick={handleSubmit}>
          Add Amount
        </Button>
      </div>
    </div>
  );
}

export default TransactionForm;

{
  /* <input type="date" id="datemax" name="datemax" max="1979-12-31"> */
}
