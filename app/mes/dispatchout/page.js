
"use client"

import { useState } from "react"
import InputField from "@/components/Mes/components/input-field"
import AddItemsButton from "@/components/Mes/components/add-items"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Loader2, SendToBack, Trash2 } from "lucide-react"
import { getNormalizedDate, gradeOptions, isValidBatchId, materialCodeOptions } from "@/app/constant"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from "@/components/Mes/logout/logoutButton"



// const materialOptions = ["Select", "MAT001", "MAT002", "MAT003"]
// const gradeOptions = ["Select", "A", "B", "Non Moving"]

export default function DispatchPage() {
  const [date, setDate] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")
  const [batchId, setBatchId] = useState("")
  const [materialCode, setMaterialCode] = useState("Select")
  const [grade, setGrade] = useState("Select")
  const [packagingType, setPackagingType] = useState("Select")
  // const [itemCode, setItemCode] = useState("")
  // const [lotNo, setLotNo] = useState("")
  const [pieces, setPieces] = useState("")
  const [customer, setCustomer] = useState("")
  const [items, setItems] = useState([])
  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);


  const resetFields = () => {
    setBatchId("")
    setMaterialCode("Select")
    setGrade("Select")
    setPackagingType("Select")
    // setItemCode("")
    // setLotNo("")
    setPieces("")
    setCustomer("")
    setErrors({})
  }

  const validateFields = () => {
    const newErrors = {}
    // if (!date) newErrors.date = "Date is required"
    // if (!invoiceNo) newErrors.invoiceNo = "Invoice No is required"
    if (!batchId) newErrors.batchId = "BatchId is required"
    // if (!isValidBatchId(batchId) && batchId) newErrors.batchId = "Invalid BatchId"
    if (materialCode === "Select") newErrors.materialCode = "Select a material code"
    if (grade === "Select") newErrors.grade = "Select a grade"
    if (packagingType === "Select") newErrors.packagingType = "Select a packaging type"
    // if (!itemCode) newErrors.itemCode = "Item code is required"
    // if (!lotNo) newErrors.lotNo = "Lot No is required"
    if (!pieces) newErrors.pieces = "Number of pieces is required"
    if (!customer) newErrors.customer = "Customer is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddItem = () => {
    if (!validateFields()) return

    const newItem = {
      id: Date.now(),
      batchId,
      materialCode,
      grade,
      packagingType,
      // itemCode,
      // lotNo,
      pieces: parseInt(pieces),
      customer,
    }

    setItems([...items, newItem])
    resetFields()
  }

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken")

    if (!date || !invoiceNo || items.length === 0) {
      toast.error("Please fill Date, Invoice No, and add at least one item.")
      return
    }

    setIsloading(true);
    // const newErrors = {};
    // if (!date){
    //   newErrors.date = "Date is required";
    //   console.log("data", newErrors);
    //   setErrors(newErrors)
    //   return;
    //   // return;/
    // }
    // if (!invoiceNo){
    //   newErrors.invoiceNo = "Invoice No is required";
    //   // console.log("invoice Error", newErrors);
    //   setErrors(newErrors);
    //   //  return Object.keys(newErrors).length === 0
    //   return;
    // }


    const { year, month, day } = getNormalizedDate(date);
    try {
      const response = await axios.post('https://kooviot.vercel.app/production/dispachOutMes/update', { year, month, day, items, totalPieces, mtdType: "totaldispatch", invoiceNo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // console.log("response", response)
      // await fetch("/api/dispatch", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ date, invoiceNo, items }),
      // })

      if (response.status === 200) {
        // alert("Dispatch submitted successfully!")
        toast.success("Dispatch submitted successfully!")
        setItems([])
        setDate("")
        setInvoiceNo("")
      } else {
        toast.error("Failed to submit.")
      }
    } catch (err) {
      console.error(err.response.data.error)
      toast.error(err.response.data.error)
    }
    finally {
      setIsloading(false);
    }
  }

  const totalPieces = items.reduce((sum, item) => sum + item.pieces, 0)

  // console.log(items)

  // const handleSubmit = async() => {

  // }

  return (
    <div className="p-10 m-16 rounded-lg bg-gradient-to-b from-white to-indigo-100">
      <ToastContainer hideProgressBar />
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton/>
      </div>
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Dispatch Out</h1>

      <div className="flex justify-between mb-6">
        <InputField label="Date:" type="date" value={date} onChange={setDate} error={errors.date} />
        <InputField label="Invoice No:" value={invoiceNo} onChange={setInvoiceNo} error={errors.invoiceNo} />
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <InputField label="Batch ID:" value={batchId} onChange={setBatchId} error={errors.batchId} />
        <div>
          <label className="block mb-1 font-medium">Material Code</label>
          <select className="h-9 bg-gray-200 rounded px-2 w-full" value={materialCode} onChange={(e) => setMaterialCode(e.target.value)}>
            <option value="">Select</option>
            {materialCodeOptions.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
          {errors.materialCode && <p className="text-red-500 text-sm">{errors.materialCode}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Grade</label>
          <select className="h-9 bg-gray-200 rounded px-2 w-full" value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="" >Select</option>
            {gradeOptions.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
          {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block mb-1 font-medium">Packaging Type</label>
          <select className="h-9 bg-gray-200 rounded px-2 w-full" value={packagingType} onChange={(e) => setPackagingType(e.target.value)}>
            <option>Select</option>
            <option>Box Packing</option>
            <option>Poly Packing</option>
          </select>
          {errors.packagingType && <p className="text-red-500 text-sm">{errors.packagingType}</p>}
        </div>
        <InputField label="Number of Pieces" type="number" value={pieces} onChange={setPieces} error={errors.pieces} />
        <InputField label="Customer" value={customer} onChange={setCustomer} error={errors.customer} />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* <InputField label="Item Code" value={itemCode} onChange={setItemCode} error={errors.itemCode} /> */}
        {/* <InputField label="Lot No." value={lotNo} onChange={setLotNo} error={errors.lotNo} /> */}
      </div>

      <div className="flex justify-center mb-6">
        <AddItemsButton onClick={handleAddItem} color="purple" />
      </div>

      {items.length > 0 && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-lg font-semibold mb-2">Dispatched Items:</h2>
          <div className="bg-white bg-opacity-80 overflow-auto rounded-lg p-4 shadow">
            <table className="w-full table-auto overflow-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Batch ID</th>
                  <th className="text-left py-2">Material</th>
                  <th className="text-left py-2">Grade</th>
                  <th className="text-left py-2">Packing</th>
                  <th className="text-left py-2">Pieces</th>
                  {/* <th className="text-left py-2">Lot No</th> */}
                  <th className="text-left py-2">Customer</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-indigo-50 transition">
                    <td className="py-2">{item.batchId}</td>
                    <td className="py-2">{item.materialCode}</td>
                    <td className="py-2">{item.grade}</td>
                    <td className="py-2">{item.packagingType}</td>
                    <td className="py-2">{item.pieces}</td>
                    {/* <td className="py-2">{item.lotNo}</td> */}
                    <td className="py-2">{item.customer}</td>
                    <td className="py-2">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}> <Trash2 size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-2 font-semibold text-blue-700">
              Total Pieces: {totalPieces}
            </div>
          </div>
        </motion.div>
      )}

      {items.length > 0 &&
        //  <div className="flex justify-end mt-6">
        //   <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={handleSubmit}>
        //     Submit Dispatch
        //   </Button>
        // </div>

        <div className="text-right mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            {isLoading ? 'Submitting...' : 'Submit Dispatch'}
          </button>
        </div>
      }
    </div>
  )
}
