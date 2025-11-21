"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="auto-container">
        <div className="error-content text-center">
          <h1>Something went wrong!</h1>
          <p>We apologize for the inconvenience. Please try again.</p>
          {error.digest && (
            <p className="error-digest">Error ID: {error.digest}</p>
          )}
          <div className="error-buttons">
            <button
              onClick={() => reset()}
              className="theme-btn btn-style-one me-3"
            >
              Try Again
            </button>
            <Link href="/" className="theme-btn btn-style-two">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

