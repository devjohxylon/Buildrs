'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForumsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/community?tab=forums');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to Community...</p>
      </div>
    </div>
  );
} 