import React from 'react';

const EventScreen = ({ gameState, onAdvanceYear, onMakeChoice }) => {
  const { attributes, currentEvent, currentStage } = gameState;

  // Display attributes that are relevant to the player
  const displayAttributes = [
    { key: 'age', label: '年龄' },
    { key: 'health', label: '健康' },
    { key: 'intelligence', label: '智力' },
    { key: 'charm', label: '魅力' },
    { key: 'wealth', label: '财富' },
    { key: 'happiness', label: '幸福' },
    { key: 'stress', label: '压力' },
    { key: 'family', label: '家庭' }
  ];

  // Additional attributes based on life stage
  if (currentStage === 'childhood' || currentStage === 'adolescence') {
    displayAttributes.push({ key: 'study', label: '学习' });
  }

  if (currentStage === 'adulthood' || currentStage === 'oldAge') {
    displayAttributes.push({ key: 'career', label: '事业' });

    if (attributes.relationship > 0) {
      displayAttributes.push({ key: 'relationship', label: '感情' });
    }

    if (attributes.marriage > 0) {
      displayAttributes.push({ key: 'marriage', label: '婚姻' });
    }

    if (attributes.children > 0) {
      displayAttributes.push({ key: 'children', label: '子女' });
    }
  }

  // Get stage name in Chinese
  const getStageNameChinese = (stage) => {
    const stageNames = {
      childhood: '童年',
      adolescence: '青少年',
      adulthood: '成年',
      oldAge: '老年'
    };
    return stageNames[stage] || stage;
  };

  return (
    <div className="event-screen">
      <div className="age-display">
        年龄: {attributes.age} ({getStageNameChinese(currentStage)})
      </div>

      <div className="attributes-panel">
        {displayAttributes.map(attr => (
          <div key={attr.key} className="attribute">
            <div className="attribute-name" data-attr={attr.key}>{attr.label}</div>
            <div className="attribute-value">{attributes[attr.key]}</div>
          </div>
        ))}
      </div>

      {currentEvent ? (
        <div className="event-card">
          <h3 className="event-title">{currentEvent.name}</h3>
          <p className="event-description">{currentEvent.description}</p>

          {currentEvent.choices && currentEvent.choices.length > 0 ? (
            <div className="event-choices">
              <h4>做出选择:</h4>
              {currentEvent.choices.map((choice, index) => (
                <button
                  key={index}
                  className="choice-button"
                  onClick={() => onMakeChoice(index)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <button className="next-year-button" onClick={onAdvanceYear}>
              继续
            </button>
          )}
        </div>
      ) : (
        <button className="next-year-button" onClick={onAdvanceYear}>
          进入下一年
        </button>
      )}
    </div>
  );
};

export default EventScreen;
