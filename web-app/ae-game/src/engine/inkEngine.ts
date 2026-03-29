// ============================================
// Apocalypse Express — Ink Runtime Wrapper
// ============================================

import { Story } from 'inkjs';
import { StoryParagraph, Choice } from '@/types/gameState';

/** Parse tags from an Ink line */
function parseTags(tags: string[] | null): string[] {
  if (!tags) return [];
  return tags.map((t) => t.trim());
}

/** Generate a unique paragraph ID */
let paragraphCounter = 0;
function nextId(): string {
  return `p_${Date.now()}_${paragraphCounter++}`;
}

export class InkEngine {
  private story: Story;

  constructor(inkJsonContent: string) {
    this.story = new Story(inkJsonContent);
  }

  /** Bind an external function the Ink story can call */
  bindExternalFunction(name: string, fn: (...args: unknown[]) => unknown): void {
    this.story.BindExternalFunction(name, fn);
  }

  /** Get the current value of an Ink variable */
  getVariable(name: string): unknown {
    return this.story.variablesState.$(name);
  }

  /** Set an Ink variable from the game engine */
  setVariable(name: string, value: string | number | boolean): void {
    this.story.variablesState.$(name, value);
  }

  /** Continue the story, collecting all paragraphs until a choice point or end */
  continueStory(): { paragraphs: StoryParagraph[]; choices: Choice[]; canContinue: boolean } {
    const paragraphs: StoryParagraph[] = [];

    while (this.story.canContinue) {
      const text = this.story.Continue();
      if (!text || text.trim() === '') continue;

      const tags = parseTags(this.story.currentTags);

      paragraphs.push({
        id: nextId(),
        text: text.trim(),
        tags,
      });
    }

    const choices: Choice[] = this.story.currentChoices.map((c, i) => ({
      index: i,
      text: c.text,
    }));

    return {
      paragraphs,
      choices,
      canContinue: this.story.canContinue,
    };
  }

  /** Select a choice by index */
  makeChoice(index: number): void {
    this.story.ChooseChoiceIndex(index);
  }

  /** Check if the story has ended */
  get isEnded(): boolean {
    return !this.story.canContinue && this.story.currentChoices.length === 0;
  }

  /** Get current global tags */
  get globalTags(): string[] {
    return this.story.globalTags ?? [];
  }

  /** Save story state */
  saveState(): string {
    return this.story.state.toJson();
  }

  /** Load story state */
  loadState(json: string): void {
    this.story.state.LoadJson(json);
  }
}
