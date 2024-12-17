"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Package, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns"; // Import parseISO to handle ISO date format

const StockItem = ({ title, value, icon: Icon }) => (
  <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
    <Icon className="h-6 w-6 text-muted-foreground" />
    <h3 className="text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const StockCard = () => {
  const [date, setDate] = useState(new Date()); // Date displayed on the calendar
  const [stockData, setStockData] = useState({
    totalStocks: 0,
    packedStocks: 0,
    unpackedStocks: 0,
  });
  const [error, setError] = useState("");

  /**
   * Fetches stock data from the backend for a specific date
   * If no date is provided, it fetches the latest available stock data
   * @param {Date | null} selectedDate
   */
  const fetchStockData = async (selectedDate = null) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Access token not found. Please log in again.");
      toast.error("Access token not found. Please log in again.");
      return;
    }

    const payload = selectedDate
      ? {
          date: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        }
      : {};

    try {
      const response = await axios.post(
        "https://kooviot.vercel.app/admin/stocks/retrieve",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Response data:", response.data);
        const {
          packedStocks,
          unpackedStocks,
          totalStocks,
          date: responseDate,
        } = response.data.data;

        // Update stock data with response values
        setStockData({ packedStocks, unpackedStocks, totalStocks });

        // If the API returns a valid date, update the calendar to show that date
        if (responseDate) {
          const formattedDate = parseISO(responseDate); // Parse ISO date (e.g., "2024-12-12T00:00:00.000Z")
          if (!isNaN(formattedDate.getTime())) {
            setDate(formattedDate); // Set the date if valid
          } else {
            console.warn(
              "Invalid date from API, falling back to today's date."
            );
            setDate(new Date()); // Fallback to today's date if the response date is invalid
          }
        } else {
          setDate(new Date()); // Fallback to today's date if no date is provided
        }

        toast.success("Stocks data retrieved successfully");
      } else {
        toast.error("Unexpected response status.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to retrieve stocks data. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  /**
   * Runs on initial page load to fetch the latest available stock data
   */
  useEffect(() => {
    fetchStockData(); // No date is sent to fetch the latest available data
  }, []);

  /**
   * Handles date change event from the calendar
   * @param {Date} newDate
   */
  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchStockData(newDate);
  };

  return (
    <Card className="w-full max-w-7xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Stock Overview</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date && date instanceof Date && !isNaN(date.getTime()) ? (
                format(date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <StockItem
            title="Total Stocks"
            value={stockData.totalStocks}
            icon={Package}
          />
          <StockItem
            title="Packed Stocks"
            value={stockData.packedStocks}
            icon={Package}
          />
          <StockItem
            title="Unpacked Stocks"
            value={stockData.unpackedStocks}
            icon={PackageOpen}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StockCard;
