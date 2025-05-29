
// import InputField from "@/components/input-field";
// import AddItemsButton from "@/components/add-items-button";

// export default function PackagingPage() {
//   const [date, setDate] = useState("");
//   const [shift, setShift] = useState("Day");
//   const [batchId, setBatchId] = useState("");

//   const [materialCode, setMaterialCode] = useState("");
//   const [grade, setGrade] = useState("");
//   const [millType, setMillType] = useState("");
//   const [pieces, setPieces] = useState("");
//   const [lotNo, setLotNo] = useState("");
//   const [packagingType, setPackagingType] = useState("");
//   const [totalPieces, setTotalPieces] = useState("");

//   const [rejMaterialCode, setRejMaterialCode] = useState("");
//   const [rejGrade, setRejGrade] = useState("");
//   const [rejMillType, setRejMillType] = useState("");
//   const [rejPieces, setRejPieces] = useState("");
//   const [rejLotNo, setRejLotNo] = useState("");
//   const [rejPackagingType, setRejPackagingType] = useState("");
//   const [reason, setReason] = useState("");
//   const [rejTotalPieces, setRejTotalPieces] = useState("");

//   const [items, setItems] = useState([]);
//   const [rejectionItems, setRejectionItems] = useState([]);

//   const handleAddItem = () => {
//     if (
//       materialCode 
//     //   &&
//     //   grade &&
//     //   millType &&
//     //   pieces &&
//     //   lotNo &&
//     //   packagingType &&
//     //   totalPieces
//     ) {
//       const newItem = {
//         id: Date.now(),
//         materialCode,
//         grade,
//         millType,
//         pieces,
//         lotNo,
//         packagingType,
//         totalPieces,
//       };
//       setItems([...items, newItem]);

//       setMaterialCode("");
//       setGrade("");
//       setMillType("");
//       setPieces("");
//       setLotNo("");
//       setPackagingType("");
//       setTotalPieces("");
//     } else {
//       alert("Please fill all required fields");
//     }
//   };

//   const handleAddRejectionItem = () => {
//     if (
//       rejMaterialCode
//      //  &&
//     //   rejGrade &&
//     //   rejMillType &&
//     //   rejPieces &&
//     //   rejLotNo &&
//     //   rejPackagingType &&
//     //   reason &&
//     //   rejTotalPieces
//     ) {
//       const newItem = {
//         id: Date.now(),
//         materialCode: rejMaterialCode,
//         grade: rejGrade,
//         millType: rejMillType,
//         pieces: rejPieces,
//         lotNo: rejLotNo,
//         packagingType: rejPackagingType,
//         reason,
//         totalPieces: rejTotalPieces,
//       };
//       setRejectionItems([...rejectionItems, newItem]);

//       setRejMaterialCode("");
//       setRejGrade("");
//       setRejMillType("");
//       setRejPieces("");
//       setRejLotNo("");
//       setRejPackagingType("");
//       setReason("");
//       setRejTotalPieces("");
//     } else {
//       alert("Please fill all required fields in the rejection form");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 bg-gradient-to-b from-white to-green-50 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center text-green-700 mb-10 tracking-wide">Packaging Entry</h1>

//       <section className="mb-8 space-y-4">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <InputField label="Date:" type="date" value={date} onChange={setDate} />
//           <InputField label="Shift:" value={shift} onChange={setShift} />
//           <InputField label="Batch ID:" value={batchId} onChange={setBatchId} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//           <InputField label="Material Code:" value={materialCode} onChange={setMaterialCode} />
//           <InputField label="Grade:" value={grade} onChange={setGrade} />
//           <InputField label="Mill Type - Subtype:" value={millType} onChange={setMillType} />
//           <InputField label="No. of Pieces:" value={pieces} onChange={setPieces} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <InputField label="Lot No.:" value={lotNo} onChange={setLotNo} />
//           <InputField label="Packaging Type:" value={packagingType} onChange={setPackagingType} />
//           <InputField label="Total Pieces:" value={totalPieces} onChange={setTotalPieces} />
//         </div>

//         <div className="flex justify-center">
//           <AddItemsButton color="green" onClick={handleAddItem} />
//         </div>
//       </section>

//       {items.length > 0 && (
//         <section className="mb-10">
//           <h2 className="text-xl font-semibold text-green-800 mb-3">Added Packaging Items</h2>
//           <div className="overflow-auto bg-white shadow-md rounded-lg">
//             <table className="w-full text-sm">
//               <thead className="bg-green-100 text-green-800">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Material Code</th>
//                   <th className="px-4 py-2 text-left">Grade</th>
//                   <th className="px-4 py-2 text-left">Mill Type</th>
//                   <th className="px-4 py-2 text-left">Pieces</th>
//                   <th className="px-4 py-2 text-left">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map(item => (
//                   <tr key={item.id} className="border-b">
//                     <td className="px-4 py-2">{item.materialCode}</td>
//                     <td className="px-4 py-2">{item.grade}</td>
//                     <td className="px-4 py-2">{item.millType}</td>
//                     <td className="px-4 py-2">{item.pieces}</td>
//                     <td className="px-4 py-2">{item.totalPieces}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       )}

//       <section>
//         <h2 className="text-2xl font-bold text-purple-800 mb-6">Rejection Entry</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
//           <InputField label="Material Code:" value={rejMaterialCode} onChange={setRejMaterialCode} />
//           <InputField label="Grade:" value={rejGrade} onChange={setRejGrade} />
//           <InputField label="Mill Type - Subtype:" value={rejMillType} onChange={setRejMillType} />
//           <InputField label="No. of Pieces:" value={rejPieces} onChange={setRejPieces} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
//           <InputField label="Lot No.:" value={rejLotNo} onChange={setRejLotNo} />
//           <InputField label="Packaging Type:" value={rejPackagingType} onChange={setRejPackagingType} />
//           <InputField label="Reason:" value={reason} onChange={setReason} />
//           <InputField label="Total Pieces:" value={rejTotalPieces} onChange={setRejTotalPieces} />
//         </div>

//         <div className="flex justify-center mb-6">
//           <AddItemsButton color="purple" onClick={handleAddRejectionItem} />
//         </div>
//       </section>

//       {rejectionItems.length > 0 && (
//         <section>
//           <h2 className="text-xl font-semibold text-purple-700 mb-3">Rejection Items</h2>
//           <div className="overflow-auto bg-purple-50 shadow-md rounded-lg">
//             <table className="w-full text-sm">
//               <thead className="bg-purple-100 text-purple-800">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Material Code</th>
//                   <th className="px-4 py-2 text-left">Reason</th>
//                   <th className="px-4 py-2 text-left">Pieces</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rejectionItems.map(item => (
//                   <tr key={item.id} className="border-b">
//                     <td className="px-4 py-2">{item.materialCode}</td>
//                     <td className="px-4 py-2">{item.reason}</td>
//                     <td className="px-4 py-2">{item.pieces}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

// app/packaging/page.tsx or similar

// "use client"

// import { useState } from "react"
// import InputField from "@/components/input-field"
// import AddItemsButton from "@/components/add-items-button"

// function PackagingForm({ items, setItems }) {
//   const [form, setForm] = useState({
//     materialCode: "",
//     grade: "",
//     pieces: "",
//     lotNo: "",
//     packagingType: "",
//     totalPieces: ""
//   })
//   const [errors, setErrors] = useState({})

//   const handleChange = (key, value) => {
//     setForm({ ...form, [key]: value })
//     setErrors({ ...errors, [key]: "" })
//   }

//   const validate = () => {
//     const newErrors = {}
//     Object.entries(form).forEach(([key, val]) => {
//       if (!val.trim()) newErrors[key] = `Please enter ${key}`
//     })
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleAdd = () => {
//     if (!validate()) return
//     setItems([...items, { id: Date.now(), ...form }])
//     setForm({
//       materialCode: "",
//       grade: "",
//       pieces: "",
//       lotNo: "",
//       packagingType: "",
//       totalPieces: ""
//     })
//   }

//   const handleDelete = (id) => {
//     setItems(items.filter(item => item.id !== id))
//   }

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-bold mb-4 text-green-700">Packaging Entry</h2>
//       <div className="grid grid-cols-3 gap-4 mb-4">
//         {["materialCode", "grade", "pieces", "lotNo", "packagingType", "totalPieces"].map((field) => (
//           <div key={field}>
//             <InputField
//               label={field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
//               value={form[field]}
//               onChange={(val) => handleChange(field, val)}
//             />
//             {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mb-4">
//         <AddItemsButton color="green" onClick={handleAdd} />
//       </div>
//       {items.length > 0 && (
//         <>
//           <div className="bg-white rounded-lg p-4 shadow-md">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-2">Material Code</th>
//                   <th className="text-left py-2">Grade</th>
//                   <th className="text-left py-2">Pieces</th>
//                   <th className="text-left py-2">Total</th>
//                   <th className="text-left py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map(item => (
//                   <tr key={item.id} className="border-b">
//                     <td className="py-2">{item.materialCode}</td>
//                     <td className="py-2">{item.grade}</td>
//                     <td className="py-2">{item.pieces}</td>
//                     <td className="py-2">{item.totalPieces}</td>
//                     <td className="py-2">
//                       <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-end mt-4">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// function RejectionForm({ rejectionItems, setRejectionItems }) {
//   const [form, setForm] = useState({
//     materialCode: "",
//     pieces: "",
//     reason: ""
//   })
//   const [errors, setErrors] = useState({})

//   const handleChange = (key, value) => {
//     setForm({ ...form, [key]: value })
//     setErrors({ ...errors, [key]: "" })
//   }

//   const validate = () => {
//     const newErrors = {}
//     Object.entries(form).forEach(([key, val]) => {
//       if (!val.trim()) newErrors[key] = `Please enter ${key}`
//     })
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleAdd = () => {
//     if (!validate()) return
//     setRejectionItems([...rejectionItems, { id: Date.now(), ...form }])
//     setForm({ materialCode: "", pieces: "", reason: "" })
//   }

//   const handleDelete = (id) => {
//     setRejectionItems(rejectionItems.filter(item => item.id !== id))
//   }

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-bold mb-4 text-purple-700">Rejection Entry</h2>
//       <div className="grid grid-cols-3 gap-4 mb-4">
//         {["materialCode", "pieces", "reason"].map((field) => (
//           <div key={field}>
//             <InputField
//               label={field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
//               value={form[field]}
//               onChange={(val) => handleChange(field, val)}
//             />
//             {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mb-4">
//         <AddItemsButton color="green" onClick={handleAdd} />
//       </div>
//       {rejectionItems.length > 0 && (
//         <>
//           <div className="bg-purple-50 rounded-lg p-4 shadow-md">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-2">Material Code</th>
//                   <th className="text-left py-2">Reason</th>
//                   <th className="text-left py-2">Pieces</th>
//                   <th className="text-left py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rejectionItems.map(item => (
//                   <tr key={item.id} className="border-b">
//                     <td className="py-2">{item.materialCode}</td>
//                     <td className="py-2">{item.reason}</td>
//                     <td className="py-2">{item.pieces}</td>
//                     <td className="py-2">
//                       <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-end mt-4">
//             <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Submit</button>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// export default function PackagingPage() {
//   const [items, setItems] = useState([])
//   const [rejectionItems, setRejectionItems] = useState([])

//   return (
//     <div className="max-w-5xl mx-auto py-8 px-4 bg-gradient-to-br from-white to-green-100 rounded shadow">
//       <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Packaging & Rejection Form</h1>
//       <PackagingForm items={items} setItems={setItems} />
//       <RejectionForm rejectionItems={rejectionItems} setRejectionItems={setRejectionItems} />
//     </div>
//   )
// }



"use client"

import PackingForm from "@/components/Mes/components/Packing/PackingForm";
import RejectionForm from "@/components/Mes/components/Packing/RejectionFrom";

export default function PackingPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-white to-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-10">Packing Entry</h1>
      <PackingForm/>
      <div className="my-10 border-t border-gray-300" />
      <RejectionForm/>
    </div>
  )
}


