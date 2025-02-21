import React, { useEffect, useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { updateTransaction } from "@/redux/transaction/transactionSlice";

function TransactionUpdate({ invoice, index }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    Amount: 0,
    Desc: "",
    date: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const num = parseInt(input.Amount, 10);
    dispatch(updateTransaction({ data: input, index }));
    setInput({ Amount: 0, Desc: "", date: "" });
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
    });
  }, [invoice]);
  return (
    <div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Transaction details</AlertDialogTitle>
          <AlertDialogDescription className="grid gap-2">
            <Input
              name="Amount"
              type="number"
              placeholder="Enter the Amount"
              value={input.Amount}
              onChange={handleChangeInput}
              required
            />
            <Input
              name="date"
              type="month"
              className="justify-center"
              value={input.date}
              onChange={handleChangeInput}
              required
            />
            <div className="col-span-2">
              <Label htmlFor="message">Desc</Label>
              <Textarea
                name="Desc"
                placeholder="Type your Description here."
                id="message"
                value={input.Desc}
                onChange={handleChangeInput}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </div>
  );
}

export default TransactionUpdate;
