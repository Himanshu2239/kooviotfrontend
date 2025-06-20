'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const FilterBar = ({
    dateFilter,
    setDateFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    enableFilter,
    setEnableFilter,
    materialCode,
    setMaterialCode,
    materialOptions,
    exportToExcel
}) => {
    return (
        <div className="flex h-auto flex-col md:flex-row p-4 rounded-lg shadow space-x-2">
            <div className={`flex items-center justify-between w-full gap-4 mb-2`}>
                <Label className="flex items-center gap-2">
                    <Switch checked={enableFilter} onCheckedChange={setEnableFilter} />
                    Enable Filters
                </Label>
            </div>

            {enableFilter && (
                <div className="flex md:flex-row flex-col justify-between md:gap-32 gap-4">
                    {/* Date Filter */}
                    {/* <div className="flex items-center gap-2">
                        <Label className="whitespace-nowrap text-sm">Filter by Date</Label>
                        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="flex-1" />
                    </div> */}
                    <div className="relative flex items-center gap-2">
                        <Label className="whitespace-nowrap text-sm">Filter by Date</Label>
                        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="flex-1 pr-6" />
                        <AnimatePresence>
                            {dateFilter && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setDateFilter('')}
                                    className="absolute left-[15rem] bottom-[1.6rem] text-white bg-red-600 rounded-full"
                                >
                                    <X strokeWidth={3} size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                        {/* {dateFilter && (
                            <button
                                onClick={() => setDateFilter('')}
                                className="absolute left-[15rem] transition-all duration-300 bottom-[1.6rem] text-white bg-red-600 rounded-full "
                            >

                                <X 
                                strokeWidth={3}
                                size={18} />

                            </button>
                        )} */}
                    </div>

                    <div className='flex gap-4'>
                        {/* Start Date */}
                        <div className="flex items-center gap-2">
                            <Label className="whitespace-nowrap text-sm">Start Date</Label>
                            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="flex-1" />
                        </div>

                        {/* End Date */}
                        <div className="flex items-center gap-2">
                            <Label className="whitespace-nowrap text-sm">End Date</Label>
                            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="flex-1" />
                        </div>
                    </div>

                    {/* Material Code Dropdown */}
                    <div className="flex items-center gap-2">
                        <Label className="whitespace-nowrap text-sm">Material Code</Label>
                        <Select value={materialCode} onValueChange={setMaterialCode}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {materialOptions.map((code) => (
                                    <SelectItem key={code} value={code}>
                                        {code}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}
            <Button onClick={exportToExcel} className="bg-green-600 md:mt-0 mt-4 text-white max-w-32 hover:bg-green-700">
                Export to Excel
            </Button>
        </div>
    );
};

export default FilterBar;
