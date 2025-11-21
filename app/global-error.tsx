"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Something went wrong!</h1>
          <p>A critical error occurred. Please try refreshing the page.</p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            aria-label="Try again"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

