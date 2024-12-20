// deck.js
export const generateDeck = () => {
    const suits = [
      { symbol: '♠', name: 'spade', color: 'black' },
      { symbol: '♥', name: 'heart', color: 'red' },
      { symbol: '♦', name: 'diamond', color: 'red' },
      { symbol: '♣', name: 'club', color: 'black' }
    ];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
    const deck = [];
    suits.forEach(suit => {
      values.forEach(value => {
        deck.push({ suit: suit.symbol, value, color: suit.color });
      });
    });
    return deck;
  };
  