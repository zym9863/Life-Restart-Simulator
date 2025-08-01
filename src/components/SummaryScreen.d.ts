import type { Attributes, Talent } from '../logic/LifeSimulator';

export interface SummaryItem {
  age: number;
  event: string;
  description: string;
  choice?: string;
}

export interface LifeSummary {
  age: number;
  events: SummaryItem[];
  attributes: Attributes;
  talents: Talent[];
  score: number;
}

export interface SummaryScreenProps {
  summary: LifeSummary;
  onRestart: () => void;
}

const SummaryScreen: (props: SummaryScreenProps) => any;
export default SummaryScreen;