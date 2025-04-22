import React from 'react';
import talents from '../data/talents';

const StartScreen = ({ gameState, onTalentSelect, onTalentRemove, onStart }) => {
  const { selectedTalents, talentPoints } = gameState;

  // Check if a talent is selected
  const isTalentSelected = (talentId) => {
    return selectedTalents.some(talent => talent.id === talentId);
  };

  // Handle talent card click
  const handleTalentClick = (talentId) => {
    if (isTalentSelected(talentId)) {
      onTalentRemove(talentId);
    } else {
      onTalentSelect(talentId);
    }
  };

  return (
    <div className="start-screen">
      <h2>选择你的天赋</h2>
      <p className="talent-points">剩余天赋点: {talentPoints}</p>

      <div className="talent-selection">
        {talents.map(talent => (
          <div
            key={talent.id}
            className={`talent-card ${isTalentSelected(talent.id) ? 'selected' : ''}`}
            onClick={() => handleTalentClick(talent.id)}
          >
            <h3><i className="fas fa-crown"></i> {talent.name}</h3>
            <p>{talent.description}</p>
            <div className="talent-effects">
              {Object.entries(talent.effects).map(([attribute, value]) => (
                <div key={attribute} className="talent-effect">
                  {attribute}: {value > 0 ? `+${value}` : value}
                </div>
              ))}
            </div>
            <div className="talent-cost">消耗点数: {talent.cost}</div>
          </div>
        ))}
      </div>

      {selectedTalents.length > 0 && (
        <div className="selected-talents">
          <h3>已选天赋</h3>
          <ul>
            {selectedTalents.map(talent => (
              <li key={talent.id}>
                {talent.name} - {talent.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="start-button"
        onClick={onStart}
        disabled={selectedTalents.length === 0}
      >
        开始人生
      </button>
    </div>
  );
};

export default StartScreen;
