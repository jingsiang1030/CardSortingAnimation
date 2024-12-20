// PlayingCard.js
import React from 'react';

const PlayingCard = ({ card, style, isFlipped }) => (
  <div
    className="card"
    style={{
      ...style,
      transform: `${style.transform} ${isFlipped ? 'rotateY(180deg)' : ''}`,
      transition: style.transition || 'all 0.5s ease'
    }}
  >
    <div className="card-face card-back"></div>
    <div className={`card-face card-front ${card.color}`}>
      <span className="card-value">{card.value}</span>
      <span className="card-suit">{card.suit}</span>
    </div>
  </div>
);

export default PlayingCard;
