// ============================================
// Apocalypse Express — Core Game State Types
// ============================================

/** Soul Index — ancestry slot */
export type SoulIndex = 'Boiler' | 'Crown' | 'Maw' | 'Mirror';

/** Body Tag — mechanical tag */
export type BodyTag = 'FLESH' | 'STEEL';

/** Injury severity */
export type InjurySeverity = 'minor' | 'major';

export interface Injury {
  id: string;
  name: string;
  severity: InjurySeverity;
  lane: string; // e.g. "STR-1", "DEX-2"
  description: string;
}

/** Inventory item */
export interface InventoryItem {
  id: string;
  name: string;
  category: 'camp_supplies' | 'consumable' | 'weapon' | 'armor' | 'gear' | 'salvage' | 'relic';
  bulkLoad: number; // BL cost
  description: string;
  quantity: number;
}

/** Scene flag — tracks narrative state */
export interface SceneFlags {
  [key: string]: boolean | string | number;
}

/** Story paragraph — a single piece of displayed text */
export interface StoryParagraph {
  id: string;
  text: string;
  tags: string[];
  isChoice?: boolean;
}

/** Choice option presented to the player */
export interface Choice {
  index: number;
  text: string;
}

/** Game phase tracks where the player is in the campaign */
export type GamePhase =
  | 'null_meridian'    // A1-A5: Dead souls, no systems
  | 'revival'          // B1: Waking in bodies
  | 'surface'          // B2+: Full systems active
  ;

/** Systems that can be ON or OFF depending on game phase */
export interface SystemStates {
  hp: boolean;
  chaosDrift: boolean;
  harmony: boolean;
  injuries: boolean;
  inventory: boolean;
  currencies: boolean;
  skills: boolean;
}

/** The master game state */
export interface GameState {
  // --- Narrative ---
  currentScene: string;
  phase: GamePhase;
  flags: SceneFlags;
  storyHistory: StoryParagraph[];
  currentChoices: Choice[];

  // --- Character (only relevant after Revival) ---
  characterName: string;
  soulIndex: SoulIndex | null;
  bodyTag: BodyTag | null;
  className: string | null;
  level: number;

  // --- Systems ---
  systems: SystemStates;
  hp: { current: number; max: number };
  chaosDrift: number;       // 0-100
  harmonyLevel: number;     // 0-10
  campSupplies: number;
  soulDebt: number;
  injuries: Injury[];
  inventory: InventoryItem[];

  // --- Currencies ---
  grains: number;   // gr
  rounds: number;   // rd
  golds: number;    // gd
  plugs: number;    // PLUG
  stamps: number;   // ST

  // --- Meta ---
  sessionStarted: boolean;
  lastSaved: string | null;
}

/** Default state for a new game */
export const DEFAULT_GAME_STATE: GameState = {
  currentScene: 'A1',
  phase: 'null_meridian',
  flags: {},
  storyHistory: [],
  currentChoices: [],

  characterName: '',
  soulIndex: null,
  bodyTag: null,
  className: null,
  level: 0,

  systems: {
    hp: false,
    chaosDrift: false,
    harmony: false,
    injuries: false,
    inventory: false,
    currencies: false,
    skills: false,
  },
  hp: { current: 0, max: 0 },
  chaosDrift: 0,
  harmonyLevel: 0,
  campSupplies: 0,
  soulDebt: 0,
  injuries: [],
  inventory: [],

  grains: 0,
  rounds: 0,
  golds: 0,
  plugs: 0,
  stamps: 0,

  sessionStarted: false,
  lastSaved: null,
};
