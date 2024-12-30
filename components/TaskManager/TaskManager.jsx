"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  PlusCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Upload,
  Download,
} from "lucide-react";
import axios from "axios";

export default function TaskManager() {
  const [regularTasks, setRegularTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
  const [document, setDocument] = useState(null); // Store selected document
  const [latestDocument, setLatestDocument] = useState(null); // Store the latest uploaded document URL
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user permissions and tasks from the backend
  const fetchTasksAndPermissions = async () => {
    const token = localStorage.getItem("accessToken");
    // console.log("tk", token)
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(
        "http://127.0.0.1:5001/user/canAddTasks",
        config
      );
      // console.log(response.status)
      if (response.status === 200) {
        const { canAssignTasks, tasks, latestDocument } = response.data;
        setIsAddingDisabled(!canAssignTasks);
        setRegularTasks(tasks.regularTasks);
        setCompletedTasks([...tasks.completedTasks, ...tasks.extraAddedTasks]);
        setLatestDocument(latestDocument); // Store the latest document URL
      }
    } catch (error) {
      console.error("Error fetching tasks and permission:", error);
    }
  };

  useEffect(() => {
    fetchTasksAndPermissions();
  }, []);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure at least one field is filled
    if (!newTask.trim() && !document) {
      setErrorMessage("Please provide a task or upload a document.");
      return;
    }

    setErrorMessage(""); // Clear error messages if validation passes

    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();

    // Add task data if provided
    if (newTask.trim()) {
      formData.append(
        "tasks",
        JSON.stringify([{ description: newTask, isExtraTask: false }])
      );
    }

    // Add document if uploaded
    if (document) {
      formData.append("file", document);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/user/assignDailyTask",
        formData,
        config
      );

      if (response.status === 200) {
        // Update tasks if a new task was added
        if (newTask.trim()) {
          const newTaskObj = {
            _id: response.data.tasks[0]._id,
            description: newTask,
            completed: false,
          };
          setRegularTasks((prevTasks) => [...prevTasks, newTaskObj]);
        }

        // Update the latest document
        if (response.data.fileUrl) {
          setLatestDocument(response.data.fileUrl);
        }

        // Reset inputs
        setNewTask("");
        setDocument(null);
        fetchTasksAndPermissions();
      }
    } catch (error) {
      console.error("Error submitting task/document:", error);
    }
  };

  const toggleTaskCompletion = async (taskId, isCompleted) => {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.post(
        "http://127.0.0.1:5001/user/markTaskAsCompleted",
        { taskId },
        config
      );

      // Update local state after successful toggle
      if (isCompleted) {
        setCompletedTasks((prev) => prev.filter((task) => task._id !== taskId));
        const updatedTask = regularTasks.find((task) => task._id === taskId);
        setRegularTasks((prev) => [
          ...prev,
          { ...updatedTask, completed: false },
        ]);
      } else {
        const updatedTask = regularTasks.find((task) => task._id === taskId);
        setRegularTasks((prev) => prev.filter((task) => task._id !== taskId));
        setCompletedTasks((prev) => [
          ...prev,
          { ...updatedTask, completed: true },
        ]);
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const incompleteTasks = regularTasks.filter((task) => !task.completed);
  const completedTaskList = completedTasks; // Already filtered from backend

  return (
    <div className="p-6 bg-background text-foreground rounded-lg shadow-md border">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Task Manager</h1>
        <div className="flex items-center space-x-4">
          <Switch
            checked={isAddingDisabled}
            aria-label="Toggle Adding New Tasks"
            disabled
          />
          <span className="text-sm font-medium">
            {isAddingDisabled ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow"
            disabled={isAddingDisabled}
          />
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              onChange={handleDocumentUpload}
              className="flex-grow"
              accept=".pdf,.doc,.docx,.jpg,.png" // Restrict file types
            />
            {document && (
              <p className="text-sm text-muted-foreground">
                Selected file: {document.name}
              </p>
            )}
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isAddingDisabled}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </form>

      {latestDocument && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Latest Document</h2>
          <div className="flex items-center space-x-4">
            <a
              href={latestDocument}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Latest Document
            </a>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Today&apos;s Tasks</h2>
        {incompleteTasks.length === 0 ? (
          <p className="text-muted-foreground">
            No tasks for today. Add a new task!
          </p>
        ) : (
          <ul className="space-y-2">
            {incompleteTasks.map((task) => (
              <li key={task._id} className="flex items-center space-x-2">
                <Checkbox
                  id={task._id}
                  checked={task.completed}
                  onCheckedChange={() =>
                    toggleTaskCompletion(task._id, task.completed)
                  }
                />
                <label htmlFor={task._id} className="flex-grow">
                  {task.description}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Completed Tasks</h2>
        {completedTaskList.length === 0 ? (
          <p className="text-muted-foreground">
            No completed tasks yet. Keep going!
          </p>
        ) : (
          <ul className="space-y-2">
            {completedTaskList.map((task) => (
              <li key={task._id} className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{task.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
