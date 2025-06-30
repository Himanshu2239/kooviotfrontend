
// "use client";

// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";

// export default function ProductionTable() {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedDate, setSelectedDate] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const res = await fetch("http://127.0.0.1:5001/admin/fetchProductionMesData");
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
//     }, [selectedDate, searchTerm, data]);

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

//     const formatDate = (dateStr) => {
//         const date = new Date(dateStr);
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
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
//             <div className="overflow-x-auto rounded-lg shadow border border-gray-200 max-h-[75vh]">
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
//                         {filteredData.length > 0 ? (
//                             filteredData.map((entry, idx) => {
//                                 const items = entry.productionItems.length ? entry.productionItems : [{}];

//                                 return items.map((item, i) => (
//                                     <tr
//                                         key={`${idx}-${i}`}
//                                         className={`group ${i === 0 ? 'border-t border-gray-300' : ''} hover:bg-gray-50`}
//                                     >
//                                         {i === 0 && (
//                                             <>
//                                                 <td className="px-4 py-3 whitespace-nowrap" rowSpan={items.length}>
//                                                     {formatDate(entry.date)}
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
//                                                     {entry.totalPieces || '-'}
//                                                 </td>
//                                                 <td className="px-4 py-3" rowSpan={items.length}>
//                                                     {entry.rejTotalPieces || '-'}
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
//         </div>
//     );
// }

'use client';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import FilterBar from '@/components/Mes/components/Packing/FilterBar';
import { materialCodeOptions } from '@/app/constant';

const ProductionTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [materialCode, setMaterialCode] = useState('')
  const [enableFilter, setEnableFilter] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5001/admin/fetchProductionMesData", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setData(res.data.data);
          setFilteredData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch production data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let tempData = [...data];
    if (dateFilter) {
      tempData = tempData.filter(record =>
        new Date(record.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }
    if (startDate && endDate) {
      tempData = tempData.filter(record => {
        const d = new Date(record.date);
        return d >= new Date(startDate) && d <= new Date(endDate);
      });
    }
    setFilteredData(tempData);
    setCurrentPage(1);
  }, [dateFilter, startDate, endDate, data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const exportToExcel = () => {
    const flatData = filteredData.flatMap(record =>
      record.productionItems.map((item, itemIndex) => ({
        Date: itemIndex === 0 ? formatDate(record.date) : "",
        Shift: itemIndex === 0 ? record.shift : "",
        Line: itemIndex === 0 ? record.line : "",
        BatchID: item.batchId,
        MaterialCode: item.materialCode,
        Pieces: item.pieces,
        ProductionInKg: item.productionInKg,
        TotalPieces: itemIndex === 0 ? record.totalPieces : "",
        TotalKg: itemIndex === 0 ? record.totalProductionInKg : ""
      }))
    );
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Production_Report");
    XLSX.writeFile(wb, "Production_Report.xlsx");
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalProduction = useMemo(() => {
    return filteredData.reduce((sum, curr) => sum + (curr.totalPieces || 0), 0);
  }, [filteredData]);

  return (
    <div className="px-4 md:px-10 py-6">
      <h2 className="text-2xl text-red-600 font-bold mb-6">Production Report</h2>

      <FilterBar
        enableFilter={enableFilter}
        setEnableFilter={setEnableFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setMaterialCode={setMaterialCode}
        materialCode={materialCode}
        materialOptions={materialCodeOptions}
        exportToExcel={exportToExcel}
      />

      <div className="overflow-x-auto h-[65vh] border shadow-md rounded-lg mt-6">
        <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="bg-red-200 text-xs uppercase text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2" rowSpan="2">Date</th>
              <th className="px-4 py-2" rowSpan="2">Shift</th>
              <th className="px-4 py-2" rowSpan="2">Line</th>
              <th className="px-4 py-2 text-center" colSpan="4"></th>
              <th className="px-4 py-2" rowSpan="2">Total (Pieces)</th>
              <th className="px-4 py-2" rowSpan="2">Total (Kg)</th>
            </tr>
            <tr>
              <th className="px-4 py-2">Batch ID</th>
              <th className="px-4 py-2">Material Code</th>
              <th className="px-4 py-2">Quantity(Pieces)</th>
              <th className="px-4 py-2">Quantity(Kg)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-10 text-gray-500 font-semibold text-lg">
                  No records found
                </td>
              </tr>
            ) : (
              currentItems.map((record, index) =>
                record.productionItems.map((item, itemIndex) => (
                  <tr key={`${record._id}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-red-50'}>
                    <td className="px-4 py-2">{itemIndex === 0 ? formatDate(record.date) : ''}</td>
                    <td className="px-4 py-2">{itemIndex === 0 ? record.shift : ''}</td>
                    <td className="px-4 py-2">{itemIndex === 0 ? record.line : ''}</td>
                    <td className="px-4 py-2">{item.batchId}</td>
                    <td className="px-4 py-2">{item.materialCode}</td>
                    <td className="px-4 py-2">{item.pieces}</td>
                    <td className="px-4 py-2">{item.productionInKg}</td>
                    <td className="px-4 py-2">{itemIndex === 0 ? record.totalPieces : ''}</td>
                    <td className="px-4 py-2">{itemIndex === 0 ? record.totalProductionInKg : ''}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="font-semibold text-lg text-right text-red-600">
        Total Production Pieces: {totalProduction}
      </div>
    </div>
  );
};

export default ProductionTable;
