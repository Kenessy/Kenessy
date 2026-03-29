'use client';

interface TitleScreenProps {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="rim-pulse w-32 h-[1px] bg-[var(--accent-red-glow)] mb-12" />
      <h1 className="text-[var(--foreground)] text-2xl tracking-[0.3em] uppercase mb-2">
        Apocalypse Express
      </h1>
      <p className="text-[var(--muted)] text-sm mb-12 tracking-wider">
        Dead souls. A train through Hell. One chance to come back.
      </p>
      <button
        onClick={onStart}
        className="choice-button px-8 py-4 border border-[var(--accent-red)]
                   bg-[var(--panel-bg)] text-[var(--foreground)] rounded
                   hover:bg-[var(--accent-red)] hover:text-white
                   transition-colors duration-300 text-sm tracking-wider cursor-pointer"
      >
        <span className="text-[var(--accent-red-glow)] mr-2">&gt;</span>
        WAKE UP
      </button>
      <div className="mt-16 flex flex-col items-center gap-2">
        <div className="rim-pulse w-2 h-2 rounded-full bg-[var(--accent-red-glow)]" />
        <p className="text-[var(--muted)] text-xs opacity-40">Section 0 — Null Meridian</p>
      </div>
    </div>
  );
}
