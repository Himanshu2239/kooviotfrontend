


// "use client";

// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";

// export default function ProductionTable() {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedDate, setSelectedDate] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     // Pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const res = await fetch("https://kooviot.vercel.app/admin/fetchProductionMesData");
//                 const json = await res.json();
//                 if (json.success) {
//                     const sorted = [...json.data].sort((a, b) => new Date(b.date) - new Date(a.date));
//                     setData(sorted);
//                     if (!selectedDate) {
//                         const latestDate = new Date(sorted[0].date).toISOString().split("T")[0];
//                         setSelectedDate(latestDate);
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error fetching production data:", error);
//             }
//         }
//         fetchData();
//     }, []);

//     useEffect(() => {
//         let filtered = data;

//         if (selectedDate) {
//             filtered = filtered.filter(item =>
//                 new Date(item.date).toISOString().split("T")[0] === selectedDate
//             );
//         }

//         if (searchTerm.trim()) {
//             filtered = filtered.filter(item =>
//                 item.batchId.toLowerCase().includes(searchTerm.trim().toLowerCase())
//             );
//         }

//         setFilteredData(filtered);
//         setCurrentPage(1); // Reset to first page when filters change
//     }, [selectedDate, searchTerm, data]);

//     // Pagination logic
//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//     const paginatedData = filteredData.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Excel Export
//     const exportToExcel = () => {
//         const exportData = filteredData.map(entry => ({
//             Date: new Date(entry.date).toLocaleDateString(),
//             BatchID: entry.batchId,
//             Shift: entry.shift,
//             Line: entry.line,
//             Total: entry.totalPieces,
//             Rejected: entry.rejTotalPieces,
//         }));
//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Production Report");
//         XLSX.writeFile(workbook, "production_report.xlsx");
//     };

//     return (
//         <div className="w-full px-6 py-6">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//                 <h1 className="text-2xl font-bold text-gray-800">Production Report</h1>

//                 <div className="flex flex-wrap items-center gap-3">
//                     <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Search by Batch ID"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm"
//                     />
//                     <button
//                         onClick={exportToExcel}
//                         className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md shadow"
//                     >
//                         Export to Excel
//                     </button>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto rounded-lg shadow border border-gray-200 max-h-[70vh]">
//                 <table className="min-w-full table-fixed text-sm text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 text-xs font-semibold uppercase text-gray-600 border-b border-gray-300">
//                             <th className="px-4 py-3">Date</th>
//                             <th className="px-4 py-3">Batch ID</th>
//                             <th className="px-4 py-3">Shift</th>
//                             <th className="px-4 py-3">Line</th>
//                             <th className="px-4 py-3">Material Code</th>
//                             <th className="px-4 py-3">Pieces</th>
//                             <th className="px-4 py-3">Total</th>
//                             <th className="px-4 py-3">Rejected</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {paginatedData.length > 0 ? (
//                             paginatedData.map((entry, idx) => {
//                                 const items = entry.productionItems.length ? entry.productionItems : [{}];

//                                 return items.map((item, i) => (
//                                     <tr
//                                         key={`${idx}-${i}`}
//                                         className={`group ${i === 0 ? 'border-t border-gray-300' : ''} hover:bg-gray-50`}
//                                     >
//                                         {i === 0 && (
//                                             <>
//                                                 <td className="px-4 py-3 whitespace-nowrap" rowSpan={items.length}>
//                                                     {new Date(entry.date).toLocaleDateString()}
//                                                 </td>
//                                                 <td className="px-4 py-3" rowSpan={items.length}>{entry.batchId}</td>
//                                                 <td className="px-4 py-3" rowSpan={items.length}>{entry.shift}</td>
//                                                 <td className="px-4 py-3" rowSpan={items.length}>{entry.line}</td>
//                                             </>
//                                         )}
//                                         <td className="px-4 py-3">{item.materialCode || '-'}</td>
//                                         <td className="px-4 py-3">{item.pieces ?? '-'}</td>
//                                         {i === 0 && (
//                                             <>
//                                                 <td className="px-4 py-3" rowSpan={items.length}>
//                                                     {entry.totalPieces}
//                                                 </td>
//                                                 <td className="px-4 py-3" rowSpan={items.length}>
//                                                     {entry.rejTotalPieces}
//                                                 </td>
//                                             </>
//                                         )}
//                                     </tr>
//                                 ));
//                             })
//                         ) : (
//                             <tr>
//                                 <td colSpan={8} className="text-center py-6 text-gray-400">
//                                     No production data found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-6 space-x-2">
//                 <button
//                     onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//                     className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>
//                 <span className="px-3 py-1 text-sm text-gray-700">
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                     onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//                     className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }



"use client";

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function ProductionTable() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://kooviot.vercel.app/admin/fetchProductionMesData");
                const json = await res.json();
                if (json.success) {
                    const sorted = [...json.data].sort((a, b) => new Date(b.date) - new Date(a.date));
                    setData(sorted);
                    if (!selectedDate) {
                        const latestDate = new Date(sorted[0].date).toISOString().split("T")[0];
                        setSelectedDate(latestDate);
                    }
                }
            } catch (error) {
                console.error("Error fetching production data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = data;

        if (selectedDate) {
            filtered = filtered.filter(item =>
                new Date(item.date).toISOString().split("T")[0] === selectedDate
            );
        }

        if (searchTerm.trim()) {
            filtered = filtered.filter(item =>
                item.batchId.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [selectedDate, searchTerm, data]);

    const exportToExcel = () => {
        const exportData = filteredData.map(entry => ({
            Date: new Date(entry.date).toLocaleDateString(),
            BatchID: entry.batchId,
            Shift: entry.shift,
            Line: entry.line,
            Total: entry.totalPieces,
            Rejected: entry.rejTotalPieces,
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Production Report");
        XLSX.writeFile(workbook, "production_report.xlsx");
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="w-full px-6 py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Production Report</h1>

                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm"
                    />
                    <input
                        type="text"
                        placeholder="Search by Batch ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm"
                    />
                    <button
                        onClick={exportToExcel}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md shadow"
                    >
                        Export to Excel
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 max-h-[75vh]">
                <table className="min-w-full table-fixed text-sm text-left text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 text-xs font-semibold uppercase text-gray-600 border-b border-gray-300">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Batch ID</th>
                            <th className="px-4 py-3">Shift</th>
                            <th className="px-4 py-3">Line</th>
                            <th className="px-4 py-3">Material Code</th>
                            <th className="px-4 py-3">Pieces</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Rejected</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((entry, idx) => {
                                const items = entry.productionItems.length ? entry.productionItems : [{}];

                                return items.map((item, i) => (
                                    <tr
                                        key={`${idx}-${i}`}
                                        className={`group ${i === 0 ? 'border-t border-gray-300' : ''} hover:bg-gray-50`}
                                    >
                                        {i === 0 && (
                                            <>
                                                <td className="px-4 py-3 whitespace-nowrap" rowSpan={items.length}>
                                                    {formatDate(entry.date)}
                                                </td>
                                                <td className="px-4 py-3" rowSpan={items.length}>{entry.batchId}</td>
                                                <td className="px-4 py-3" rowSpan={items.length}>{entry.shift}</td>
                                                <td className="px-4 py-3" rowSpan={items.length}>{entry.line}</td>
                                            </>
                                        )}
                                        <td className="px-4 py-3">{item.materialCode || '-'}</td>
                                        <td className="px-4 py-3">{item.pieces ?? '-'}</td>
                                        {i === 0 && (
                                            <>
                                                <td className="px-4 py-3" rowSpan={items.length}>
                                                    {entry.totalPieces || '-'}
                                                </td>
                                                <td className="px-4 py-3" rowSpan={items.length}>
                                                    {entry.rejTotalPieces || '-'}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ));
                            })
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-400">
                                    No production data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

