'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#050510] text-white">
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8 text-center max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-black rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
