"use client";

import React, { useState } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaDownload } from "react-icons/fa";

const salespeople = [
  { id: "SP001", name: "Ravikumar N", jobId: "KIOL2238", area: "Bangalore" },
  { id: "SP002", name: "Sugumar R", jobId: "KIOL2236", area: "Chennai, TN" },
  { id: "SP003", name: "Vineesh Mehta", jobId: "KIOL2239", area: "Delhi" },
  {
    id: "SP004",
    name: "Soma Naveen Chandra",
    jobId: "KIOL2070",
    area: "Hyderabad",
  },
  {
    id: "SP005",
    name: "Bharat Lal Dubey",
    jobId: "KIOL2064",
    area: "Maharashtra",
  },
  { id: "SP006", name: "Sushila Shaw", jobId: "KIOL2225", area: "Kolkata" },
  { id: "SP007", name: "Ardhendu Aditya", jobId: "KIOL2234", area: "Kolkata" },
  { id: "SP008", name: "Krishnamoorthi", jobId: "KIOL2243", area: "Singapore" },
];

const TaskList = ({ tasks = [], title }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold capitalize">{title}</h3>
    <ul className="space-y-2">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
            <span className="text-sm">{task?.taskDescription}</span>
          </li>
        ))
      ) : (
        <p>No available tasks</p>
      )}
    </ul>
  </div>
);

export default function AdminTasks() {
  const [date, setDate] = useState(new Date());
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [tasksData, setTasksData] = useState({
    tasks: [],
    completedTasks: [],
    incompleteTasks: [],
    extraTasks: [],
  });
  const [latestDocument, setLatestDocument] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedSalesperson) {
      alert("Please select a salesperson");
      return;
    }

    const formattedDate = date.getDate();
    const formattedMonth = date.getMonth() + 1; // JavaScript months are 0-based
    const formattedYear = date.getFullYear();

    const payload = {
      date: formattedDate,
      month: formattedMonth,
      year: formattedYear,
      jobId: selectedSalesperson,
    };

    const token = localStorage.getItem("accessToken");
    console.log("payload :", payload);
    try {
      setLoading(true);
      const response = await axios.post(
        "https://kooviot.vercel.app/admin/adminViewTasks",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("admin/adminViewTasks", response.data);
      if (response?.data) {
        setTasksData(
          response?.data || {
            tasks: [],
            completedTasks: [],
            incompleteTasks: [],
            extraTasks: [],
          }
        );
        setLatestDocument(response?.data?.latestDocument);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);

      alert("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleDownloadClick = () => {
  //   if (latestDocument) {
  //     const link = document.createElement("a");
  //     link.href = latestDocument;
  //     link.setAttribute("download", "document");
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     alert("No document available for download.");
  //   }
  // };
  const handleDownloadClick = () => {
    if (latestDocument) {
      const link = document.createElement("a");
      link.href = latestDocument;

      // Extract filename from the URL or set a default
      const urlParts = latestDocument.split("/");
      const filename = urlParts[urlParts.length - 1] || "document";

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No document available for download.");
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="w-full lg:w-auto">
          <CardHeader>
            <CardTitle>Select Date and Salesperson</CardTitle>
            <CardDescription>
              Choose a date and salesperson to view tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <Select onValueChange={setSelectedSalesperson}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select salesperson" />
              </SelectTrigger>
              <SelectContent>
                {salespeople.map((person) => (
                  <SelectItem key={person?.id} value={person?.jobId}>
                    {person?.name} (Job ID: {person.jobId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit} className="w-full">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
            <CardDescription>Completed and Incomplete Tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <ScrollArea className="h-[calc(100vh-30rem)] pr-4">
                <TaskList
                  tasks={tasksData?.completedTasks}
                  title="Completed Tasks"
                />
              </ScrollArea>
              <ScrollArea className="h-[calc(100vh-30rem)] pr-4">
                <TaskList
                  tasks={tasksData?.incompleteTasks || []}
                  title="Incomplete Tasks"
                />
              </ScrollArea>
              <div
                className="flex flex-row w-full h-fit items-center space-x-3 cursor-pointer"
                onClick={handleDownloadClick}
              >
                <div className="font-bold w-fit flex justify-start">
                  Click here to download document
                </div>
                <FaDownload className="text-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
