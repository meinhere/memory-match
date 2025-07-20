import { useState, useEffect, useCallback } from "react";
import Board from "./components/Board";
import ModalGameOver from "./components/ModalGameOver";
import ModalHome from "./components/ModalHome";
import Timer from "./components/Timer";
import ButtonHome from "./components/ButtonHome";
import ButtonGameMenu from "./components/ButtonGameMenu";
import { shuffleArray } from "./utils/shuffle";
import { themes } from "./utils/themes";
import { defaultTimer, stageLevels } from "./utils/config";
import {
  faHome,
  faRefresh,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [theme, setTheme] = useState("animals");
  const [level, setLevel] = useState(null);
  const [stage, setStage] = useState(1);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [totalMove, setTotalMove] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [timeLeft, setTimeLeft] = useState(defaultTimer);
  const [gameOver, setGameOver] = useState(false);
  const [disableClick, setDisableClick] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState([1, 0, 0]); // 1 -> untuk stage, 0 -> untuk totalMatched, 0 -> untuk totalMove

  const generateCards = useCallback(() => {
    const selectedTheme = themes.find((t) => t.title === theme).icons;
    const pairCount = stageLevels.find((lvl) => (lvl.title = level)).totalCard;
    const selected = shuffleArray(selectedTheme).slice(0, pairCount);
    const double = shuffleArray(
      [...selected, ...selected].map((e, i) => ({ emoji: e, id: i }))
    );
    setCards(double);
    setFlipped([]);
    setMatched([]);
  }, [theme, level]);

  // Baca level saat ini dan mengacak posisi kartu
  useEffect(() => {
    if (level) generateCards();
  }, [level, generateCards]);

  // Stopwatch
  useEffect(() => {
    if (matched.length && matched.length === cards.length) {
      setTimeout(() => {
        setStage((prev) => prev + 1);
        generateCards();
      }, 1000);
    }
  }, [cards, matched, generateCards]);

  // Permainan berakhir atau belum
  useEffect(() => {
    if (!level) return;
    if (timeLeft <= 0) {
      setGameOver(true);
    } else if (!isPaused) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, level, isPaused, highScore, stage, totalMove]);

  const handleCardClick = (index) => {
    if (disableClick || flipped.includes(index) || matched.includes(index))
      return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisableClick(true);
      setTotalMove((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setTotalMatched((prev) => prev + 1);
        setFlipped([]);
        setDisableClick(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  };

  const handlePauseClick = () => {
    setDisableClick(!isPaused);
    setIsPaused(!isPaused);
  };

  const handleRestartClick = () => {
    setStage(1);
    setTotalMove(0);
    setTotalMatched(0);
    setTimeLeft(defaultTimer);
    setGameOver(false);
    setCards([]);
    setMatched([]);
    setFlipped([]);

    if (level) generateCards();
  };

  const resetGame = () => {
    if (
      totalMatched > highScore[1] ||
      (totalMatched == highScore[1] && totalMove < highScore[2])
    )
      setHighScore([stage, totalMatched, totalMove]);

    handleRestartClick();
    setLevel(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center font-primary tracking-widest">
      {!level ? (
        <div className="text-center mt-30 px-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-10 text-blue">
            Memory Match Game
          </h1>
          <div>
            <ButtonHome
              title="Mulai Permainan"
              onClick={() => setShowModal("Mulai")}
            />
            <ButtonHome
              title="Skor Tertinggi"
              onClick={() => setShowModal("Skor Tertinggi")}
            />
            <ButtonHome
              title="Tema Permainan"
              onClick={() => setShowModal("Tema")}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-full max-w-2xl mt-10 mb-3 px-14">
            <div className="text-xl font-semibold text-blue">
              <p className="mb-1">
                {level.toUpperCase()} - Stage {stage}
              </p>
              <p className="mb-1">
                Total Langkah: <span className="text-lg">{totalMove}</span>
              </p>
              <p className="mb-1">
                Total Pasang Kartu:{" "}
                <span className="text-lg">{totalMatched}</span>
              </p>
            </div>

            <div className="text-xl font-semibold text-blue">
              <Timer timeLeft={timeLeft} />

              <div className="flex gap-2 mt-3">
                <ButtonGameMenu
                  icon={faHome}
                  onClickAction={resetGame}
                  onPaused={isPaused}
                  title="home"
                />
                <ButtonGameMenu
                  icon={faRefresh}
                  onClickAction={handleRestartClick}
                  onPaused={isPaused}
                  title="refresh"
                />
                <ButtonGameMenu
                  icon={!isPaused ? faPause : faPlay}
                  onClickAction={handlePauseClick}
                  onPaused={isPaused}
                  title="pause"
                />
              </div>
            </div>
          </div>

          <Board
            cards={cards}
            flippedCards={flipped}
            matchedCards={matched}
            onCardClick={handleCardClick}
          />

          {isPaused && (
            <div className="bg-white p-6 shadow-xl text-center border-3 border-blue absolute top-60">
              <h2 className="text-2xl font-bold mb-4">Permainan Dijeda</h2>
              <p className="mb-4 text-blue">
                Permainan sedang dijeda! Tekan{" "}
                <span className="font-semibold">tombol play</span> untuk
                melanjutkan.
              </p>
            </div>
          )}
        </>
      )}

      {gameOver && (
        <ModalGameOver
          stage={stage}
          totalMove={totalMove}
          totalMatched={totalMatched}
          onRestart={handleRestartClick}
          onReset={resetGame}
          faRefresh={faRefresh}
          faHome={faHome}
        />
      )}

      {showModal && (
        <ModalHome
          showModal={showModal}
          onShowModal={setShowModal}
          onLevel={setLevel}
          theme={theme}
          onTheme={setTheme}
          themes={themes}
          highScore={highScore}
        />
      )}
    </div>
  );
}

export default App;
