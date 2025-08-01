import type { GameState } from '../logic/LifeSimulator';

export interface EventScreenProps {
  gameState: GameState;
  onAdvanceYear: () => void;
  onMakeChoice: (choiceIndex: number) => void;
}

const EventScreen: (props: EventScreenProps) => any;
export default EventScreen;