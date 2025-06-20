'use client';
import { materialCodeOptions } from '@/app/constant';
import FilterBar from '@/components/Mes/components/Packing/FilterBar';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

const WipBgradeTable = () => {
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
        console.log("token", token);
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5001/packing/wipBgradeEntry/fetch',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                // console.log("res", res);

                if (res.data.success) {
                    // console.log("atData", res.data.data);
                    setData(res.data.data);
                    setFilteredData(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch Wip B Grade data:", error);
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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const exportToExcel = () => {
        const flatData = filteredData.flatMap(record =>
            record.items.map(item => ({
                Date: new Date(record.date).toLocaleDateString(),
                BatchID: item.batchId,
                MaterialCode: item.materialCode,
                Pieces: item.pieces,
                TotalWipBgrade: record.totalWipBgrade,
            }))
        );
        const ws = XLSX.utils.json_to_sheet(flatData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "WIP BGrade Report");
        XLSX.writeFile(wb, "WipBgrade_Report.xlsx");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalFilteredWipBgrade = useMemo(() => {
        return filteredData.reduce((sum, curr) => sum + (curr.totalWipBgrade || 0), 0)
    }, [filteredData])


    return (
        <div className="px-4 md:px-10 py-6">
            <h2 className="text-2xl text-purple-600 font-bold mb-6">Wip B grade report</h2>

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
                    <thead className="bg-purple-200  text-xs uppercase text-gray-600 sticky top-0 z-10">
                        {/* <thead className="bg-yellow-200 text-xs uppercase text-gray-800 sticky top-0 z-10"> */}
                        <tr>
                            <th className="px-4 py-2" rowSpan="2">Date</th>
                            <th className="px-4 py-2 text-center" colSpan="3">Items</th>
                            <th className="px-4 py-2" rowSpan="2">Total WIP B Grade</th>
                        </tr>
                        <tr>
                            <th className="px-4 py-2">Batch ID</th>
                            <th className="px-4 py-2">Material Code</th>
                            <th className="px-4 py-2">Pieces</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500 font-semibold text-lg">
                                    Result not found
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((record) =>
                                record.items.map((item, index) => (
                                    <tr
                                        key={`${record._id}-${index}`}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                            } hover:bg-green-50 transition-colors duration-150`}
                                    >
                                        <td className="px-4 py-2">
                                            {index === 0 ? formatToDDMMYYYY(record.date) : ''}
                                        </td>
                                        <td className="px-4 py-2">{item.batchId}</td>
                                        <td className="px-4 py-2">{item.materialCode}</td>
                                        <td className="px-4 py-2">{item.pieces}</td>
                                        <td className="px-4 py-2">
                                            {index === 0 ? record.totalWipBgrade : ''}
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex md:flex-row flex-col justify-end md:space-x-72 space-x-24'>
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
                        onClick={() => setCurrentPage(prev =>
                            indexOfLastItem < filteredData.length ? prev + 1 : prev
                        )}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={indexOfLastItem >= filteredData.length}
                    >
                        Next
                    </button>
                </div>
                <div className="mt-4 font-semibold text-lg text-right">
                    Total Wip B Grade : {totalFilteredWipBgrade}
                </div>
            </div>

        </div>
    );
};

export default WipBgradeTable;
