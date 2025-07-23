
"use client";
import InputField from "@/components/Mes/components/input-field";
import AddItemsButton from "@/components/Mes/components/add-items";
import { toast } from "react-toastify";
import { materialCodeForProduction } from "@/app/constant";
import { Trash2 } from "lucide-react";
import CodeInput from "../CodeInput/CodeInput";


export default function ProductionForm({
  batchId,
  setBatchId,
  materialCode,
  setMaterialCode,
  pieces,
  setPieces,
  productionInKg,
  setProductionInKg,
  totalPieces,
  setTotalPieces,
  totalProductionInKg,
  setTotalProductionInKg,
  productionItems,
  setProductionItems,
}) {
  const handleAddProductionItem = () => {
    if (materialCode && pieces && batchId && productionInKg) {
      if (!materialCodeForProduction.includes(materialCode)) {
        toast.error("Please Enter valid Material code")
        return;
      }
      else {
        const newItem = {
          id: Date.now(),
          batchId,
          materialCode,
          pieces: Number(pieces),
          productionInKg,
        };
        const updated = [...productionItems, newItem];
        setProductionItems(updated);
        const total = updated.reduce((sum, item) => sum + parseInt(item.pieces || "0"), 0);
        setTotalPieces(total.toString());
        const totalInKg = updated.reduce((sum, item) => sum + parseFloat(item.productionInKg || "0"), 0)
        setTotalProductionInKg(totalInKg.toString());
        setMaterialCode("");
        setPieces("");
        setBatchId("");
        setProductionInKg("");
      }
    }
    else {
      toast.error("Please fill all required fields in the Production form");
      return;
    }
  };

  const handleRemove = (id) => {
    const updated = productionItems.filter(item => item.id !== id);
    setProductionItems(updated);
    const total = updated.reduce((sum, item) => sum + parseInt(item.pieces || "0"), 0);
    setTotalPieces(total.toString());
    const totalInKg = updated.reduce((sum, item) => sum + parseFloat(item.productionInKg || "0"), 0)
    setTotalProductionInKg(totalInKg)
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Production:</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* <InputField label="BatchId" value={batchId} onChange={setBatchId} readOnly={false}/> */}
        {/* <InputField label="Material Code:" value={materialCode} onChange={setMaterialCode} /> */}
        <InputField label="Batch ID:" value={batchId} onChange={setBatchId} readOnly={false} />
        <div>
          {/* <label className="block  text-sm font-medium">Material Code</label>
          <select
            className="w-full border rounded mt-1 h-9 bg-gray-200"
            value={materialCode}
            onChange={(e) => setMaterialCode(e.target.value)}
          >
            <option value="">Select</option>
            {materialCodeForProduction.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select> */}
          <CodeInput code={materialCode} setCode={setMaterialCode} codeOptions={materialCodeForProduction} />
          {/* {errors.materialCode && <p className="text-red-600 text-sm">{errors.materialCode}</p>} */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField type="number" label="Production(Pcs):" value={pieces} onChange={setPieces} />
        <InputField type="number" label="Production(Kg):" value={productionInKg} onChange={setProductionInKg} />
      </div>

      {/* <InputField label="Total Pieces:" value={totalPieces} onChange={setTotalPieces} readOnly={true} /> */}

      <div className="flex justify-center my-4">
        <AddItemsButton color="blue" onClick={handleAddProductionItem} />
      </div>

      {/* {productionItems.length > 0 && (
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
                  <>
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
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex flex-row justify-between pl-2 pr-2">
            <div className="">
              Total Production(Pcs): {totalPieces}
            </div>
            <div>
              Total Production(Kg): {totalPieces}
            </div>
          </div>
        </div>
      )} */}
      {productionItems.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3">Production Items</h3>

          <div className="bg-white bg-opacity-80 rounded-lg shadow-sm p-4 max-h-40 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr className="text-left border-b border-gray-300">
                  <th className="py-2 px-3">Batch ID</th>
                  <th className="py-2 px-3">Material</th>
                  <th className="py-2 px-3">Pieces</th>
                  <th className="py-2 px-3">Kg</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {productionItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-3">{item.batchId}</td>
                    <td className="py-2 px-3">{item.materialCode}</td>
                    <td className="py-2 px-3">{item.pieces}</td>
                    <td className="py-2 px-3">{item.productionInKg}</td>
                    <td className="py-2 px-3">
                      <button
                        title="Remove item"
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex justify-between items-center px-2 text-sm text-gray-700">
            <div>Total Production (Pcs): <span className="font-medium">{totalPieces}</span></div>
            <div>Total Production (Kg): <span className="font-medium">{totalProductionInKg}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}
