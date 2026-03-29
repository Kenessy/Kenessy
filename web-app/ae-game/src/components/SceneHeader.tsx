'use client';

interface SceneHeaderProps {
  sceneName: string;
  sceneTitle: string;
}

export default function SceneHeader({ sceneName, sceneTitle }: SceneHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-[var(--panel-border)] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rim-pulse w-2 h-2 rounded-full bg-[var(--accent-red-glow)]" />
        <div>
          <span className="text-[var(--muted)] text-xs tracking-widest uppercase">{sceneName}</span>
          <h1 className="text-[var(--foreground)] text-sm font-normal">{sceneTitle}</h1>
        </div>
      </div>
      <div className="text-[var(--muted)] text-xs tracking-wider">APOCALYPSE EXPRESS</div>
    </header>
  );
}
