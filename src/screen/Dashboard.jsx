import React, { useState } from "react";
import { Chart } from ".././components/custom/Chart";

import { TransactionList } from "@/components/custom/TransactionList";
import TransactionForm from "@/components/custom/TransactionForm";
import Piechart from "@/components/custom/Piechart";

function Dashboard() {
  return (
    <div>
      <h1 className="text-center text-4xl italic font-black">
        Personal Finance Visualizer
      </h1>
      <div className="justify-items-center my-2">
        <TransactionForm />
      </div>
      <Chart />
      <Piechart />
      <TransactionList />
    </div>
  );
}

export default Dashboard;
