import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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
/*


*/
function Piechart() {
  const allTransactions = useSelector((state) => state.counter.value);
  const [pieChartData, setPieChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const initialPieChartData = [
    { category: "Food", amount: 0, fill: "#7a7976" },
    { category: "Entertainment", amount: 0, fill: "#5c5b58" },
    { category: "Housing", amount: 0, fill: "#424242" },
    { category: "Education", amount: 0, fill: "#1c1c1b" },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    Food: {
      label: "Food",
      color: "hsl(var(--chart-1))",
    },
    Entertainment: {
      label: "Entertainment",
      color: "hsl(var(--chart-2))",
    },
    Housing: {
      label: "Housing",
      color: "hsl(var(--chart-3))",
    },
    Education: {
      label: "Education",
      color: "hsl(var(--chart-4))",
    },
  };

  useEffect(() => {
    if (allTransactions.length !== 0) {
      let newChartData = [...initialPieChartData];
      let total = 0;
      allTransactions.forEach((ele) => {
        total += parseInt(ele.Amount);
        const index = newChartData.findIndex(
          (item) => item.category === ele.category
        );
        newChartData[index] = {
          ...newChartData[index],
          amount: newChartData[index].amount + parseInt(ele.Amount),
        };
      });
      setPieChartData([...newChartData]);
      setTotalAmount(total);
    }
  }, [allTransactions]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          {totalAmount !== 0 ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieChartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
              />
            </PieChart>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              No Transaction Added
            </div>
          )}
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default Piechart;
