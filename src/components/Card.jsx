function Card({ card, onClick, isFlipped, isMatched }) {
  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 border-2 cursor-pointer shadow-md flex items-center justify-center text-2xl font-bold transition-transform duration-300 ${
        isMatched ? "bg-green-300 border-green-700" : "bg-white border-blue"
      }`}
      onClick={onClick}
    >
      {isFlipped || isMatched ? card.emoji : "❓"}
    </div>
  );
}
export default Card;
