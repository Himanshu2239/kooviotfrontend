// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Info, CalendarIcon } from "lucide-react";
// import { format } from "date-fns";

// // Reusable MetricCard component
// const MetricCard = ({ title, value, info, percentage }) => (
//   <Card>
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="text-sm font-medium">
//         {title}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger className="ml-1">
//               <Info className="h-4 w-4 text-muted-foreground" />
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>{info}</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//     <div className="text-2xl font-bold">732,3292</div>
//       <p className="text-xs text-muted-foreground">Month-to-Date</p>
//       <div className="mt-4 text-lg font-semibold">
//         {/* {todayValue.toLocaleString()} */}
//       </div>
//       <div className="text-2xl font-bold">38,3929</div>
//       <p className="text-xs text-muted-foreground">Today</p>
//       {/* <p className="text-xs text-muted-foreground">{title}</p> */}
//       {percentage !== undefined && (
//         <div className="mt-2 text-sm font-medium">
//           Percentage: {percentage.toFixed(2)}%
//         </div>
//       )}
//     </CardContent>
//   </Card>
// );

// // Main Dashboard Component
// const RejectionReport = () => {
//   // State to manage the selected date
//   const [selectedDate, setSelectedDate] = useState(null);

//   // State to store rejection report data
//   const [metrics, setMetrics] = useState({
//     Total: 0,
//     Line: 0,
//     Packing: 0,
//     Scrap: 0,
//   });

//   // State to manage loading state
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to fetch rejection report metrics
//   const fetchMetrics = async (date = null) => {
//     let payload = {};

//     if (date) {
//       const year = date.getFullYear();
//       const month = date.toLocaleString("default", { month: "long" });
//       const day = date.getDate();
//       payload = { year, month, day: day.toString().padStart(2, "0") };
//     }

//     const accessToken = localStorage.getItem("accessToken");

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5001/admin/rejectionReport",
//         date ? payload : {},
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       if (response.status === 200) {
//         const data = response.data;
//         console.log("Response data:", data);
      
      

//         // Update metrics state with fetched data
//         // setMetrics({
//         //   Total: data?.total || 0,
//         //   Line: data?.line || 0,
//         //   Packing: data?.packing || 0,
//         //   Scrap: data?.scrap || 0,
//         // });

//         // if (!date && data.date) {
//         //   const [yearStr, monthName, dayStr] = data.date.split("-");
//         //   const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();
//         //   const reportDate = new Date(yearStr, monthIndex, parseInt(dayStr, 10));
//         //   setSelectedDate(reportDate);
//         // }


//       } else {
//         console.warn(`Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching metrics:", error.message || error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   // Handle date selection from the calendar
// //   const handleDateSelect = (date) => {
// //     setSelectedDate(date);
// //     fetchMetrics(date);
// //   };

//   // Calculate percentage for Line and Packing
//   const calculatePercentage = (value, total) => {
//     return total > 0 ? (value / total) * 100 : 0;
//   };

//   return (
//     <div className="w-full mx-auto p-4 space-y-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Rejection Report</h2>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="w-[240px] justify-start text-left font-normal"
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="end">
//             <Calendar
//               mode="single"
//               selected={selectedDate}
//               onSelect={(date) => {
//                 if (date) handleDateSelect(date);
//               }}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <MetricCard
//           title="Total"
//           value={metrics.Total}
//           info="Total number of rejections"
//         />
//         <MetricCard
//           title="Line"
//           value={metrics.Line}
//           info="Number of rejections on the production line"
//           percentage={calculatePercentage(metrics.Line, metrics.Total)}
//         />
//         <MetricCard
//           title="Packing"
//           value={metrics.Packing}
//           info="Number of rejections during packing"
//           percentage={calculatePercentage(metrics.Packing, metrics.Total)}
//         />
//         <MetricCard
//           title="Scrap"
//           value={metrics.Scrap}
//           info="Number of items scrapped"
//         />
//       </div>

//       {isLoading && (
//         <div className="flex justify-center items-center">
//           <p className="text-gray-500">Loading metrics...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RejectionReport;


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

const MetricCard = ({ title, todayValue, monthValue, info }) => (
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
      <div className="text-2xl font-bold">{monthValue.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground">Month-to-Date</p>
      <div className="mt-4 text-2xl font-bold">{todayValue.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground">Today</p>
    </CardContent>
  </Card>
);

const RejectionReport = ({selectedDateByMain}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [metrics, setMetrics] = useState({
    today: { total: 0, line: 0, packing: 0, scrap: 0 },
    month: { total: 0, line: 0, packing: 0, scrap: 0 },
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMetrics = async (date = null) => {
    let payload = {};

    // console.log("date", date);
   

    if (date) {
      const dateInMonth = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ));
      console.log("dateInMonth", dateInMonth);
      const formattedDate = dateInMonth.toISOString().split("T")[0]
      payload = formattedDate;
      date = payload;
       
      
      // payload = {
      //   year: date.getFullYear(),
      //   month: date.toLocaleString("default", { month: "long" }),
      //   day: date.getDate().toString().padStart(2, "0"),
      // };
    }

    // console.log("payload", payload);

    

    const accessToken = localStorage.getItem("accessToken");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/admin/rejectionReport",
        date ? { payload } : {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        const data = response.data;
        // console.log("rejection Report", data);
        if(data.lastUpdatedDate){
          const dateObj = new Date(data.lastUpdatedDate);
          // const formattedDate = dateObj.toISOString().split("T")[0]; 
          setSelectedDate(dateObj)
        }

        const todayData = data.selectedDateData || {};
        const monthData = data.monthToDateSum || {};
        
        // console.log("todayData", todayData);
        // console.log("monthData", monthData);

        setMetrics({
          today: {
            total: (todayData.lineRejection || 0) + (todayData.packingRejection || 0),
            line: todayData.lineRejection || 0,
            packing: todayData.packingRejection || 0,
            scrap: todayData.scrap || 0,
          },
          month: {
            total: (monthData.totalLineRejection || 0) + (monthData.totalPackingRejection || 0),
            line: monthData.totalLineRejection || 0,
            packing: monthData.totalPackingRejection || 0,
            scrap: monthData.totalScrap || 0,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching metrics:", error || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(selectedDateByMain){
      fetchMetrics(selectedDateByMain);
      // console.log("selectedDate",selectedDate);
    }
    else
    fetchMetrics();
  }, [selectedDateByMain]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    fetchMetrics(date);
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Rejection Report</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Rejection" todayValue={metrics.today.total} monthValue={metrics.month.total} info="Total number of rejections" />
        <MetricCard title="Line Rejection" todayValue={metrics.today.line} monthValue={metrics.month.line} info="Number of rejections on the production line" />
        <MetricCard title="Packing Rejection" todayValue={metrics.today.packing} monthValue={metrics.month.packing} info="Number of rejections during packing" />
        <MetricCard title="Scrap In MT" todayValue={metrics.today.scrap} monthValue={metrics.month.scrap} info="Number of items scrapped" />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center">
          <p className="text-gray-500">Loading metrics...</p>
        </div>
      )}
    </div>
  );
};

export default RejectionReport;
