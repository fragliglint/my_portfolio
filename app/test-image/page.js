"use client";
import { useEffect, useState } from "react";

export default function TestImagePage() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/formal.jpg', { method: 'GET', cache: 'no-store' })
      .then(res => setStatus({ ok: res.ok, status: res.status }))
      .catch(err => setStatus({ ok: false, error: err.message }));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Test: /formal.jpg</h1>
        <p className="mb-4 text-sm text-gray-600">Fetch status: {status ? (status.ok ? `OK (${status.status})` : status.error || `Error (${status.status})`) : 'Checking...'}</p>
        <div className="border rounded-lg overflow-hidden bg-white p-4">
          <img src="/formal.jpg" alt="formal.jpg test" className="w-full h-auto object-contain" />
        </div>
        <p className="mt-4 text-xs text-gray-500">If you see the image above, the asset is served correctly from <code>/formal.jpg</code>.</p>
      </div>
    </main>
  );
}
