
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { materialCodeOptions } from '@/app/constant'; // adjust path as needed
import FilterBar from '@/components/Mes/components/Packing/FilterBar';
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


const categoryFields = [
    'piecesFgBox',
    'piecesFgBulk',
    'piecesWipA',
    'piecesWipB',
    'piecesFgRejection',
    'piecesWipRejection',
    'piecesProduction',
    'piecesDispatch',
];

export default function StockReportPage() {
    const [aggregatedData, setAggregatedData] = useState({});
    const [materialCode, setMaterialCode] = useState('');
    const [filteredCodes, setFilteredCodes] = useState([]);
    const [enableFilter, setEnableFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);




    useEffect(() => {
        const fetchStockData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('https://kooviot.vercel.app/admin/fetchBatchStockData');
                const rawData = res.data.data;

                // console.log("rawData", rawData);

                // Initialize materialMap with all material codes from constant.js
                const materialMap = {};
                materialCodeOptions.forEach((code) => {
                    materialMap[code] = categoryFields.reduce((acc, field) => {
                        acc[field] = 0;
                        return acc;
                    }, {});
                });

                // Aggregate backend data into materialMap
                rawData.forEach((batch) => {
                    batch.materials.forEach((mat) => {
                        const code = mat.materialCode;
                        // Skip if materialCode is not in the predefined list
                        if (!materialMap[code]) return;
                        categoryFields.forEach((field) => {
                            materialMap[code][field] += mat[field] || 0;
                        });
                    });
                });
                setAggregatedData(materialMap);
                setFilteredCodes(Object.keys(materialMap));
            } catch (err) {
                console.error('Error fetching stock data:', err);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchStockData();
    }, []);


    useEffect(() => {
        if (materialCode) {
            setFilteredCodes([materialCode]);
        } else {
            setFilteredCodes(Object.keys(aggregatedData));
        }
    }, [materialCode, aggregatedData]);


    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Stock Report');

        // Prepare header
        const headers = ['Material Code', ...categoryFields.map(cat =>
            cat.replace('pieces', '').replace(/([A-Z])/g, ' $1').trim()
        )];
        sheet.addRow(headers);

        // Style header row
        const headerRow = sheet.getRow(1);
        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D1C4E9' },
            };
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center' };
        });

        // Add data rows
        filteredCodes.forEach(code => {
            const row = [code];
            categoryFields.forEach(cat => {
                row.push(aggregatedData[code]?.[cat] || 0);
            });
            sheet.addRow(row);
        });

        // Export
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'Stock_Report.xlsx');
        });
    };


    return (
        <div className="px-4 md:px-10 py-6">
            <h2 className="text-2xl text-purple-600 font-bold mb-6">Stock Report (Material Code Wise)</h2>
            <FilterBar
                materialCode={materialCode}
                setMaterialCode={setMaterialCode}
                materialOptions={materialCodeOptions}
                enableFilter={enableFilter} // hiding date filters
                setEnableFilter={setEnableFilter}
                dateFilter={false}
                setDateFilter={() => { }}
                startDate={null}
                setStartDate={() => { }}
                endDate={null}
                setEndDate={() => { }}
                exportToExcel={exportToExcel}
            />
            <div className="overflow-x-auto h-[65vh] border shadow-md rounded-lg mt-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full text-purple-600 font-semibold text-lg animate-pulse">
                        Loading stock data...
                    </div>)
                    : (<table className="min-w-full text-sm text-left text-gray-700 border-collapse">
                        <thead className="bg-purple-200 text-xs uppercase text-gray-600 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-2">Material Code</th>
                                {categoryFields.map((cat) => (
                                    <th key={cat} className="px-4 py-2 text-center">
                                        {cat.replace('pieces', '').replace(/([A-Z])/g, ' $1')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            {filteredCodes.length === 0 ? (
                                <tr>
                                    <td colSpan={categoryFields.length + 1} className="text-center py-10 text-gray-500 font-semibold text-lg">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filteredCodes.map((code, idx) => (
                                    <tr
                                        key={code}
                                        className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-purple-50 transition-colors duration-150`}
                                    >
                                        <td className="px-4 py-2 font-semibold">{code}</td>
                                        {categoryFields.map((cat) => (
                                            <td key={cat} className="px-4 py-2 text-center">
                                                {aggregatedData[code]?.[cat] || 0}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>)}
            </div>
        </div>
    );
}

