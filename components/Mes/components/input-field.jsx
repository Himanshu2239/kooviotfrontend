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
      <input readOnly={readOnly} type={type} value={value} disabled={disabled}
      onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
      onChange={handleChange} className="w-full h-9 bg-gray-200 rounded px-2
       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
       " 
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}


// "use client"

// import { useRef, useEffect } from "react";

// export default function InputField({
//   label,
//   type = "text",
//   disabled = false,
//   className = "",
//   value = "",
//   onChange,
//   readOnly,
//   error,
// }) {
//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     if (onChange) {
//       onChange(e.target.value);
//     }
//   };

//   useEffect(() => {
//     const input = inputRef.current;

//     if (type === "number" && input) {
//       const handleWheel = (e) => e.preventDefault();
//       input.addEventListener("wheel", handleWheel, { passive: false });

//       return () => {
//         input.removeEventListener("wheel", handleWheel);
//       };
//     }
//   }, [type]);

//   return (
//     <div className={className}>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <input
//         ref={inputRef}
//         readOnly={readOnly}
//         type={type}
//         value={value}
//         disabled={disabled}
//         onChange={handleChange}
//         className={`w-full h-9 bg-gray-200 rounded px-2 ${
//           type === "number"
//             ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//             : ""
//         }`}
//       />
//       {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }
