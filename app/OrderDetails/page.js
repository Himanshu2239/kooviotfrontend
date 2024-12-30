"use client";

import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import EditPage from '@/components/EditPage/EditPage';
import OrderFilter from '@/components/Filter/OrderFilter';
import Link from 'next/link';
import Header from '@/components/Header/Header';
// import EditPage from '../components/EditPage';
// import OrderFilter from '../components/OrderFilter';

const OrderDetails = () => {
    // State variables
    const [info, setInfo] = useState([]); // Stores the filtered order data
    const [loading, setLoading] = useState(true); // Loading state
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
    const [searchQuery, setSearchQuery] = useState(""); // Search query input
    const [originalData, setOriginalData] = useState([]); // Original unfiltered data
    const [showEdit, setShowEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState([]);

    useEffect(() => {
        // Simulating fetching data
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                const res = await axios.get('http://127.0.0.1:5001/common/getAllOrder',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // Send the token in the Authorization header
                        },
                    }
                )
                // console.log(res);
                setOriginalData(res.data);
                setInfo(res.data);
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [showEdit]);

    // const userDetails = localStorage.getItem("userDetails");
    // console.log("1",userDetails)

    // Handle dropdown toggle
    const handleDropdown = () => {
        if (dropdownOpen) setDropdownOpen(!dropdownOpen);
    };

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter info based on the search query
        const filteredInfo = originalData.filter((order) =>
            order.clientName.toLowerCase().includes(query.toLowerCase()) ||
            order.userId.toString().includes(query)
        );
        setInfo(filteredInfo);
    };

    const handleEditStatus = (data) => {
        console.log(data);
        setSelectedOrder(data);
        setShowEdit(prev => !prev);
    };

    return (
        // <div className=''>
        // <Header/>
        // <div className="min-h-screen bg-gray-100 relative">
        //     <header onClick={handleDropdown} className="bg-white shadow">
        //         <div className="container mx-auto px-4 py-3">
        //             <h1 className="text-xl font-semibold text-gray-800">Order Details</h1>
        //         </div>
        //     </header>
        //     <div className="container mx-auto px-4 py-4">
        //         <div className="flex justify-between items-center">
        //             <div className="flex space-x-4">
        //                 <Link href='/CreateOrder'>
        //                     <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800">
        //                         + Add Order
        //                     </button>
        //                 </Link>
        //                 <input
        //                     onChange={handleSearch}
        //                     value={searchQuery}
        //                     type="text"
        //                     placeholder="Search by Client name"
        //                     className="border border-gray-300 rounded px-4 py-2"
        //                 />
        //             </div>
        //             <OrderFilter
        //                 onClick={handleDropdown}
        //                 info={info}
        //                 setInfo={setInfo}
        //                 originalData={originalData}
        //                 dropdownOpen={dropdownOpen}
        //                 setDropdownOpen={setDropdownOpen}
        //             />
        //         </div>
        //     </div>

        //     {/* Blur Background Overlay when showEdit is true */}
        //     {showEdit && (
        //         <div className="fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-md"></div>
        //     )}

        //     {showEdit && (
        //         <div className="absolute md:top-[6rem] left-10 md:left-[34rem] md:w-[30rem] w-[20rem] h-auto bg-gray-100 shadow-lg z-30 rounded-lg">
        //             <EditPage
        //                 selectedOrder={selectedOrder}
        //                 setShowEdit={setShowEdit}
        //                 showEdit={showEdit}
        //             />
        //         </div>
        //     )}

        //     <div className="mx-auto relative z-0 px-4">
        //         <div className="overflow-y-auto h-[35rem] bg-white shadow rounded-lg">
        //             {loading ? (
        //                 <div className="flex justify-center items-center h-full">
        //                     <p className="text-gray-500">Loading orders...</p>
        //                 </div>
        //             ) : (
        //                 <table className="w-full backdrop-blur-sm text-center border-collapse">
        //                     <thead className="sticky top-0">
        //                         <tr className="bg-gray-100 sticky top-0 border">
        //                             <th className="px-6 py-4 sticky top-0 border text-sm font-medium text-gray-600">Order ID</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Client Name</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Sales Person</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Location</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">No of Pcs</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Amount</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Remark</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Order Status</th>
        //                             <th className="px-6 py-4 border text-sm font-medium text-gray-600">Order Date</th>
        //                         </tr>
        //                     </thead>

        //                     {info.length > 0 ? (
        //                         <tbody>
        //                             {info.map((data, index) => (
        //                                 <tr key={index}>
        //                                     <td className="px-6 border-b-2 border-gray-200 py-4 text-gray-500">{data.orderId}</td>
        //                                     <td className="px-6 border-b-2 border-gray-200 py-4 text-gray-500">{data.clientName}</td>
        //                                     <td className="px-6 border-b-2 border-gray-200 py-4 break-words whitespace-normal max-w-[150px] text-gray-500">{data.salesPerson}</td>
        //                                     <td className="px-6 py-4 border-b-2 border-gray-200 break-words whitespace-normal max-w-[150px] text-gray-500">{data.location}</td>
        //                                     <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">{data.noOfPcs}</td>
        //                                     <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">{data.amount}</td>
        //                                     <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">{data.remark}</td>
        //                                     <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">
        //                                         <div className='mr-4 inline-block align-middle'>{data.orderStatus}</div>
        //                                       <span title='Edit Order Status' onClick={() => handleEditStatus(data)} >
        //                                             <svg className="w-6 h-6 text-gray-500 hover:text-gray-600 dark:text-white inline-block align-middle"
        //                                                 aria-hidden="true"
        //                                                 xmlns="http://www.w3.org/2000/svg"
        //                                                 width="24"
        //                                                 height="24"
        //                                                 fill="none"
        //                                                 viewBox="0 0 24 24">
        //                                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        //                                                     d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
        //                                             </svg>
        //                                         </span>
        //                                     </td>

        //                                     <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">{data.orderDate}</td>
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     ) : (
        //                         <tbody>
        //                             <tr>
        //                                 <td colSpan="9" className="px-6 py-12">
        //                                     <div className="flex flex-col items-center justify-center">
        //                                         <div className="text-2xl font-bold text-gray-600">Result Not Found</div>
        //                                     </div>
        //                                 </td>
        //                             </tr>
        //                         </tbody>
        //                     )}
        //                 </table>
        //             )}
        //         </div>
        //     </div>
        // </div>
        // </div>
        <div className="">
            <Header />
            <div className="min-h-screen bg-gray-100 relative dark:bg-black">
                <header
                    onClick={handleDropdown}
                    className="bg-white shadow dark:bg-black dark:border-b dark:border-gray-500"
                >
                    <div className="container mx-auto px-4 py-3">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Order Details
                        </h1>
                    </div>
                </header>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link href="/CreateOrder">
                                <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
                                    + Add Order
                                </button>
                            </Link>
                            <input
                                onChange={handleSearch}
                                value={searchQuery}
                                type="text"
                                placeholder="Search by Client name"
                                className="border border-gray-300 rounded px-4 py-2 dark:border-gray-500 dark:bg-black dark:text-white"
                            />
                        </div>
                        <OrderFilter
                            onClick={handleDropdown}
                            info={info}
                            setInfo={setInfo}
                            originalData={originalData}
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                        />
                    </div>
                </div>

                {/* Blur Background Overlay when showEdit is true */}
                {showEdit && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-md"></div>
                )}

                {showEdit && (
                    <div className="absolute md:top-[6rem] left-10 md:left-[34rem] md:w-[30rem] w-[20rem] h-auto bg-gray-100 shadow-lg z-30 rounded-lg dark:bg-black dark:border dark:border-gray-500">
                        <EditPage
                            selectedOrder={selectedOrder}
                            setShowEdit={setShowEdit}
                            showEdit={showEdit}
                        />
                    </div>
                )}

                <div className="mx-auto relative z-0 px-4">
                    <div className="overflow-y-auto h-[35rem] bg-white shadow rounded-lg dark:bg-black dark:border dark:border-gray-500">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500 dark:text-white">Loading orders...</p>
                            </div>
                        ) : (
                            <table className="w-full backdrop-blur-sm text-center border-collapse">
                                <thead className="sticky top-0">
                                    <tr className="bg-gray-100 sticky top-0 border dark:bg-black dark:border-gray-500">
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Client Name
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Sales Person
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Location
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            No of Pcs
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Remark
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Order Status
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Order Date
                                        </th>
                                    </tr>
                                </thead>

                                {info.length > 0 ? (
                                    <tbody>
                                        {info.map((data, index) => (
                                            <tr key={index}>
                                                <td className="px-6 border-b-2 border-gray-200 py-4 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.orderId}
                                                </td>
                                                <td className="px-6 border-b-2 border-gray-200 py-4 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.clientName}
                                                </td>
                                                <td className="px-6 border-b-2 border-gray-200 py-4 break-words whitespace-normal max-w-[150px] text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.salesPerson}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 break-words whitespace-normal max-w-[150px] text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.location}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.noOfPcs}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.amount}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.remark}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    <div className="mr-4 inline-block align-middle">
                                                        {data.orderStatus}
                                                    </div>
                                                   {JSON.parse(localStorage.getItem('userDetails')).role === 'admin' && <span
                                                        title="Edit Order Status"
                                                        onClick={() => handleEditStatus(data)}
                                                    >
                                                        <svg
                                                            className="w-6 h-6 text-gray-500 hover:text-gray-600 dark:text-white inline-block align-middle"
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
                                                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                                            />
                                                        </svg>
                                                    </span>}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.orderDate}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-2xl font-bold text-gray-600 dark:text-white">
                                                        Result Not Found
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OrderDetails;

