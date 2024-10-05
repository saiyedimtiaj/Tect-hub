import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple bar chart";

type Props = {
    header: string;
    postData: { month: string, desktop: number }[];
    label: string;
    title: string
};

const AnalyticesBarChart = ({ header, postData, label, title }: Props) => {
    const chartConfig = {
        desktop: {
            label: label,
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <Card className="h-[450px] border rounded-lg shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {header}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <ChartContainer className="h-[300px] w-full" config={chartConfig}>
                    <BarChart
                        data={postData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='dot' />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            barSize={30} // Adjust bar size as needed
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default AnalyticesBarChart;
