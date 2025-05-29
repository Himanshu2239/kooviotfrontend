// components/PackingTable.jsx
// 'use client'
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const PackingTable = () => {
//  const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchPackingData = async () => {
//       try {
//         const res = await axios.get("https://kooviot.vercel.app/admin/report/fetchPackingMesData");
//         console.log("res", res);
//         if (res.data.success) {
//           setData(res.data.data);
//         }
//       } catch (error) {
//         console.log("Failed to fetch packing data:", error);
//       }
//     };
//     fetchPackingData();
//   }, []);

//   return (
//     <div className="overflow-x-auto shadow-md rounded-lg border">
//       <table className="min-w-full text-sm text-left text-gray-700">
//         <thead className="bg-gray-100 text-xs uppercase text-gray-600">
//           <tr>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Batch ID</th>
//             <th className="px-4 py-2">Material Code</th>
//             <th className="px-4 py-2">Grade</th>
//             <th className="px-4 py-2">Packing Type</th>
//             <th className="px-4 py-2">Glove Count</th>
//             <th className="px-4 py-2">Pieces</th>
//             <th className="px-4 py-2">Total Packing</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((record) => (
//             record.items.map((item, index) => (
//               <tr key={`${record._id}-${index}`} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
//                 <td className="px-4 py-2">{item.batchId}</td>
//                 <td className="px-4 py-2">{item.materialCode}</td>
//                 <td className="px-4 py-2">{item.grade}</td>
//                 <td className="px-4 py-2">{item.packingType}</td>
//                 <td className="px-4 py-2">{item.gloveCount}</td>
//                 <td className="px-4 py-2">{item.pieces}</td>
//                 <td className="px-4 py-2">{index === 0 ? record.totalPacking : ''}</td>
//               </tr>
//             ))
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PackingTable;


// 'use client';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const PackingTable = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchPackingData = async () => {
//             try {
//                 const res = await axios.get("https://kooviot.vercel.app/admin/report/fetchPackingMesData");
//                 if (res.data.success) {
//                     setData(res.data.data);
//                 }
//             } catch (error) {
//                 console.log("Failed to fetch packing data:", error);
//             }
//         };
//         fetchPackingData();
//     }, []);

//     return (
//         <div className="overflow-x-auto shadow-md m-10 h-[90vh] rounded-lg border">
//             <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
//                 <thead>
//                     <tr className="bg-gray-100 text-xs uppercase text-gray-600">
//                         <th className="px-4 py-2" rowSpan="2">Date</th>
//                         <th className="px-4 py-2 text-center" colSpan="6">Items</th>
//                         <th className="px-4 py-2" rowSpan="2">Total Pieces</th>
//                     </tr>
//                     <tr className="bg-gray-50 text-xs text-gray-600">
//                         <th className="px-4 py-2">Batch ID</th>
//                         <th className="px-4 py-2">Material Code</th>
//                         <th className="px-4 py-2">Grade</th>
//                         <th className="px-4 py-2">Packing Type</th>
//                         <th className="px-4 py-2">Glove Count</th>
//                         <th className="px-4 py-2">Pieces</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((record) =>
//                         record.items.map((item, index) => (
//                             <tr key={`${record._id}-${index}`} className={`${index === record.items.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
//                                 <td className="px-4 py-2">
//                                     {index === 0 ? new Date(record.date).toLocaleDateString() : ''}
//                                 </td>
//                                 <td className="px-4 py-2">{item.batchId}</td>
//                                 <td className="px-4 py-2">{item.materialCode}</td>
//                                 <td className="px-4 py-2">{item.grade}</td>
//                                 <td className="px-4 py-2">{item.packingType}</td>
//                                 <td className="px-4 py-2">{item.gloveCount}</td>
//                                 <td className="px-4 py-2">{item.pieces}</td>
//                                 <td className="px-4 py-2">
//                                     {index === 0 ? record.totalPacking : ''}
//                                 </td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PackingTable;


'use client';
import { materialCodeOptions } from '@/app/constant';
import FilterBar from '@/components/Mes/components/Packing/FilterBar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const PackingTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [enableFilter, setEnableFilter] = useState(false);
    const [materialCode, setMaterialCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPackingData = async () => {
            try {
                const res = await axios.get("https://kooviot.vercel.app/admin/report/fetchPackingMesData");
                if (res.data.success) {
                    setData(res.data.data);
                    setFilteredData(res.data.data);
                }
            } catch (error) {
                console.log("Failed to fetch packing data:", error);
            }
        };
        fetchPackingData();
    }, []);

    useEffect(() => {
        let tempData = [...data];

        if (dateFilter) {
            tempData = tempData.filter(record => new Date(record.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString());
        }

        if (startDate && endDate) {
            tempData = tempData.filter(record => {
                const recordDate = new Date(record.date);
                return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
            });
        }

        if (enableFilter && materialCode) {
            tempData = tempData.filter(record =>
                record.items.some(item => item.materialCode.includes(materialCode))
            );
        }

        setFilteredData(tempData);
        setCurrentPage(1); // reset to first page on filter change
    }, [dateFilter, startDate, endDate, enableFilter, materialCode, data]);

    const exportToExcel = () => {
        const flattenedData = filteredData.flatMap(record =>
            record.items.map(item => ({
                Date: new Date(record.date).toLocaleDateString(),
                BatchID: item.batchId,
                MaterialCode: item.materialCode,
                Grade: item.grade,
                PackingType: item.packingType,
                GloveCount: item.gloveCount,
                Pieces: item.pieces,
                TotalPieces: record.totalPacking
            }))
        );
        const ws = XLSX.utils.json_to_sheet(flattenedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Packing Report");
        XLSX.writeFile(wb, "Packing_Report.xlsx");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        // <div className="m-10">
        //     <h2 className="text-2xl font-bold mb-4">Packing Report</h2>

        //     <FilterBar
        //     dateFilter={dateFilter}
        //     setDateFilter={setDateFilter}
        //     startDate={startDate}
        //     setStartDate={setStartDate}
        //     endDate={endDate}
        //     setEndDate={setEndDate}
        //     enableFilter={enableFilter}
        //     setEnableFilter={setEnableFilter}
        //     materialCode={materialCode}
        //     setMaterialCode={setMaterialCode}
        //     materialOptions={materialCodeOptions}
        //     exportToExcel={exportToExcel}
        //     />

        //     {/* Table */}
        //     <div className="overflow-x-auto shadow-md rounded-lg border h-[70vh]">
        //         <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
        //             <thead className='sticky'>
        //                 <tr className="bg-gray-100 text-xs uppercase text-gray-600">
        //                     <th className="px-4 py-2" rowSpan="2">Date</th>
        //                     <th className="px-4 py-2 text-center" colSpan="6">Items</th>
        //                     <th className="px-4 py-2" rowSpan="2">Total Pieces</th>
        //                 </tr>
        //                 <tr className="bg-gray-100 text-xs text-gray-600">
        //                     <th className="px-4 py-2">Batch ID</th>
        //                     <th className="px-4 py-2">Material Code</th>
        //                     <th className="px-4 py-2">Grade</th>
        //                     <th className="px-4 py-2">Packing Type</th>
        //                     <th className="px-4 py-2">Glove Count</th>
        //                     <th className="px-4 py-2">Pieces</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {currentItems.map((record) =>
        //                     record.items.map((item, index) => (
        //                         <tr key={`${record._id}-${index}`} className={`${index === record.items.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
        //                             <td className="px-4 py-2">
        //                                 {index === 0 ? new Date(record.date).toLocaleDateString() : ''}
        //                             </td>
        //                             <td className="px-4 py-2">{item.batchId}</td>
        //                             <td className="px-4 py-2">{item.materialCode}</td>
        //                             <td className="px-4 py-2">{item.grade}</td>
        //                             <td className="px-4 py-2">{item.packingType}</td>
        //                             <td className="px-4 py-2">{item.gloveCount}</td>
        //                             <td className="px-4 py-2">{item.pieces}</td>
        //                             <td className="px-4 py-2">
        //                                 {index === 0 ? record.totalPacking : ''}
        //                             </td>
        //                         </tr>
        //                     ))
        //                 )}
        //             </tbody>
        //         </table>
        //     </div>

        //     {/* Pagination */}
        //     <div className="flex justify-center items-center gap-4 mt-4">
        //         <button
        //             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        //             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        //             disabled={currentPage === 1}
        //         >
        //             Prev
        //         </button>
        //         <span>Page {currentPage}</span>
        //         <button
        //             onClick={() => setCurrentPage(prev => (indexOfLastItem < filteredData.length ? prev + 1 : prev))}
        //             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        //             disabled={indexOfLastItem >= filteredData.length}
        //         >
        //             Next
        //         </button>
        //     </div>
        // </div>
        <div className="px-4 md:px-10 py-6">
            <h2 className="text-2xl font-bold mb-6">Packing Report</h2>

            {/* Filters */}
            <FilterBar
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                enableFilter={enableFilter}
                setEnableFilter={setEnableFilter}
                materialCode={materialCode}
                setMaterialCode={setMaterialCode}
                materialOptions={materialCodeOptions}
                exportToExcel={exportToExcel}
            />

            {/* Table with Sticky Header */}
            <div className="overflow-x-auto h-[65vh] border shadow-md rounded-lg mt-6">
                <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2" rowSpan="2">Date</th>
                            <th className="px-4 py-2 text-center" colSpan="6">Items</th>
                            <th className="px-4 py-2" rowSpan="2">Total Pieces</th>
                        </tr>
                        <tr>
                            <th className="px-4 py-2">Batch ID</th>
                            <th className="px-4 py-2">Material Code</th>
                            <th className="px-4 py-2">Grade</th>
                            <th className="px-4 py-2">Packing Type</th>
                            <th className="px-4 py-2">Glove Count</th>
                            <th className="px-4 py-2">Pieces</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((record) =>
                            record.items.map((item, index) => (
                                <tr
                                    key={`${record._id}-${index}`}
                                    className={`${index === record.items.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}
                                >
                                    <td className="px-4 py-2">
                                        {index === 0 ? new Date(record.date).toLocaleDateString() : ''}
                                    </td>
                                    <td className="px-4 py-2">{item.batchId}</td>
                                    <td className="px-4 py-2">{item.materialCode}</td>
                                    <td className="px-4 py-2">{item.grade}</td>
                                    <td className="px-4 py-2">{item.packingType}</td>
                                    <td className="px-4 py-2">{item.gloveCount}</td>
                                    <td className="px-4 py-2">{item.pieces}</td>
                                    <td className="px-4 py-2">{index === 0 ? record.totalPacking : ''}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage(prev => (indexOfLastItem < filteredData.length ? prev + 1 : prev))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={indexOfLastItem >= filteredData.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PackingTable;


