"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function Chart() {
  const allTransactions = useSelector((state) => state.counter.value);

  const [chartData, setChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  let initialChartData = [
    { month: "January", amount: 0 },
    { month: "February", amount: 0 },
    { month: "March", amount: 0 },
    { month: "April", amount: 0 },
    { month: "May", amount: 0 },
    { month: "June", amount: 0 },
    { month: "July", amount: 0 },
    { month: "Augest", amount: 0 },
    { month: "September", amount: 0 },
    { month: "Octuber", amount: 0 },
    { month: "November", amount: 0 },
    { month: "December", amount: 0 },
  ];

  useEffect(() => {
    if (allTransactions.length !== 0) {
      let newChartData = [...initialChartData];
      let total = 0;
      allTransactions.forEach((ele) => {
        total += ele.Amount;
        if (ele.date.length !== 0) {
          const index = parseInt(ele.date.split("-")[1], 10);
          newChartData[index - 1] = {
            ...newChartData[index - 1],
            amount: newChartData[index - 1].amount + ele.Amount,
          };
        }
      });
      setChartData([...newChartData]);
      setTotalAmount(total);
    }
  }, [allTransactions]);

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        {/* {console.log(allTransactions[0].date.split("-")[1])} */}
      </CardHeader>
      <CardContent className="justify-items-center">
        <div className="w-[500px] h-[300px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              width={500}
              height={300}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Amount:{" "}
          <span className="text-2xl font-bold text-gray-500/75">
            Rs {totalAmount}
          </span>
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
