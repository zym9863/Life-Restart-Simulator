import { useState, useEffect } from 'react'
import './App.css'
import LifeSimulator from './logic/LifeSimulator'
import StartScreen from './components/StartScreen'
import EventScreen from './components/EventScreen'
import SummaryScreen from './components/SummaryScreen'

function App() {
  // Game states
  const [gameState, setGameState] = useState(null);
  const [screen, setScreen] = useState('start'); // 'start', 'event', 'summary'
  const [simulator] = useState(new LifeSimulator());

  // Initialize game state
  useEffect(() => {
    setGameState(simulator.getGameState());
  }, [simulator]);

  // Start the game with selected talents
  const startGame = () => {
    setScreen('event');
  };

  // Handle talent selection
  const handleTalentSelect = (talentId) => {
    simulator.selectTalent(talentId);
    setGameState(simulator.getGameState());
  };

  // Handle talent removal
  const handleTalentRemove = (talentId) => {
    simulator.removeTalent(talentId);
    setGameState(simulator.getGameState());
  };

  // Advance to next year
  const advanceYear = () => {
    const newState = simulator.advanceYear();
    setGameState(newState);

    if (newState.isGameOver) {
      setScreen('summary');
    }
  };

  // Make a choice for current event
  const makeChoice = (choiceIndex) => {
    const newState = simulator.makeChoice(choiceIndex);
    setGameState(newState);
  };

  // Restart the game
  const restartGame = () => {
    simulator.reset();
    setGameState(simulator.getGameState());
    setScreen('start');
  };

  // Render appropriate screen based on game state
  return (
    <div className="app">
      <header className="app-header">
        <h1>人生重开模拟器</h1>
        <h2>Life Restart Simulator</h2>
      </header>

      {screen === 'start' && gameState && (
        <StartScreen
          gameState={gameState}
          onTalentSelect={handleTalentSelect}
          onTalentRemove={handleTalentRemove}
          onStart={startGame}
        />
      )}

      {screen === 'event' && gameState && (
        <EventScreen
          gameState={gameState}
          onAdvanceYear={advanceYear}
          onMakeChoice={makeChoice}
        />
      )}

      {screen === 'summary' && gameState && (
        <SummaryScreen
          summary={simulator.getLifeSummary()}
          onRestart={restartGame}
        />
      )}
    </div>
  )
}

export default App
