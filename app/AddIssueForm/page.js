"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header/Header';
// import { useContext } from 'react';
// import { MyContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router-dom";

const Page = () => {
    const [issue, setIssue] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [relatedTo, setRelatedTo] = useState('');
    const [currentStatus, setCurrentStatus] = useState('Open');
    //   const { change, setChange } = useContext(MyContext)
    //   const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken")
        if (!issue.trim() || !assignedTo.trim() || !relatedTo.trim() || !currentStatus.trim()) {
            toast.error("Enter All Field");
            setIssue('');
            setAssignedTo('');
            setRelatedTo('');
            setCurrentStatus('Open');
            return;
        }

        try {
            const res = await axios.post('http://127.0.0.1:5001/common/addIssue', {
                issue,
                assignedTo,
                relatedTo,
                currentStatus
            },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Send the token in the Authorization header
                    },
                });
            toast.success("Issue Added Successfully!")
            // navigate('/issuetracker')

        } catch (err) {
            console.error('Error:', err);
            toast.error('Failed to add issue.');
        }
        // setVari(prev => !prev)
        // setChange(prev => !prev)
        setIssue('');
        setAssignedTo('');
        setRelatedTo('');
        setCurrentStatus('Open');
    };

    return (
        // <>
        //     <ToastContainer />
        //     <Header />
        //     <div className="max-w-lg mt-[5rem] mx-auto p-6 bg-white shadow-lg rounded-lg">
        //         <h2 className="text-2xl font-semibold text-center mb-6">Add New Issue</h2>
        //         <form onSubmit={handleSubmit}>
        //             {/* Issue Field */}
        //             <div className="mb-4">
        //                 <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
        //                     Issue
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="issue"
        //                     value={issue}
        //                     onChange={(e) => setIssue(e.target.value)}
        //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        //                     placeholder="Enter the issue"
        //                     required
        //                 />
        //             </div>

        //             {/* Assigned To Field */}
        //             <div className="mb-4">
        //                 <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
        //                     Assigned To
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="assignedTo"
        //                     value={assignedTo}
        //                     onChange={(e) => setAssignedTo(e.target.value)}
        //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        //                     placeholder="Enter assignee's name"
        //                     required
        //                 />
        //             </div>

        //             {/* Related To Field */}
        //             <div className="mb-4">
        //                 <label htmlFor="relatedTo" className="block text-sm font-medium text-gray-700">
        //                     Related To
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="relatedTo"
        //                     value={relatedTo}
        //                     onChange={(e) => setRelatedTo(e.target.value)}
        //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        //                     placeholder="Enter related to"
        //                     required
        //                 />
        //             </div>

        //             {/* Current Status Field */}
        //             <div className="mb-4">
        //                 <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700">
        //                     Current Status
        //                 </label>
        //                 <select
        //                     id="currentStatus"
        //                     value={currentStatus}
        //                     onChange={(e) => setCurrentStatus(e.target.value)}
        //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        //                     required
        //                 >
        //                     <option value="Open">Open</option>
        //                     <option value="In Progress">In Progress</option>
        //                     <option value="Resolved">Resolved</option>
        //                     <option value="Closed">Closed</option>
        //                 </select>
        //             </div>

        //             {/* Submit Button */}
        //             <div className="mb-4">
        //                 <button
        //                     type="submit"
        //                     className="w-full py-2 px-4 bg-gray-950 text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
        //                 >
        //                     Add Issue
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </>

        <>
            <ToastContainer />
            <Header />
            <div className="max-w-lg mt-[5rem] mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-gray-700">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
                    Add New Issue
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Issue Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="issue"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Issue
                        </label>
                        <input
                            type="text"
                            id="issue"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400"
                            placeholder="Enter the issue"
                            required
                        />
                    </div>

                    {/* Assigned To Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="assignedTo"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Assigned To
                        </label>
                        <input
                            type="text"
                            id="assignedTo"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400"
                            placeholder="Enter assignee's name"
                            required
                        />
                    </div>

                    {/* Related To Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="relatedTo"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Related To
                        </label>
                        <input
                            type="text"
                            id="relatedTo"
                            value={relatedTo}
                            onChange={(e) => setRelatedTo(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400"
                            placeholder="Enter related to"
                            required
                        />
                    </div>

                    {/* Current Status Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="currentStatus"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Current Status
                        </label>
                        <select
                            id="currentStatus"
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400"
                            required
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-950 text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                        >
                            Add Issue
                        </button>
                    </div>
                </form>
            </div>
        </>


    );
};

export default Page;
