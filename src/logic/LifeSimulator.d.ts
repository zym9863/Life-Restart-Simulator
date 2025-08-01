export type Stage = 'childhood' | 'adolescence' | 'adulthood' | 'oldAge';

export interface Attributes {
  age: number;
  health: number;
  intelligence: number;
  charm: number;
  wealth: number;
  happiness: number;
  stress: number;
  family: number;
  study: number;
  career: number;
  relationship: number;
  marriage: number;
  children: number;
  luck: number;
  willpower: number;
  creativity: number;
  independence: number;
  talent: number;
  [key: string]: number;
}

export interface EffectRange {
  min?: number;
  max?: number;
}

export type Effects = Record<string, number | EffectRange>;

export interface Talent {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: Effects;
}

export interface EventChoice {
  text: string;
  effects?: Effects;
}

export interface LifeEvent {
  id: string;
  name: string;
  description: string;
  stage: Stage;
  probability?: number;
  requirements?: Record<string, { min?: number; max?: number; equal?: number }>;
  effects: Effects;
  choices?: EventChoice[];
}

export interface SummaryItem {
  age: number;
  event: string;
  description: string;
  choice?: string;
}

export interface GameState {
  attributes: Attributes;
  currentEvent: (LifeEvent & { age?: number }) | null;
  currentStage: Stage;
  isGameOver: boolean;
  selectedTalents: Talent[];
  talentPoints: number;
}

export default class LifeSimulator {
  attributes: Attributes;
  stages: Record<Stage, { min: number; max: number }>;
  selectedTalents: Talent[];
  lifeEvents: (LifeEvent & { age: number })[];
  currentEvent: LifeEvent | null;
  isGameOver: boolean;
  talentPoints: number;
  summary: SummaryItem[];

  constructor();
  reset(): void;
  getCurrentStage(): Stage;
  selectTalent(talentId: string): boolean;
  removeTalent(talentId: string): boolean;
  applyEffects(effects: Effects): void;
  revertEffects(effects: Effects): void;
  checkRequirements(requirements: Record<string, { min?: number; max?: number; equal?: number }>): boolean;
  getEligibleEvents(): LifeEvent[];
  generateRandomEvent(): LifeEvent | null;
  advanceYear(): GameState;
  makeChoice(choiceIndex: number): GameState;
  getGameState(): GameState;
  getLifeSummary(): {
    age: number;
    events: SummaryItem[];
    attributes: Attributes;
    talents: Talent[];
    score: number;
  };
}