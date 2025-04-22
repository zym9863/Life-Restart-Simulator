import React from 'react';

const SummaryScreen = ({ summary, onRestart }) => {
  const { age, events, attributes, talents, score } = summary;

  // Get life evaluation based on score
  const getLifeEvaluation = (score) => {
    if (score >= 150) return '传奇人生';
    if (score >= 120) return '辉煌人生';
    if (score >= 100) return '成功人生';
    if (score >= 80) return '幸福人生';
    if (score >= 60) return '平凡人生';
    if (score >= 40) return '坎坷人生';
    return '悲惨人生';
  };

  // Display attributes that are relevant to the player
  const displayAttributes = [
    { key: 'health', label: '健康' },
    { key: 'intelligence', label: '智力' },
    { key: 'charm', label: '魅力' },
    { key: 'wealth', label: '财富' },
    { key: 'happiness', label: '幸福' },
    { key: 'family', label: '家庭' },
    { key: 'career', label: '事业' }
  ];

  if (attributes.children > 0) {
    displayAttributes.push({ key: 'children', label: '子女' });
  }

  return (
    <div className="summary-screen">
      <h2 className="summary-title">人生总结</h2>
      <p><i className="fas fa-hourglass-end"></i> 你活到了 {age} 岁</p>
      <div className="life-score">
        <div><i className="fas fa-medal"></i> 人生评价: {getLifeEvaluation(score)}</div>
        <div><i className="fas fa-star"></i> 最终得分: {score}</div>
      </div>

      <div className="summary-section">
        <h3>最终属性</h3>
        <div className="attributes-panel">
          {displayAttributes.map(attr => (
            <div key={attr.key} className="attribute">
              <div className="attribute-name">{attr.label}</div>
              <div className="attribute-value">{attributes[attr.key]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="summary-section">
        <h3>天赋</h3>
        <ul>
          {talents.map(talent => (
            <li key={talent.id}>{talent.name} - {talent.description}</li>
          ))}
        </ul>
      </div>

      <div className="summary-section">
        <h3>人生大事记</h3>
        <div className="life-events">
          {events.map((event, index) => (
            <div key={index} className="life-event">
              <span className="life-event-age">{event.age}岁:</span> {event.event} - {event.description}
              {event.choice && <div className="life-event-choice">选择: {event.choice}</div>}
            </div>
          ))}
        </div>
      </div>

      <button className="restart-button" onClick={onRestart}>
        重开人生
      </button>
    </div>
  );
};

export default SummaryScreen;
