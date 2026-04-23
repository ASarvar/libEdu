'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ForbiddenPage() {
  useEffect(() => {
    document.title = 'Kirish Ruxsati Rad Etildi - 403';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Bu sahifaga kirish ruxsati yo\'q.');
  }, []);

  return (
    <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-200">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this resource.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
    </Layout>
  );
}
