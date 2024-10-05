"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DailyAnalytices from "./DailyAnalytices"
import WeeklyAnalytics from "./WeeklyAnalytics"
import MonthlyAnalytices from "./MonthlyAnalytices"

const Aanlytices = () => {
    return (
        <div>
            <Tabs defaultValue="daily">
                <TabsList className="bg-gray-300">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="daily">
                    <DailyAnalytices />
                </TabsContent>
                <TabsContent value="weekly">
                    <WeeklyAnalytics />
                </TabsContent>
                <TabsContent value="monthly">
                    <MonthlyAnalytices />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Aanlytices
