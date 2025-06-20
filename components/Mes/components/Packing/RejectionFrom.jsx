import { useMemo, useState } from "react"
import { Loader2, Trash2 } from "lucide-react"
import InputField from "../input-field"
import { getNormalizedDate, isValidBatchId, materialCodeOptions } from "@/app/constant"
import { toast } from "react-toastify"
import axios from "axios"


export default function RejectionForm() {
    const [items, setItems] = useState([])
    const [date, setDate] = useState("")
    const [materialCode, setMaterialCode] = useState("")
    const [pieces, setPieces] = useState()
    const [reason, setReason] = useState("")
    const [errors, setErrors] = useState({})
    const [batchId, setBatchId] = useState("")
    const [isLoading, setIsloading] = useState(false);

    const handleAdd = () => {
        const newErrors = {}
        if (!date) newErrors.date = "Date is required"
        if (!batchId) newErrors.batchId = "BatchId is required"
        // if (!isValidBatchId(batchId) && batchId)
        //     newErrors.batchId = "Invalid Batch Id"
        if (!materialCode) newErrors.materialCode = "Material code is required"
        if (!pieces) newErrors.pieces = "Pieces are required"
        if (!reason) newErrors.reason = "Reason is required"

        if (Object.keys(newErrors).length) return setErrors(newErrors)

        setItems([...items, { id: Date.now(), batchId, materialCode, pieces:Number(pieces), reason }])
        // setDate("") 
        setBatchId("")
        setMaterialCode("")
        setPieces("")
        setReason("")
        setErrors({})
    }

    const handleDelete = (id) => setItems(items.filter((item) => item.id !== id))

    // const totalPieces = items.reduce((sum, item) => (sum + Number(item.pieces)), 0)

    const totalPieces = useMemo(() => {
        return items.reduce((sum, item) => sum + Number(item.pieces), 0)
    }, [items])

    const handleSubmit = async () => {
        setIsloading(true);
        const { year, month, day } = getNormalizedDate(date);
        console.log("year, month, day", year, month, day);
        const token = localStorage.getItem("accessToken");
        // console.log("token", token);

        if (!year || !month || !day || !items.length) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const toastId = toast.loading("Submitting packing data...");

        try {
            const response = await axios.post("https://kooviot.vercel.app/packing/wipRejection/update", {
                year,
                month,
                day,
                // mtdType: "packing",
                items,
                totalPackingRej: Number(totalPieces)
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // console.log("response", response);

            if (response.status === 200 || response.status === 201) {
                toast.update(toastId, {
                    render: response.data.message,
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });

                // Optionally reset form
                setItems([]);
                setDate("")
                // resetForm();
            } else {
                toast.update(toastId, {
                    render: response.data.message || "Failed to submit Packing Rejection data.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.update(toastId, {
                render: error?.response?.data?.message || "Server or network error!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
        finally{
            setIsloading(false);
        }
    };

    // const handleSubmit = () => {
    //     if (items.length === 0) {
    //         alert("No items to submit")
    //         return
    //     }

    //     console.log("Submitting rejection items:", items)
    //     // Submit logic
    // }

    return (
        <div>
            <div className="flex justify-between p-4">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">WIP Rejection Entry</h2>
                <InputField label="" type="date" value={date} onChange={setDate} error={errors.date} />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                <InputField label="Batch ID:" value={batchId} onChange={setBatchId} error={errors.batchId} readOnly={false} />
                <div>
                    <label className="block text-sm font-medium">Material Code</label>
                    <select
                        className="w-full border rounded mt-1 h-9 bg-gray-200"
                        value={materialCode}
                        onChange={(e) => setMaterialCode(e.target.value)}
                    >
                        <option value="">Select</option>
                        {materialCodeOptions.map((code, index) => (
                            <option key={index} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                    {errors.materialCode && <p className="text-red-600 text-sm">{errors.materialCode}</p>}
                </div>
                <InputField
                    label="No. of Pieces"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={pieces}
                    onChange={setPieces}
                    error={errors.pieces}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Reason</label>
                <textarea
                    className="w-full bg-gray-200 border rounded p-2"
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                {errors.reason && <p className="text-red-600 text-sm">{errors.reason}</p>}
            </div>

            <div className="flex justify-center mb-6">
                <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleAdd}>
                    Add Rejection
                </button>
            </div>
            {items.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">Rejection Items</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="py-2">Batch Id</th>
                                <th>Material Code</th>
                                <th>Pieces</th>
                                <th>Reason</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-2">{item.batchId}</td>
                                    <td>{item.materialCode}</td>
                                    <td>{item.pieces}</td>
                                    <td>{item.reason}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <p className="text-xl font-bold text-gray-700 mt-2">Total Pieces = {totalPieces}</p>
                         <div className="text-right mt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                            {isLoading ? 'Submitting...' : 'Submit Rejection'}
                        </button>
                    </div>
                    </div>
                </div>
            )}

        </div>
    )
}
