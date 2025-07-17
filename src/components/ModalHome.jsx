import ButtonHomePlay from "./ButtonHomePlay";
import ButtonHomeTheme from "./ButtonHomeTheme";

function ModalHome({
  showModal,
  onShowModal,
  onLevel,
  theme,
  onTheme,
  themes,
  highScore,
}) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/70 ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 shadow-xl text-center border-3 border-blue relative">
        <button
          className="absolute top-1 right-1 px-2 text-xl text-blue font-bold border-3 border-blue hover:bg-blue hover:text-white cursor-pointer"
          onClick={() => onShowModal(null)}
          aria-label="Close"
        >
          &times;
        </button>
        {showModal == "Mulai" ? (
          <div className="min-w-[300px] mt-5 mb-4">
            <h2 className="text-2xl font-bold text-blue mb-5 mt-3">
              Pilih Level Kesulitan
            </h2>

            <div>
              <ButtonHomePlay
                level="mudah"
                onLevel={onLevel}
                onShowModal={onShowModal}
              />
              <ButtonHomePlay
                level="sedang"
                onLevel={onLevel}
                onShowModal={onShowModal}
              />
              <ButtonHomePlay
                level="sulit"
                onLevel={onLevel}
                onShowModal={onShowModal}
              />
            </div>
          </div>
        ) : showModal == "Skor Tertinggi" ? (
          <div className="min-w-[300px] mt-5 mb-4">
            <h2 className="text-2xl font-bold text-blue mb-5 mt-3">
              Skor Tertinggi
            </h2>

            {highScore[0] != 1 && highScore[1] != 0 && highScore[2] == 0 ? (
              <span className="text-lg mb-4 text-blue italic font-semibold">
                Skor masih kosong! silahkan mulai permainan..
              </span>
            ) : (
              <>
                <h3 className="text-xl text-blue font-semibold mb-4">
                  Stage {highScore[0] > 1 ? highScore[0] - 1 : highScore[0]} (
                  {highScore[1]} Pasang Kartu)
                </h3>
                <p className="mb-2 text-blue">Total langkah yang dilakukan:</p>
                <h3 className="text-xl text-blue font-semibold mb-4">
                  {highScore[2]} langkah
                </h3>
              </>
            )}
          </div>
        ) : (
          <div className="min-w-[300px] mt-5 mb-4">
            <h2 className="text-2xl font-bold text-blue mb-5 mt-3">
              Pilih Tema Permainan
            </h2>

            <div>
              <ButtonHomeTheme
                onShowModal={onShowModal}
                themeValue="animals"
                theme={theme}
                themeList={themes.find((t) => t.title === "animals").icons}
                onTheme={onTheme}
              >
                Binatang
              </ButtonHomeTheme>
              <ButtonHomeTheme
                onShowModal={onShowModal}
                themeValue="fruits"
                theme={theme}
                themeList={themes.find((t) => t.title === "fruits").icons}
                onTheme={onTheme}
              >
                Buah
              </ButtonHomeTheme>
              <ButtonHomeTheme
                onShowModal={onShowModal}
                themeValue="emojis"
                theme={theme}
                themeList={themes.find((t) => t.title === "emojis").icons}
                onTheme={onTheme}
              >
                Emoji
              </ButtonHomeTheme>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ModalHome;
