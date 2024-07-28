"use client";

import { useState } from "react";

export default function RightPanel() {
  const [response, setResponse] = useState("");

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-xl font-bold mb-2">Response:</h2>
      <pre className="bg-slate-800 p-4 rounded overflow-auto max-h-[calc(100vh-8rem)]">
        {response || "No response yet"}
      </pre>
    </div>
  );
}
