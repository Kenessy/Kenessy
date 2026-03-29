'use client';

interface GameEndScreenProps {
  onRestart: () => void;
}

export default function GameEndScreen({ onRestart }: GameEndScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="rim-pulse w-3 h-3 rounded-full bg-[var(--accent-red-glow)] mb-6" />
      <h2 className="text-[var(--accent-gold)] text-lg mb-2">Scene Complete</h2>
      <p className="text-[var(--muted)] text-sm mb-8 max-w-md">
        The Null Meridian has served its purpose. The Obelisk awaits.
      </p>
      <button
        onClick={onRestart}
        className="choice-button px-6 py-3 border border-[var(--accent-red)]
                   bg-[var(--panel-bg)] text-[var(--foreground)] rounded
                   hover:bg-[var(--accent-red)] hover:text-white
                   transition-colors duration-300 text-sm cursor-pointer"
      >
        <span className="text-[var(--accent-red-glow)] mr-2">&gt;</span>
        Begin Again
      </button>
      <p className="text-[var(--muted)] text-xs mt-8 opacity-50">
        Scene A2 — Obelisk, Clock &amp; Postcards — coming soon
      </p>
    </div>
  );
}
