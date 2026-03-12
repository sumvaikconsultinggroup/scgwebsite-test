'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        <span className="bg-gradient-to-r from-cyan via-purple to-pink bg-clip-text text-transparent">
          Oops!
        </span>
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Something went wrong loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
