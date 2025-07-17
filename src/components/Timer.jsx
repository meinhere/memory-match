function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div className="text-right">
      ⏱️ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
export default Timer;
