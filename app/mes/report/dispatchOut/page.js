'use client';
import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import FilterBar from '@/components/Mes/components/Packing/FilterBar';
import { materialCodeOptions } from '@/app/constant';
import * as XLSX from 'xlsx';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DispatchOutTable = () => {
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
        const token = localStorage.getItem("accessToken");
        const fetchData = async () => {
            try {
                const res = await axios.get('https://kooviot.vercel.app/production/dispatchOut/fetch', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) {
                    setData(res.data.data);
                    setFilteredData(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch Dispatch data", err);
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
        if (enableFilter && materialCode) {
            tempData = tempData.filter(record =>
                record.items.some(item => item.materialCode.includes(materialCode))
            );
        }
        setFilteredData(tempData);
        setCurrentPage(1);
    }, [dateFilter, startDate, endDate, enableFilter, materialCode, data]);

    const formatToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    const exportToExcel = () => {
        const flatData = filteredData.flatMap(record =>
            record.items.map(item => ({
                Date: new Date(record.date).toLocaleDateString(),
                InvoiceNo: record.invoiceNo,
                BatchID: item.batchId,
                MaterialCode: item.materialCode,
                Grade: item.grade,
                PackagingType: item.packagingType,
                LotNo: item.lotNo || '-',
                Pieces: item.pieces,
                Customer: item.customer,
                TotalPieces: record.totalPieces
            }))
        );
        const ws = XLSX.utils.json_to_sheet(flatData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Dispatch_Report");
        XLSX.writeFile(wb, "Dispatch_Report.xlsx");
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalDispatch = useMemo(() => {
        const total = filteredData.reduce((sum, curr) => curr.totalPieces + sum, 0)
        console.log(total);
        return total;
    }, [filteredData])

    const router = useRouter(); // ✅ Use this

    return (
        <div className="px-4 md:px-10 py-6">
            {/* <div className='flex'>
                <button
                    onClick={() => router.push('/production')}
                    className="flex items-center gap-2  text-sm bg-blue-800 hover:bg-blue-900 relative top-1 left-2  text-white font-semibold rounded-lg transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
                <h2 className="text-2xl text-blue-600 font-bold mb-6">Dispatch Out Report</h2>

            </div> */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => router.back()} // ✅ Go back to previous page
                    className="flex items-center gap-2 text-sm bg-blue-800 hover:bg-blue-900 text-white font-semibold px-3 py-1 rounded-lg transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
                <h2 className="text-2xl text-blue-600 font-bold">Dispatch Out Report</h2>
            </div>

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

            <div className="overflow-x-auto h-[65vh] border shadow-md rounded-lg mt-6">
                <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
                    <thead className="bg-blue-200 text-xs uppercase text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2" rowSpan="2">Date</th>
                            <th className="px-4 py-2" rowSpan="2">Invoice No</th>
                            <th className="px-4 py-2 text-center" colSpan="6">Items</th>
                            <th className="px-4 py-2" rowSpan="2">Total Pieces</th>
                        </tr>
                        <tr>
                            <th className="px-4 py-2">Batch ID</th>
                            <th className="px-4 py-2">Material Code</th>
                            <th className="px-4 py-2">Grade</th>
                            <th className="px-4 py-2">Packaging</th>
                            {/* <th className="px-4 py-2">Lot No</th> */}
                            <th className="px-4 py-2">Pieces</th>
                            <th className="px-4 py-2">Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center py-10 text-gray-500 font-semibold text-lg">
                                    Result not found
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((record) =>
                                record.items.map((item, index) => (
                                    <tr key={`${record._id}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2">{index === 0 ? formatToDDMMYYYY(record.date) : ''}</td>
                                        <td className="px-4 py-2">{index === 0 ? record.invoiceNo : ''}</td>
                                        <td className="px-4 py-2">{item.batchId}</td>
                                        <td className="px-4 py-2">{item.materialCode}</td>
                                        <td className="px-4 py-2">{item.grade}</td>
                                        <td className="px-4 py-2">{item.packagingType}</td>
                                        {/* <td className="px-4 py-2">{item.lotNo || '-'}</td> */}
                                        <td className="px-4 py-2">{item.pieces}</td>
                                        <td className="px-4 py-2">{item.customer}</td>
                                        <td className="px-4 py-2">{index === 0 ? record.totalPieces : ''}</td>
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
                        className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="font-semibold text-lg text-right pr-4">
                Total Dispatch: {totalDispatch}
            </div>
        </div>
    );
};

export default DispatchOutTable;
