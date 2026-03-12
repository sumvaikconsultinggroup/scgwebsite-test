'use client';

export default function SectionDivider({ variant = 'default' }) {
  if (variant === 'diamond') {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-gray-800" />
        <div className="mx-6 w-3 h-3 rotate-45 border border-cyan/30 bg-cyan/5" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-800 to-gray-800" />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className="py-8">
        <div className="animated-gradient-line" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="section-divider" />
    </div>
  );
}
