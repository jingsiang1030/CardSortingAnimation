// CardSortingAnimation.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { generateDeck } from './deck';
import PlayingCard from './PlayingCard';

const CardSortingAnimation = () => {
  const phaseGroups = {
    stage1: {
      phases: {
        initial: { label: '準備開始', duration: 1000 },
        shuffle: { label: '洗牌', duration: 3000 },
        spread: { label: '開牌', duration: 1500 },
        sort: { label: '排序', duration: 8000 },
        fan: { label: '展示', duration: 2000 },
      },
      sortLogic: (a, b) => {
        const suitOrder = { '♣': 0, '♦': 1, '♥': 2, '♠': 3 };
        const valueOrder = { 'K': 1, 'Q': 2, 'J': 3, '10': 4, '9': 5, '8': 6, '7': 7,
                          '6': 8, '5': 9, '4': 10, '3': 11, '2': 12, 'A': 13 };
        if (suitOrder[a.suit] !== suitOrder[b.suit]) {
          return suitOrder[a.suit] - suitOrder[b.suit];
        }
        return valueOrder[a.value] - valueOrder[b.value];
      }
    },
    stage2: {
      phases: {
        initial: { label: '準備開始', duration: 1000 },
        shuffle: { label: '洗牌', duration: 3000 },
        spread: { label: '開牌', duration: 1500 },
        sort: { label: '重新排序', duration: 8000 },
        fan: { label: '展示', duration: 2000 }
      },
      sortLogic: (a, b) => {
        const valueOrder = {
          'K': 1, 'Q': 2, 'J': 3, '10': 4, '9': 5, '8': 6, '7': 7,
          '6': 8, '5': 9, '4': 10, '3': 11, '2': 12, 'A': 13
        };
        const suitOrder = { '♦': 0, '♣': 1, '♠': 2, '♥': 3 };
        if (valueOrder[a.value] !== valueOrder[b.value]) {
          return valueOrder[a.value] - valueOrder[b.value];
        }
        return suitOrder[a.suit] - suitOrder[b.suit];
      }
    }
  };

  const [deck, setDeck] = useState(generateDeck());
  const [currentStage, setCurrentStage] = useState(null);
  const [phase, setPhase] = useState('initial');
  const [positions, setPositions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || !currentStage) return;

    const phases = Object.keys(phaseGroups[currentStage].phases);
    const currentPhaseIndex = phases.indexOf(phase);

    const timer = setTimeout(() => {
      if (currentPhaseIndex < phases.length - 1) {
        setPhase(phases[currentPhaseIndex + 1]);
      } else {
        setIsPlaying(false);
      }
    }, phaseGroups[currentStage].phases[phase].duration);

    return () => clearTimeout(timer);
  }, [phase, isPlaying, currentStage]);

  const handleStageStart = (stage) => {
    setCurrentStage(stage);
    setPhase('initial');
    setDeck(generateDeck());
    setIsPlaying(true);
  };

  return (
    <div className="container">
      <div className="controls">
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          撲克牌的舞會
        </div>
        <div className="status">
          {currentStage && `當前階段：${phaseGroups[currentStage].phases[phase]?.label}`}
        </div>
        <div className="buttons" style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleStageStart('stage1')} 
            disabled={isPlaying}
            className="stage-button"
          >
            階段一：花色排序
          </button>
          <button 
            onClick={() => handleStageStart('stage2')} 
            disabled={isPlaying}
            className="stage-button"
          >
            階段二：數字排序
          </button>
        </div>
      </div>
      {deck.map((card, index) => (
        <PlayingCard
          key={`${card.suit}${card.value}`}
          card={card}
          style={positions[index] || {}}
        />
      ))}
    </div>
  );
};

ReactDOM.render(<CardSortingAnimation />, document.getElementById('root'));
