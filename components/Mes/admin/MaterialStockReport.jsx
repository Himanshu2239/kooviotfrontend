// // components/MaterialStockTable.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Skeleton } from "@/components/ui/skeleton";



// const headings = [
//   { label: "FG Bulk", key: "piecesFgBulk" },
//   { label: "FG Box", key: "piecesFgBox" },
//   { label: "Wip A", key: "piecesWipA" },
//   { label: "Wip B", key: "piecesWipB" },
//   { label: "FG Rejection", key: "piecesFgRejection" },
//   { label: "Wip Rejection", key: "piecesWipRejection" },
//   { label: "Production", key: "piecesProduction" },
//   { label: "Dispatch", key: "piecesDispatch" },
// ];

// const data = [
//   {
//     materialCode: "M001",
//     piecesFgBulk: 100,
//     piecesFgBox: 80,
//     piecesWipA: 40,
//     piecesWipB: 25,
//     piecesFgRejection: 5,
//     piecesWipRejection: 2,
//     piecesProduction: 120,
//     piecesDispatch: 90,
//   },
//   {
//     materialCode: "M002",
//     piecesFgBulk: 200,
//     piecesFgBox: 150,
//     piecesWipA: 60,
//     piecesWipB: 30,
//     piecesFgRejection: 10,
//     piecesWipRejection: 5,
//     piecesProduction: 250,
//     piecesDispatch: 210,
//   },
// ];

// export default function MaterialStockReport() {
//   const [selectedMaterial, setSelectedMaterial] = useState(null);

//   useEffect(() => {
//     if (data.length > 0) {
//       setSelectedMaterial(data[0]);
//     }
//   }, [data]);

//   if (!selectedMaterial) return <Skeleton className="h-40 w-full" />;

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-md rounded-xl">
//       <CardContent className="p-6">
//         <div className='flex flex-row justify-between'>
//           <h2 className='font-bold'>Material Code Report</h2>
//           <div className="mb-2 min-w-36">
//             {/* <label className="block mb-2 text-sm font-medium text-gray-700">Select Material Code</label> */}
//             <Select
//               value={selectedMaterial.materialCode}
//               onValueChange={(value) => {
//                 const found = data.find((m) => m.materialCode === value);
//                 if (found) setSelectedMaterial(found);
//               }}
//             >
//               <SelectTrigger className="w-full bg-gray-100">
//                 <SelectValue placeholder="Select Material" />
//               </SelectTrigger>
//               <SelectContent>
//                 {data.map((item) => (
//                   <SelectItem key={item.materialCode} value={item.materialCode}>
//                     {item.materialCode}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//         </div>
//         <table className="w-full table-auto text-sm border border-gray-300 rounded-md overflow-hidden">
//           <tbody>
//             {headings.map((row) => (
//               <tr key={row.key} className="border-b last:border-none">
//                 <td className="px-4 py-2 font-bold">{row.label}</td>
//                 <td className="px-4 py-2 text-right font-semibold">{selectedMaterial[row.key]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </CardContent>
//     </Card>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Package, Box, Layers, Archive, Ban, Trash2, Factory, Truck } from 'lucide-react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Skeleton } from "@/components/ui/skeleton";

// const headings = [
//   { label: "FG Bulk", key: "piecesFgBulk", icon: Package },
//   { label: "FG Box", key: "piecesFgBox", icon: Box },
//   { label: "Wip A", key: "piecesWipA", icon: Layers },
//   { label: "Wip B", key: "piecesWipB", icon: Archive },
//   { label: "FG Rejection", key: "piecesFgRejection", icon: Ban },
//   { label: "Wip Rejection", key: "piecesWipRejection", icon: Trash2 },
//   { label: "Production", key: "piecesProduction", icon: Factory },
//   { label: "Dispatch", key: "piecesDispatch", icon: Truck },
// ];

// const data = [
//   {
//     materialCode: "M001",
//     piecesFgBulk: 100,
//     piecesFgBox: 80,
//     piecesWipA: 40,
//     piecesWipB: 25,
//     piecesFgRejection: 5,
//     piecesWipRejection: 2,
//     piecesProduction: 120,
//     piecesDispatch: 90,
//   },
//   {
//     materialCode: "M002",
//     piecesFgBulk: 200,
//     piecesFgBox: 150,
//     piecesWipA: 60,
//     piecesWipB: 30,
//     piecesFgRejection: 10,
//     piecesWipRejection: 5,
//     piecesProduction: 250,
//     piecesDispatch: 210,
//   },
// ];

// export default function MaterialStockReport() {
//   const [selectedMaterial, setSelectedMaterial] = useState(null);

//   useEffect(() => {
//     if (data.length > 0) {
//       setSelectedMaterial(data[0]);
//     }
//   }, [data]);

//   if (!selectedMaterial) return <Skeleton className="h-40 w-full" />;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Card className="w-full max-w-2xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-700 shadow-lg">
//         <CardContent className="p-6">
//           <div className='flex flex-row justify-between items-center mb-4'>
//             <h2 className='text-xl font-extrabold text-white tracking-tight'>
//               📦 Material Code Report
//             </h2>
//             <div className="min-w-36">
//               <Select
//                 value={selectedMaterial.materialCode}
//                 onValueChange={(value) => {
//                   const found = data.find((m) => m.materialCode === value);
//                   if (found) setSelectedMaterial(found);
//                 }}
//               >
//                 <SelectTrigger className="w-full border text-white hover:bg-zinc-700 transition">
//                   <SelectValue placeholder="Select Material" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
//                   {data.map((item) => (
//                     <SelectItem
//                       key={item.materialCode}
//                       value={item.materialCode}
//                       className="hover:bg-zinc-700"
//                     >
//                       {item.materialCode}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <motion.table
//             className="w-full text-sm border border-zinc-700 rounded-md overflow-hidden"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0, y: 10 },
//               visible: {
//                 opacity: 1,
//                 y: 0,
//                 transition: { staggerChildren: 0.05 }
//               }
//             }}
//           >
//             <tbody>
//               {headings.map(({ key, label, icon: Icon }) => (
//                 <motion.tr
//                   key={key}
//                   className="border-b  last:border-none hover:bg-zinc-800 transition"
//                   variants={{
//                     hidden: { opacity: 0, x: -10 },
//                     visible: { opacity: 1, x: 0 }
//                   }}
//                 >
//                   <td className="px-4 py-2 text-gray-300 font-medium flex items-center gap-2">
//                     <Icon className="w-4 h-4 text-blue-400" />
//                     {label}
//                   </td>
//                   <td className="px-4 py-2 text-right text-blue-400 font-bold">
//                     {selectedMaterial[key]}
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </motion.table>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Box, Layers, Archive, Ban, Trash2, Factory, Truck
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { materialCodeOptions } from '@/app/constant';

const headings = [
  { label: "FG Bulk", key: "piecesFgBulk", icon: Package },
  { label: "FG Box", key: "piecesFgBox", icon: Box },
  { label: "Wip A", key: "piecesWipA", icon: Layers },
  { label: "Wip B", key: "piecesWipB", icon: Archive },
  { label: "FG Rejection", key: "piecesFgRejection", icon: Ban },
  { label: "Wip Rejection", key: "piecesWipRejection", icon: Trash2 },
  { label: "Production", key: "piecesProduction", icon: Factory },
  { label: "Dispatch", key: "piecesDispatch", icon: Truck },
];

const data = [
  {
    materialCode: "M001",
    piecesFgBulk: 100,
    piecesFgBox: 80,
    piecesWipA: 40,
    piecesWipB: 25,
    piecesFgRejection: 5,
    piecesWipRejection: 2,
    piecesProduction: 120,
    piecesDispatch: 90,
  },
  {
    materialCode: "M002",
    piecesFgBulk: 200,
    piecesFgBox: 150,
    piecesWipA: 60,
    piecesWipB: 30,
    piecesFgRejection: 10,
    piecesWipRejection: 5,
    piecesProduction: 250,
    piecesDispatch: 210,
  },
];

export default function MaterialStockReport() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedMaterialCode, setSelectedMaterialCode] = useState("GLOVES3AFTBL01");
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://kooviot.vercel.app/admin/fetchBatchStockData');
        const json = await res.json();
        const allMaterials = json.data.flatMap((batch) => batch.materials);
        console.log("allMaterial", allMaterials)
        setData(allMaterials);
      } catch (err) {
        console.error("Failed to fetch stock data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const existMaterialCode = data.some((val) => val.materialCode === selectedMaterialCode)
    if (existMaterialCode) {
      const materialArr = data.filter((item) => item.materialCode === selectedMaterialCode);
      console.log("materialArr", materialArr);
      const result = materialArr.reduce((acc, item) => {
        Object.keys(item).forEach(key => {
          if (key === 'materialCode') {
            acc.materialCode = item.materialCode;
          } else {
            acc[key] = (acc[key] || 0) + item[key];
          }
        });
        return acc;
      }, {});

      // console.log("result", result);
      
      // materialArr.reduce((item, sum) => {

      // })
      setSelectedMaterial(result || null);
    }
    else {
      const defaultData = {
        materialCode: selectedMaterialCode,
        piecesFgBulk: 0,
        piecesFgBox: 0,
        piecesWipA: 0,
        piecesWipB: 0,
        piecesFgRejection: 0,
        piecesWipRejection: 0,
        piecesProduction: 0,
        piecesDispatch: 0,
      }
      console.log("defaultData", defaultData);
      setSelectedMaterial(defaultData)
    }
  }, [data, selectedMaterialCode]);


  if (!selectedMaterial) return <Skeleton className="h-40 w-full" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-2xl mx-auto rounded-2xl border border-zinc-300 shadow-md">
        <CardContent className="p-6">
          <div className='flex flex-row justify-between items-center mb-4'>
            <h2 className='text-xl font-extrabold tracking-tight text-gray-800 dark:text-white'>
              📦 Material Code Report
            </h2>
            <div className="min-w-36">
              <Select
                value={selectedMaterialCode}
                onValueChange={(value) => {
                  const found = materialCodeOptions.find((m) => m === value);
                  if (found) setSelectedMaterialCode(found);
                }}
              >
                <SelectTrigger className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-gray-800 dark:text-white">
                  <SelectValue placeholder="Select Material" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-gray-800 dark:text-white">
                  {materialCodeOptions.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.table
            className="w-full text-sm border border-zinc-300 dark:border-zinc-700 rounded-md overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            <tbody>
              {headings.map(({ key, label, icon: Icon }) => (
                <motion.tr
                  key={key}
                  className="border-b border-zinc-200 dark:border-zinc-700 last:border-none hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <td
                    className="px-4 py-2 font-medium text-gray-800 dark:text-gray-300 flex items-center gap-2"
                    title={label}
                  >
                    <Icon className="w-4 h-4 text-blue-500" />
                    {label}
                  </td>
                  <td
                    className="px-4 py-2 text-right font-bold text-blue-700 dark:text-blue-400"
                    title={`Value for ${label}`}
                  >
                    {selectedMaterial[key]}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

