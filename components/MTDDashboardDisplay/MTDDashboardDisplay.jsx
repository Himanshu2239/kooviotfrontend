import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Reusable MetricCard component
const MetricCard = ({ title, todayValue, mtdValue, info }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="ml-1">
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{mtdValue.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground">Month-to-Date</p>
      <div className="mt-4 text-lg font-semibold">
        {todayValue.toLocaleString()}
      </div>
      <p className="text-xs text-muted-foreground">Today</p>
    </CardContent>
  </Card>
);

// Main Dashboard Component
const AdminMetricsDashboard = ({selectedDateByMain}) => {
  // State to manage the selected date; initialized as null to indicate fetching the latest report
  const [selectedDate, setSelectedDate] = useState(null);

  // console.log("selectedDateByMain", selectedDateByMain)

  // State to store metrics data
  const [metrics, setMetrics] = useState({
    "Total Dispatch": { today: 0, mtd: 0 },
    Production: { today: 0, mtd: 0 },
    Packing: { today: 0, mtd: 0 },
    Sales: { today: 0, mtd: 0 },
  });

  // State to manage loading state (optional for better UX)
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch metrics data from the backend API.
   * @param {Date|null} date - The date for which to fetch the report. If null, fetches the latest report.
   */
  const fetchMetrics = async (date = null) => {
    let payload = {};

    // If a specific date is provided, construct the payload with year, month, day
    if (date) {
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      payload = { year, month, day: day.toString().padStart(2, "0") };
    }

    const accessToken = localStorage.getItem("accessToken");

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
         "https://kooviot.vercel.app/admin/mtd/values",
        date ? payload : {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        const data = response.data;
        // console.log("Response data:", data);

        // Update metrics state with the fetched data
        setMetrics({
          "Total Dispatch": {
            today: data?.dayReport?.totaldispatch || 0,
            mtd: data?.monthReportTillDate?.totaldispatch || 0,
          },
          Production: {
            today: data?.dayReport?.production || 0,
            mtd: data?.monthReportTillDate?.production || 0,
          },
          Packing: {
            today: data?.dayReport?.packing || 0,
            mtd: data?.monthReportTillDate?.packing || 0,
          },
          Sales: {
            today: data?.dayReport?.sales || 0,
            mtd: data?.monthReportTillDate?.sales || 0,
          },
        });

        // If fetching the latest report, update the selectedDate to the report's date
        if (!date && data.date) {
          const [yearStr, monthName, dayStr] = data.date.split("-");
          const monthIndex = new Date(`${monthName} 1, 2000`).getMonth(); // Zero-based index
          const reportDate = new Date(yearStr, monthIndex, parseInt(dayStr, 10));
          console.log("reportDate", reportDate);
          setSelectedDate(reportDate);
        }
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error.message || error);
      // Optionally, you can set error states here to display to the user
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Fetch the latest report on component mount
  useEffect(() => {
    // console.log("selectedByMain", selectedDateByMain)
    if(selectedDateByMain)
    fetchMetrics(selectedDateByMain);
    else
    {
      // console.log("else chal raha")
      fetchMetrics();
    }
   
  }, [selectedDateByMain]);

  /**
   * Handle date selection from the calendar.
   * @param {Date} date - The date selected by the admin. 
   */
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    fetchMetrics(date);
  };

  return (
    <div className="w-full mx-auto p-4">
      {/* Header Section with Title and Date Picker */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Metrics Overview</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) handleDateSelect(date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          // className='hover:animate-bounce'
          title="Production"
          todayValue={metrics.Production.today}
          mtdValue={metrics.Production.mtd}
          info="Number of items produced"
        />
        <MetricCard
          title="Packing"
          todayValue={metrics.Packing.today}
          mtdValue={metrics.Packing.mtd}
          info="Number of items packed"
        />
        <MetricCard
          title="Total Dispatch"
          todayValue={metrics["Total Dispatch"].today}
          mtdValue={metrics["Total Dispatch"].mtd}
          info="Number of items dispatched"
        />
        <MetricCard
          title="Sales"
          todayValue={metrics.Sales.today}
          mtdValue={metrics.Sales.mtd}
          info="Total sales amount in dollars"
        />
      </div>

      {/* Optional: Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <p className="text-gray-500">Loading metrics...</p>
        </div>
      )}
    </div>
  );
};

export default AdminMetricsDashboard;
 

