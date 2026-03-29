// ============================================
// Apocalypse Express — Zustand Game Store
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GameState,
  DEFAULT_GAME_STATE,
  StoryParagraph,
  Choice,
  GamePhase,
} from '@/types/gameState';

interface GameActions {
  // --- Narrative ---
  addParagraph: (paragraph: StoryParagraph) => void;
  setChoices: (choices: Choice[]) => void;
  setScene: (scene: string) => void;
  setFlag: (key: string, value: boolean | string | number) => void;
  getFlag: (key: string) => boolean | string | number | undefined;
  setPhase: (phase: GamePhase) => void;

  // --- Systems ---
  enableSystem: (system: keyof GameState['systems']) => void;
  disableSystem: (system: keyof GameState['systems']) => void;

  // --- Resources ---
  updateHP: (current: number, max?: number) => void;
  updateChaosDrift: (value: number) => void;
  updateHarmony: (value: number) => void;
  updateCampSupplies: (delta: number) => void;

  // --- Meta ---
  startNewGame: () => void;
  saveGame: () => void;
  clearHistory: () => void;
}

export type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_GAME_STATE,

      // --- Narrative ---
      addParagraph: (paragraph) =>
        set((state) => ({
          storyHistory: [...state.storyHistory, paragraph],
        })),

      setChoices: (choices) => set({ currentChoices: choices }),

      setScene: (scene) => set({ currentScene: scene }),

      setFlag: (key, value) =>
        set((state) => ({
          flags: { ...state.flags, [key]: value },
        })),

      getFlag: (key) => get().flags[key],

      setPhase: (phase) => set({ phase }),

      // --- Systems ---
      enableSystem: (system) =>
        set((state) => ({
          systems: { ...state.systems, [system]: true },
        })),

      disableSystem: (system) =>
        set((state) => ({
          systems: { ...state.systems, [system]: false },
        })),

      // --- Resources ---
      updateHP: (current, max) =>
        set((state) => ({
          hp: { current, max: max ?? state.hp.max },
        })),

      updateChaosDrift: (value) =>
        set({ chaosDrift: Math.max(0, Math.min(100, value)) }),

      updateHarmony: (value) =>
        set({ harmonyLevel: Math.max(0, Math.min(10, value)) }),

      updateCampSupplies: (delta) =>
        set((state) => ({
          campSupplies: Math.max(0, state.campSupplies + delta),
        })),

      // --- Meta ---
      startNewGame: () =>
        set({
          ...DEFAULT_GAME_STATE,
          sessionStarted: true,
        }),

      saveGame: () =>
        set({ lastSaved: new Date().toISOString() }),

      clearHistory: () =>
        set({ storyHistory: [], currentChoices: [] }),
    }),
    {
      name: 'ae-game-save',
      partialize: (state) => {
        // Don't persist transient UI state
        const { currentChoices, ...rest } = state;
        return rest;
      },
    }
  )
);
