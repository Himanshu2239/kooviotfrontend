
"use client"

import InputField from "@/components/Mes/components/input-field";
import AddItemsButton from "@/components/Mes/components/add-items";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductionForm from "@/components/Mes/Production/ProductionForm";
import RejectionForm from "@/components/Mes/Production/RejectionForm";
import WorkLogForm from "@/components/Mes/Production/WorkLogForm";
import { categories } from "@/app/constant";
import { ArrowLeft, Loader2 } from "lucide-react";
import LogoutButton from "@/components/Mes/logout/logoutButton";
import { useRouter } from "next/navigation";

export default function ProductionPage() {
  const [date, setDate] = useState();
  const [batchId, setBatchId] = useState("");
  const [shift, setShift] = useState("");
  const [line, setLine] = useState("")

  const [materialCode, setMaterialCode] = useState("");
  const [pieces, setPieces] = useState("");
  const [totalPieces, setTotalPieces] = useState("");

  // const [rejMaterialCode, setRejMaterialCode] = useState("");
  // const [rejPieces, setRejPieces] = useState("");
  const [rejTotalPieces, setRejTotalPieces] = useState("");
  const [lineRejInKg, setLineRejInKg] = useState("");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [totalDuration, setTotalDuration] = useState("0h 0m");
  const [addWorkLog, setAddWorkLog] = useState(false);


  const [productionItems, setProductionItems] = useState([]);
  // const [rejectionItems, setRejectionItems] = useState([]);
  const [workLogItems, setWorkLogItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productionInKg, setProductionInKg] = useState("");
  const [totalProductionInKg, setTotalProductionInKg] = useState("");


  // const [errors, setErrors] = useState({});

  const getNormalizedDate = () => {
    const dateObj = new Date(date); // ✅ convert string to Date object safely
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    return { year, month, day };
  };

  const handleSubmit = async () => {
    if (!date || !shift || !line || !rejTotalPieces || !productionItems.length || !workLogItems.length || !lineRejInKg) {
      // alert("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    const { year, month, day } = getNormalizedDate();
    const accessToken = localStorage.getItem("accessToken");
    const payload = {
      year,
      month,
      day,
      // date,
      mtdType: "production",
      // batchId,
      shift,
      line,
      productionItems,
      totalPieces: parseInt(totalPieces || "0"),
      totalProductionInKg,
      // rejectionItems,
      lineRejection: parseInt(rejTotalPieces || "0"),
      lineRejectionInkg: parseFloat(lineRejInKg || "0"),
      workLogItems,
      totalDuration
    };

    setIsLoading(true);

    // console.log("payload", payload);

    try {
      const res = await fetch("https://kooviot.vercel.app/production/productionMesData/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      // console.log("result", result)

      if (result.status == 200) {
        // alert("Data saved successfully!");
        toast.success("Data saved successfully!");

        // ✅ Reset all form data
        setDate("");
        setBatchId("");
        setShift("");
        setLine("");
        setProductionItems([]);
        setTotalPieces("");
        setTotalProductionInKg("");
        setLineRejInKg("")        // setRejectionItems([]);
        setRejTotalPieces("");
        setWorkLogItems([]);
        setTotalDuration("");

      }
      else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error);
      // alert("Something went wrong!");
      toast.error("Something went wrong!");
    }
    finally {
      setIsLoading(false);
    }
  };


  const getDuration = (start, end) => {
    try {
      const baseDate = "1970-01-01";
      const startTime = new Date(`${baseDate}T${start}:00`);
      const endTime = new Date(`${baseDate}T${end}:00`);

      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }
      return (endTime - startTime) / 60000; // return duration in minutes
    } catch {
      return 0;
    }
  };

  const formatMinutes = (totalMinutes) => {
    // console.log("totalMinutes", totalMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    // console.log("hour and minutes", hours, minutes);

    return `${hours}h ${minutes}m`;
  };


  useEffect(() => {
    const updatedItems = workLogItems.map((item) => {
      const rawDuration = getDuration(item.start, item.end);
      return {
        ...item,
        duration: formatMinutes(rawDuration), // store as "hh:mm"
      };
    });

    // const totalMinutes = updatedItems.reduce((sum, item) => sum + item.duration, 0);

    const totalMinutes = updatedItems.reduce((sum, item) => {
      const durationMinutes = getDuration(item.start, item.end); // we use getDuration again here for total
      return sum + durationMinutes;
    }, 0);

    // console.log("duration", updatedItems);
    // console.log("totalMinutes", totalMinutes);

    setWorkLogItems(updatedItems);
    setTotalDuration(formatMinutes(totalMinutes));

  }, [addWorkLog]);

  const router = useRouter();


  // Generate batch ID when date or shift changes

  // useEffect(() => {
  //   if (!date || !shift) return;

  //   const dateObj = new Date(date);
  //   const year = dateObj.getFullYear().toString().slice(-2);
  //   const monthIndex = dateObj.getMonth(); // 0-based
  //   const day = dateObj.getDate().toString().padStart(2, '0');

  //   const monthLetter = String.fromCharCode(97 + monthIndex); // a-l
  //   const shiftLetter = shift === "Day" ? "d" : "n";
  //   setBatchId(`${year}${monthLetter}${day}${shiftLetter}`);
  // }, [date, shift]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <button
        onClick={() => router.push('/production')}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-800 hover:bg-blue-900 text-white mt-4 ml-2 font-semibold rounded-lg transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous Form
      </button>

      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>
      <div className="p-10 h-screen  mx-auto bg-gradient-to-b from-white to-green-50">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">Production</h1>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mb-4">
          <InputField label="Date:" type="date" value={date} onChange={setDate} />
          {/* <InputField label="Batch ID:" value={batchId} onChange={setBatchId} readOnly={true}/> */}
          {/* <InputField label="Shift:" value={shift} onChange={setShift} /> */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Shift:</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full border border-gray-300 bg-gray-200 h-9 rounded px-3 py-2"
            >
              <option value="">Select Shift</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
            </select>
          </div>

          {/* Line Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Line:</label>
            <select
              value={line}
              onChange={(e) => setLine(e.target.value)}
              className="w-full border border-gray-300 bg-gray-200 h-9 rounded px-3 py-2"
            >
              <option value="">Select Line</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={`${i + 1}`}>{`${i + 1}`}</option>
              ))}
            </select>
          </div>
          {/*production total Rejection */}
          <InputField label="Line Rejection(Pcs):" type="Number" value={rejTotalPieces} onChange={setRejTotalPieces} />
          <InputField label="Line Rejection(Kg):" type="Number" value={lineRejInKg} onChange={setLineRejInKg} />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {/* Production & Rejection Section */}
          <div className="border-r pr-6">

            <ProductionForm
              batchId={batchId}
              setBatchId={setBatchId}
              materialCode={materialCode}
              line={line}
              setLine={setLine}
              setMaterialCode={setMaterialCode}
              pieces={pieces}
              setPieces={setPieces}
              productionInKg={productionInKg}
              setProductionInKg={setProductionInKg}
              totalPieces={totalPieces}
              setTotalPieces={setTotalPieces}
              totalProductionInKg={totalProductionInKg}
              setTotalProductionInKg={setTotalProductionInKg}
              productionItems={productionItems}
              setProductionItems={setProductionItems}
            />


            {/* <RejectionForm
              rejMaterialCode={rejMaterialCode}
              setRejMaterialCode={setRejMaterialCode}
              rejPieces={rejPieces}
              setRejPieces={setRejPieces}
              rejTotalPieces={rejTotalPieces}
              setRejTotalPieces={setRejTotalPieces}
              rejectionItems={rejectionItems}
              setRejectionItems={setRejectionItems}
            /> */}


          </div>


          <WorkLogForm
            start={start}
            end={end}
            description={description}
            setStart={setStart}
            setEnd={setEnd}
            setDescription={setDescription}
            addWorkLog={addWorkLog}
            setAddWorkLog={setAddWorkLog}
            workLogItems={workLogItems}
            setWorkLogItems={setWorkLogItems}
            totalDuration={totalDuration}
          />

        </div>
        <div className="flex w-full items-center justify-center">
          {/* <button
            onClick={handleSubmit}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button> */}
          <div className="text-right mt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
