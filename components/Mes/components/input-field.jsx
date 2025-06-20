"use client"


export default function InputField({ label, type = "text", disabled = false, className = "", value = "", onChange, readOnly, error }) {

  const handleChange = (e) => {
    // setInputValue(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {/* <input readOnly={label === 'Batch ID:' || label === 'Total Pieces:'} type={type} value={value} onChange={handleChange} className="w-full h-9 bg-gray-200 rounded px-2" /> */}
      <input readOnly={readOnly} type={type} value={value} disabled={disabled} onChange={handleChange} className="w-full h-9 bg-gray-200 rounded px-2" />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}
