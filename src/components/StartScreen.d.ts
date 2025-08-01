import type { GameState } from '../logic/LifeSimulator';

export interface StartScreenProps {
  gameState: GameState;
  onTalentSelect: (talentId: string) => void;
  onTalentRemove: (talentId: string) => void;
  onStart: () => void;
}

const StartScreen: (props: StartScreenProps) => any;
export default StartScreen;