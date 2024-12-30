"use client";

import React, { useEffect, useState, useContext } from 'react';
// import SortDropdown from '../components/SortDropdown';
// import Filter from '../components/Filter';
// import { Link } from 'react-router';
import Link from 'next/link';
import axios from 'axios';
import IssueFilter from '@/components/Filter/IssueFilter';
import SortDropdown from '@/components/SortDropdown/SortDropdown';
import Header from '@/components/Header/Header';
import EditIssueStatus from '@/components/EditPage/editIssueStatus';
// import { MyContext } from '../Context';


function Page() {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [originalData, setoriginalData] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [editSvg, setEditSvg] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    // const { change } = useContext(MyContext);

    const fetchdata = async () => {
        console.log(1);
        setLoading(true); // Start loading
        const accessToken = localStorage.getItem("accessToken");
        // const userDetails = localStorage.getItem("userDetails")
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));

        // console.log(userDetails.role);
        if (userDetails?.role === 'admin')
            setEditSvg(true);
        // console.log(accessToken);
        try {
            const res = await axios.get('http://127.0.0.1:5001/common/getIssue',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Send the token in the Authorization header
                    },
                }
            );
            // console.log(req.user);
            setoriginalData(res.data)
            setInfo(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    // console.log(var)

    useEffect(() => {
        fetchdata();
        console.log(editSvg);
    }, [editSvg, editStatus]);

    const handleDropdown = () => {
        if (dropdownOpen)
            setDropdownOpen(false)
    }


    const handleSearch = (e) => {
        const SearchAccToChar = (val) => {
            let SearchedData = [];
            for (let i = 0; i < originalData.length; i++) {
                let j;
                let orginalString = originalData[i].issue.toLowerCase().trim();
                let searchedString = val.toLowerCase()
                for (j = 0; j < val.length; j++) {
                    if (orginalString[j] === searchedString[j])
                        continue;
                    else
                        break;
                }
                if (j === val.length)
                    SearchedData.push(originalData[i]);
            }
            return SearchedData;
        }
        const SearchItem = SearchAccToChar(e.target.value);
        setInfo(SearchItem)
    }

    console.log(editSvg)
    // location.reload();

    return (
        // <>
        //     <Header/>
        //     <div className="min-h-screen bg-gray-100">
        //         <header onClick={handleDropdown} className="bg-white shadow">
        //             <div className="container mx-auto px-4 py-3">
        //                 <h1 className="text-xl font-semibold text-gray-800">Issue Tracking</h1>
        //             </div>
        //         </header>

        //         <div className="container mx-auto px-4 py-4">
        //             <div className="flex justify-between items-center mb-4">
        //                 <div onClick={handleDropdown} className="flex space-x-4">
        //                     <Link href='/AddIssueForm'>
        //                         <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800">
        //                             + Add Issue
        //                         </button>
        //                     </Link>
        //                     <input
        //                         onChange={(e) => handleSearch(e)}
        //                         type="text"
        //                         placeholder="Search by Issue"
        //                         className="border border-gray-300 rounded px-4 py-2"
        //                     />
        //                 </div>
        //                 <IssueFilter
        //                     info={info}
        //                     setInfo={setInfo}
        //                     originalData={originalData}
        //                     dropdownOpen={dropdownOpen}
        //                     setDropdownOpen={setDropdownOpen}
        //                 />
        //             </div>
        //         </div>
        //         <div className="mx-auto px-4">
        //             <div className="overflow-y-auto h-[35rem] bg-white shadow rounded-lg">
        //                 {loading ? (
        //                     <div className="flex justify-center items-center h-full">
        //                         <p className="text-gray-500">Loading issues...</p>
        //                     </div>
        //                 ) : (
        //                     <table className="w-full text-center border-collapse">
        //                         <thead className='sticky top-0' >
        //                             <tr className="bg-gray-100 sticky top-0 border">
        //                                 <th className="px-6 py-4 sticky top-0  border text-sm font-medium text-gray-600">Issue No</th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600">Issue</th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600">Assigned To</th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600">Related To</th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600">Current Status</th>
        //                                 <th className="py-2 w-[18rem] border text-sm font-medium text-gray-600">
        //                                     <SortDropdown
        //                                         info={info}
        //                                         setInfo={setInfo}
        //                                         originalData={originalData}
        //                                     />
        //                                 </th>
        //                             </tr>
        //                         </thead>

        //                         {/* Conditional Rendering */}
        //                         {info.length > 0 ? (
        //                             <tbody>
        //                                 {info.map((data, index) => (
        //                                     <tr key={index}>
        //                                         <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">{data.issueNo}</td>
        //                                         <td className="px-6 break-words whitespace-normal max-w-[150px] border-b-2 border-gray-200 h-auto py-4 text-gray-500">{data.issue}</td>
        //                                         <td className="px-6 break-words whitespace-normal max-w-[150px] py-4 border-b-2 border-gray-200 text-gray-500">{data.assignedTo}</td>
        //                                         <td className="px-6 py-4 break-words  max-w-[150px] border-b-2 border-gray-200 text-gray-500">{data.relatedTo}</td>
        //                                         <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500">{data.currentStatus}</td>
        //                                         <td className='border-b-2 border-gray-200'></td>
        //                                     </tr>
        //                                 ))}
        //                             </tbody>
        //                         ) : (
        //                             <tbody>
        //                                 <tr>
        //                                     <td colSpan="6" className="px-6 py-12">
        //                                         <div className="flex flex-col items-center justify-center">
        //                                             <div className="text-2xl font-bold text-gray-600">Result Not Found</div>
        //                                         </div>
        //                                     </td>
        //                                 </tr>
        //                             </tbody>
        //                         )}
        //                     </table>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </>

        // <>
        //     <Header />
        //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        //         <header
        //             onClick={handleDropdown}
        //             className="bg-white shadow dark:bg-gray-800"
        //         >
        //             <div className="container mx-auto px-4 py-3">
        //                 <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        //                     Issue Tracking
        //                 </h1>
        //             </div>
        //         </header>

        //         <div className="container mx-auto px-4 py-4">
        //             <div className="flex justify-between items-center mb-4">
        //                 <div onClick={handleDropdown} className="flex space-x-4">
        //                     <Link href="/AddIssueForm">
        //                         <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
        //                             + Add Issue
        //                         </button>
        //                     </Link>
        //                     <input
        //                         onChange={(e) => handleSearch(e)}
        //                         type="text"
        //                         placeholder="Search by Issue"
        //                         className="border border-gray-300 rounded px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        //                     />
        //                 </div>
        //                 <IssueFilter
        //                     info={info}
        //                     setInfo={setInfo}
        //                     originalData={originalData}
        //                     dropdownOpen={dropdownOpen}
        //                     setDropdownOpen={setDropdownOpen}
        //                 />
        //             </div>
        //         </div>
        //         <div className="mx-auto px-4">
        //             <div className="overflow-y-auto h-[35rem] bg-white shadow rounded-lg dark:bg-gray-800 dark:shadow-gray-700">
        //                 {loading ? (
        //                     <div className="flex justify-center items-center h-full">
        //                         <p className="text-gray-500 dark:text-gray-400">Loading issues...</p>
        //                     </div>
        //                 ) : (
        //                     <table className="w-full text-center border-collapse">
        //                         <thead className="sticky top-0">
        //                             <tr className="bg-gray-100 sticky top-0 border dark:bg-gray-700">
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-gray-300">
        //                                     Issue No
        //                                 </th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-gray-300">
        //                                     Issue
        //                                 </th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-gray-300">
        //                                     Assigned To
        //                                 </th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-gray-300">
        //                                     Related To
        //                                 </th>
        //                                 <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-gray-300">
        //                                     Current Status
        //                                 </th>
        //                                 <th className="py-2 w-[18rem] border text-sm font-medium text-gray-600 dark:text-gray-300">
        //                                     <SortDropdown
        //                                         info={info}
        //                                         setInfo={setInfo}
        //                                         originalData={originalData}
        //                                     />
        //                                 </th>
        //                             </tr>
        //                         </thead>

        //                         {/* Conditional Rendering */}
        //                         {info.length > 0 ? (
        //                             <tbody>
        //                                 {info.map((data, index) => (
        //                                     <tr key={index}>
        //                                         <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-gray-400 dark:border-gray-700">
        //                                             {data.issueNo}
        //                                         </td>
        //                                         <td className="px-6 break-words whitespace-normal max-w-[150px] border-b-2 border-gray-200 h-auto py-4 text-gray-500 dark:text-gray-400 dark:border-gray-700">
        //                                             {data.issue}
        //                                         </td>
        //                                         <td className="px-6 break-words whitespace-normal max-w-[150px] py-4 border-b-2 border-gray-200 text-gray-500 dark:text-gray-400 dark:border-gray-700">
        //                                             {data.assignedTo}
        //                                         </td>
        //                                         <td className="px-6 py-4 break-words max-w-[150px] border-b-2 border-gray-200 text-gray-500 dark:text-gray-400 dark:border-gray-700">
        //                                             {data.relatedTo}
        //                                         </td>
        //                                         <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-gray-400 dark:border-gray-700">
        //                                             {data.currentStatus}
        //                                         </td>
        //                                         <td className="border-b-2 border-gray-200 dark:border-gray-700"></td>
        //                                     </tr>
        //                                 ))}
        //                             </tbody>
        //                         ) : (
        //                             <tbody>
        //                                 <tr>
        //                                     <td colSpan="6" className="px-6 py-12">
        //                                         <div className="flex flex-col items-center justify-center">
        //                                             <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
        //                                                 Result Not Found
        //                                             </div>
        //                                         </div>
        //                                     </td>
        //                                 </tr>
        //                             </tbody>
        //                         )}
        //                     </table>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </>

        <>
            <Header />
            <div className="min-h-screen bg-gray-100 dark:bg-black">
                <header
                    onClick={handleDropdown}
                    className="bg-white shadow dark:bg-black dark:border-b dark:border-gray-500"
                >
                    <div className="container mx-auto px-4 py-3">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Issue Tracking
                        </h1>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <div onClick={handleDropdown} className="flex space-x-4">
                            <Link href="/AddIssueForm">
                                <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
                                    + Add Issue
                                </button>
                            </Link>
                            <input
                                onChange={(e) => handleSearch(e)}
                                type="text"
                                placeholder="Search by Issue"
                                className="border border-gray-300 rounded px-4 py-2 dark:border-gray-500 dark:bg-black dark:text-white"
                            />
                        </div>
                        <IssueFilter
                            info={info}
                            setInfo={setInfo}
                            originalData={originalData}
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                        />
                    </div>
                </div>
                <div className="mx-auto px-4">
                    <div className="overflow-y-auto h-[35rem] bg-white shadow rounded-lg dark:bg-black dark:border dark:border-gray-500">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500 dark:text-white">Loading issues...</p>
                            </div>
                        ) : (
                            <table className="w-full table-auto text-center border-collapse">
                                <thead className="sticky top-0">
                                    <tr className="bg-gray-100 sticky top-0 border dark:bg-black dark:border-gray-500">
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Issue No
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Issue
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Assigned To
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Related To
                                        </th>
                                        <th className="px-6 py-4 border text-sm font-medium text-gray-600 dark:text-white">
                                            Current Status
                                        </th>
                                        <th className="py-2 w-[18rem] border text-sm font-medium text-gray-600 dark:text-white">
                                            <SortDropdown
                                                info={info}
                                                setInfo={setInfo}
                                                originalData={originalData}
                                            />
                                        </th>
                                    </tr>
                                </thead>

                                {/* Conditional Rendering */}
                                {info.length > 0 ? (
                                    <tbody>
                                        {info.map((data, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.issueNo}
                                                </td>
                                                <td className="px-6 break-words whitespace-normal max-w-[150px] border-b-2 border-gray-200 h-auto py-4 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.issue}
                                                </td>
                                                <td className="px-6 break-words whitespace-normal max-w-[150px] py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.assignedTo}
                                                </td>
                                                <td className="px-6 py-4 break-words max-w-[150px] border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {data.relatedTo}
                                                </td>
                                                <td className="px-6 py-4 border-b-2 border-gray-200 text-gray-500 dark:text-white dark:border-gray-500">
                                                    {/* <div className="mr-4 inline-block align-middle">
                                                        {data.currentStatus}
                                                    </div> */}
                                                    {/* {editSvg && (<span
                                                        title="Edit Status"
                                                    // onClick={() => handleEditStatus(data)}
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
                                                    </span>)} */}
                                                    <EditIssueStatus
                                                    //   key={index}
                                                      data={data}
                                                      editSvg={editSvg}
                                                      setEditStatus={setEditStatus}
                                                    />
                                                </td>
                                                <td className="border-b-2 border-gray-200 dark:border-gray-500"></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12">
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
        </>



    );
}

export default Page;