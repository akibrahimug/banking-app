"use client";
import ErrorState from "@/components/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="p-6">
          <ErrorState
            title="Unexpected error"
            message={
              error?.message || "Something went wrong. Please try again."
            }
            retryHref="/"
          />
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => reset()}
              className="text-14 rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
