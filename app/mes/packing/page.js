 

"use client"

import PackingForm from "@/components/Mes/components/Packing/PackingForm";
import RejectionForm from "@/components/Mes/components/Packing/RejectionFrom";
import LogoutButton from "@/components/Mes/logout/logoutButton";

export default function PackingPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-white to-green-50 min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>
      <h1 className="text-3xl font-bold text-center text-green-800 mb-10">Packing Entry</h1>
      <PackingForm />
      <div className="my-10 border-t border-gray-300" />
      <RejectionForm />
    </div>
  )
}


