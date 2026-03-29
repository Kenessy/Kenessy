'use client';

import { useEffect, useRef } from 'react';
import { StoryParagraph } from '@/types/gameState';

interface StoryRendererProps {
  paragraphs: StoryParagraph[];
}

export default function StoryRenderer({ paragraphs }: StoryRendererProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [paragraphs.length]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full">
      {paragraphs.map((p, i) => {
        const isSlow = p.tags.includes('slow');
        const isRuleReveal = p.tags.includes('rule_reveal');
        const isOminous = p.tags.includes('ominous');
        const isForeshadow = p.tags.includes('foreshadow');
        const isEmphasis = p.text.startsWith('*') && p.text.endsWith('*');
        const displayText = isEmphasis ? p.text.slice(1, -1) : p.text;

        let className = 'story-paragraph mb-4 leading-relaxed text-[15px]';
        if (isSlow) className += ' slow';
        if (isRuleReveal || isEmphasis) className = 'story-paragraph rule-reveal mb-4 leading-relaxed text-[15px]';
        if (isOminous) className += ' text-[var(--muted)]';
        if (isForeshadow) className += ' text-[var(--accent-gold)]';

        return (
          <p key={p.id} className={className} style={{ animationDelay: `${i * 0.15}s` }}>
            {displayText}
          </p>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
