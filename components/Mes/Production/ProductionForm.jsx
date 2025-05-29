
"use client";
import InputField from "@/components/Mes/components/input-field";
import AddItemsButton from "@/components/Mes/components/add-items";
import { toast } from "react-toastify";
import { materialCodeOptions } from "@/app/constant";
import { Trash2 } from "lucide-react";

export default function ProductionForm({
  batchId,
  setBatchId,
  materialCode,
  setMaterialCode,
  pieces,
  setPieces,
  totalPieces,
  setTotalPieces,
  productionItems,
  setProductionItems,
}) {
  const handleAddProductionItem = () => {
    if (materialCode && pieces && batchId) {
      const newItem = {
        id: Date.now(),
        batchId,
        materialCode,
        pieces,
      };
      const updated = [...productionItems, newItem];
      setProductionItems(updated);
      const total = updated.reduce((sum, item) => sum + parseInt(item.pieces || "0"), 0);
      setTotalPieces(total.toString());
      setMaterialCode("");
      setPieces("");
      setBatchId("")
    } else {
      toast.error("Please fill all required fields in the Production form");
    }
  };

  const handleRemove = (id) => {
    const updated = productionItems.filter(item => item.id !== id);
    setProductionItems(updated);
    const total = updated.reduce((sum, item) => sum + parseInt(item.pieces || "0"), 0);
    setTotalPieces(total.toString());
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Production:</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* <InputField label="BatchId" value={batchId} onChange={setBatchId} readOnly={false}/> */}
        {/* <InputField label="Material Code:" value={materialCode} onChange={setMaterialCode} /> */}
        <InputField label="Batch ID:" value={batchId} onChange={setBatchId} readOnly={false} />
        <div>
          <label className="block  text-sm font-medium">Material Code</label>
          <select
            className="w-full border rounded mt-1 h-9 bg-gray-200"
            value={materialCode}
            onChange={(e) => setMaterialCode(e.target.value)}
          >
            <option value="">Select</option>
            {materialCodeOptions.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          {/* {errors.materialCode && <p className="text-red-600 text-sm">{errors.materialCode}</p>} */}
        </div>
        <InputField type="number" label="No. of Pieces:" value={pieces} onChange={setPieces} />
      </div>

      <InputField label="Total Pieces:" value={totalPieces} onChange={setTotalPieces} readOnly={true} />

      <div className="flex justify-center my-4">
        <AddItemsButton color="blue" onClick={handleAddProductionItem} />
      </div>

      {productionItems.length > 0 && (
        <div className="mb-2">
          <h3 className="text-md font-semibold mb-2">Production Items:</h3>
          <div className="bg-white bg-opacity-70 rounded-lg p-2 max-h-40 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Batch ID</th>
                  <th className="text-left py-1">Material</th>
                  <th className="text-left py-1">Pieces</th>
                </tr>
              </thead>
              <tbody>
                {productionItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-1">{item.batchId}</td>
                    <td className="py-1">{item.materialCode}</td>
                    <td className="py-1">{item.pieces}</td>
                    <td className="py-1">
                      <button title="remove item" onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
