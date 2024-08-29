'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-4">The page you&aposre looking for doesn&apost exist or has been moved.</p>
      <Link href="/" className="text-blue-500 hover:text-blue-600 underline">
        Go back home
      </Link>
    </div>
  );
}