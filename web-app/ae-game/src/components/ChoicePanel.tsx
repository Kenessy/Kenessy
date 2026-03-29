'use client';

import { Choice } from '@/types/gameState';

interface ChoicePanelProps {
  choices: Choice[];
  onChoice: (index: number) => void;
  disabled?: boolean;
}

export default function ChoicePanel({ choices, onChoice, disabled }: ChoicePanelProps) {
  if (choices.length === 0) return null;

  return (
    <div className="px-6 py-6 max-w-2xl mx-auto w-full border-t border-[var(--panel-border)]">
      <div className="flex flex-col gap-3">
        {choices.map((choice) => (
          <button
            key={choice.index}
            onClick={() => onChoice(choice.index)}
            disabled={disabled}
            className="choice-button text-left px-4 py-3 border border-[var(--accent-red)]
                       bg-[var(--panel-bg)] text-[var(--foreground)] rounded
                       hover:bg-[var(--accent-red)] hover:text-white
                       transition-colors duration-300 text-[14px]
                       disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="text-[var(--accent-red-glow)] mr-2">&gt;</span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
