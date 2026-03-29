'use client';

import { useState, useCallback, useRef } from 'react';
import { InkEngine } from '@/engine/inkEngine';
import { StoryParagraph, Choice } from '@/types/gameState';
import TitleScreen from '@/components/TitleScreen';
import SceneHeader from '@/components/SceneHeader';
import StoryRenderer from '@/components/StoryRenderer';
import ChoicePanel from '@/components/ChoicePanel';
import GameEndScreen from '@/components/GameEndScreen';
import storyContent from '@/ink/A1_null_meridian.json';

type GameScreen = 'title' | 'playing' | 'ended';

export default function Home() {
  const [screen, setScreen] = useState<GameScreen>('title');
  const [paragraphs, setParagraphs] = useState<StoryParagraph[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const engineRef = useRef<InkEngine | null>(null);

  const advanceStory = useCallback((engine: InkEngine) => {
    const result = engine.continueStory();
    if (result.paragraphs.length > 0) {
      setParagraphs((prev) => [...prev, ...result.paragraphs]);
    }
    if (result.choices.length > 0) {
      setChoices(result.choices);
    } else if (engine.isEnded) {
      setChoices([]);
      setScreen('ended');
    }
  }, []);

  const handleStart = useCallback(() => {
    const engine = new InkEngine(JSON.stringify(storyContent));
    engineRef.current = engine;
    setParagraphs([]);
    setChoices([]);
    setScreen('playing');
    advanceStory(engine);
  }, [advanceStory]);

  const handleChoice = useCallback((index: number) => {
    const engine = engineRef.current;
    if (!engine || isProcessing) return;
    setIsProcessing(true);
    setChoices([]);
    setTimeout(() => {
      engine.makeChoice(index);
      advanceStory(engine);
      setIsProcessing(false);
    }, 300);
  }, [advanceStory, isProcessing]);

  const handleRestart = useCallback(() => {
    setParagraphs([]);
    setChoices([]);
    setScreen('title');
    engineRef.current = null;
  }, []);

  if (screen === 'title') {
    return (
      <main className="flex-1 flex flex-col min-h-screen">
        <TitleScreen onStart={handleStart} />
      </main>
    );
  }

  if (screen === 'ended') {
    return (
      <main className="flex-1 flex flex-col min-h-screen">
        <SceneHeader sceneName="A1" sceneTitle="Null Meridian Prelude" />
        <StoryRenderer paragraphs={paragraphs} />
        <GameEndScreen onRestart={handleRestart} />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <SceneHeader sceneName="A1" sceneTitle="Null Meridian Prelude" />
      <StoryRenderer paragraphs={paragraphs} />
      <ChoicePanel choices={choices} onChoice={handleChoice} disabled={isProcessing} />
    </main>
  );
}
