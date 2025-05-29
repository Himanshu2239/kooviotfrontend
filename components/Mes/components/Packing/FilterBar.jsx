'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex items-center justify-between gap-4 mb-2">
                <Label className="flex items-center gap-2">
                    <Switch checked={enableFilter} onCheckedChange={setEnableFilter} />
                    Enable Filters
                </Label>
                <Button onClick={exportToExcel} className="bg-green-600 text-white hover:bg-green-700">
                    Export to Excel
                </Button>
            </div>

            {enableFilter && (
                // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-32">
                //   {/* Date Filter */}
                //   <div>
                //     <Label className="mb-1 block text-sm">Filter by Date</Label>
                //     <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                //   </div>

                //   {/* Date Range Filter */}
                //   <div>
                //     <Label className="mb-1 block text-sm">Start Date</Label>
                //     <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                //   </div>
                //   <div>
                //     <Label className="mb-1 block text-sm">End Date</Label>
                //     <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                //   </div>

                //   {/* Material Code Dropdown */}
                //   <div>
                //     <Label className="mb-1 block text-sm">Material Code</Label>
                //     <Select value={materialCode} onValueChange={setMaterialCode}>
                //       <SelectTrigger className="w-full">
                //         <SelectValue placeholder="Select Material Code" />
                //       </SelectTrigger>
                //       <SelectContent>
                //         {materialOptions.map((code) => (
                //           <SelectItem key={code} value={code}>{code}</SelectItem>
                //         ))}
                //       </SelectContent>
                //     </Select>
                //   </div>
                // </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24">
                    {/* Date Filter */}
                    <div className="flex items-center gap-2">
                        <Label className="whitespace-nowrap text-sm">Filter by Date</Label>
                        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="flex-1" />
                    </div>

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
        </div>
    );
};

export default FilterBar;
