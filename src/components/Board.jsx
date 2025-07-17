import Card from "./Card";

function Board({ cards, flippedCards, matchedCards, onCardClick }) {
  return (
    <div
      className={`grid gap-4 mt-2 ${
        cards.length === 16
          ? "grid-cols-4"
          : cards.length === 24
          ? "grid-cols-6"
          : "grid-cols-6"
      }`}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(index)}
          isMatched={matchedCards.includes(index)}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}
export default Board;
