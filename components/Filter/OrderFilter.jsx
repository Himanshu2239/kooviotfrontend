"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderFilter({ info, setInfo, originalData, dropdownOpen, setDropdownOpen }) {
    const [salesperson, setSalesperson] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [orderDate, setOrderDate] = useState("");

    // Apply filters function
    const applyFilters = () => {
        let data = originalData;

        console.log(data);

        if (salesperson) {
            data = data.filter((item) => item.salesPerson.toLowerCase().includes(salesperson.toLowerCase()));
        }
        if (orderStatus) {
            data = data.filter((item) => item.orderStatus === orderStatus);
        }
        if (orderDate) {
            data = data.filter((item) => {
                // const itemDate = item.createdAt.split('T')[0]; // e.g., "2024-12-11"
                return item.orderDate === orderDate;
            });
        }

        if (!salesperson && !orderStatus && !orderDate) {
            toast.error("Please enter at least one filter.");
        } else {
            setDropdownOpen(false);
            toast.info("Filters applied successfully.");
        }

        setInfo(data); // Update the filtered data
    };

    const clearFilter = () => {
        setSalesperson("");
        setOrderStatus("");
        setOrderDate("");
    }

    return (
        // <>
        //     <ToastContainer />
        //     <div className="relative">
        //         {/* Filter Button */}
        //         <button
        //             className="border-2 font-semibold border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-200"
        //             onClick={() => setDropdownOpen(!dropdownOpen)}
        //         >
        //             Filter
        //         </button>

        //         {/* Dropdown */}
        //         {dropdownOpen && (
        //             <div className="border-2 z-10 w-[20rem] bg-gray-200 absolute top-[4rem] right-0 h-auto rounded-lg shadow-lg p-4">
        //                 <div className="flex flex-row justify-between">
        //                     <h3 className="text-lg font-bold mb-4">Filter Options</h3>
        //                     <div onClick={() => setDropdownOpen(prev => !prev)}>
        //                         <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        //                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
        //                         </svg>
        //                     </div>
        //                 </div>
        //                 {/* Salesperson Input */}
        //                 <div className="mb-4">
        //                     <label className="block mb-2 font-medium">Salesperson</label>
        //                     <input
        //                         type="text"
        //                         placeholder="Enter salesperson name"
        //                         className="w-full border rounded-lg px-3 py-2"
        //                         value={salesperson}
        //                         onChange={(e) => setSalesperson(e.target.value)}
        //                     />
        //                 </div>

        //                 {/* Order Status Dropdown */}
        //                 <div className="mb-4">
        //                     <label className="block mb-2 font-medium">Order Status</label>
        //                     <select
        //                         className="w-full border rounded-lg px-3 py-2"
        //                         value={orderStatus}
        //                         onChange={(e) => setOrderStatus(e.target.value)}
        //                     >
        //                         <option value="">Select Status</option>
        //                         <option value="Sending Performa Invoice">Sending Performa Invoice</option>
        //                         <option value="PI Send">PI Send</option>
        //                         <option value="Payment Received">Payment Received</option>
        //                         <option value="Packing Process">Packing Process</option>
        //                         <option value="Packed">Packed</option>
        //                         <option value="Dispatch in Process">Dispatch in Process</option>
        //                         <option value="Dispatch">Dispatch</option>
        //                     </select>
        //                 </div>

        //                 {/* Order Date Input */}
        //                 <div className="mb-4">
        //                     <label className="block mb-2 font-medium">Order Date</label>
        //                     <input
        //                         type="date"
        //                         className="w-full border rounded-lg px-3 py-2"
        //                         value={orderDate}
        //                         onChange={(e) => setOrderDate(e.target.value)}
        //                     />
        //                 </div>

        //                 {/* Apply Button */}
        //                 <div>
        //                     <button
        //                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        //                         onClick={applyFilters}
        //                     >
        //                         Apply
        //                     </button>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </>
        <>
            <ToastContainer />
            <div className="relative">
                {/* Filter Button */}
                <button
                    className="border-2 font-semibold border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-200 dark:border-gray-500 dark:bg-black dark:text-white dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    Filter
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                    <div className="border-2 z-10 w-[20rem] bg-gray-200 absolute top-[4rem] right-0 h-auto rounded-lg shadow-lg p-4 dark:bg-black dark:border-gray-500">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-lg font-bold mb-4 dark:text-white">
                                Filter Options
                            </h3>
                            <div onClick={() => setDropdownOpen((prev) => !prev)}>
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Salesperson Input */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium dark:text-white">Salesperson</label>
                            <input
                                type="text"
                                placeholder="Enter salesperson name"
                                className="w-full border rounded-lg px-3 py-2 dark:bg-black dark:border-gray-500 dark:text-white"
                                value={salesperson}
                                onChange={(e) => setSalesperson(e.target.value)}
                            />
                        </div>

                        {/* Order Status Dropdown */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium dark:text-white">Order Status</label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 dark:bg-black dark:border-gray-500 dark:text-white"
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="PI">PI</option>
                                <option value="PO">PO</option>
                                <option value="Payment Received">Payment Received</option>
                                <option value="Packing Process">Packing Process</option>
                                <option value="Packed">Packed</option>
                                <option value="Invoice">Invoice</option>
                                <option value="Dispatched">Dispatched</option>
                            </select>
                        </div>

                        {/* Order Date Input */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium dark:text-white">Order Date</label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2 dark:bg-black dark:border-gray-500 dark:text-white"
                                // className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-900 dark:bg-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                                value={orderDate}
                                onChange={(e) => setOrderDate(e.target.value)}
                            />
                        </div>

                        {/* Apply Button */}
                        <div className="flex justify-between">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                                onClick={applyFilters}
                            >
                                Apply
                            </button>
                            <button onClick={clearFilter} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white">
                                Clear
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
}

export default OrderFilter;
