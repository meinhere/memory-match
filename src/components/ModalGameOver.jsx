import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalGameOver({
  stage,
  totalMove,
  totalMatched,
  onRestart,
  onReset,
  faRefresh,
  faHome,
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/70">
      <div className="bg-white p-6 shadow-xl text-center border-3 text-blue border-blue relative">
        <h2 className="text-2xl font-bold mb-4">⏰ Waktu Habis!</h2>
        <p className="mb-2">Kamu menyelesaikan hingga tingkat:</p>
        <h3 className="text-xl font-semibold mb-4">
          Stage {stage > 1 ? stage - 1 : stage} ({totalMatched} Pasang Kartu)
        </h3>
        <p className="mb-2">Total langkah yang dilakukan:</p>
        <h3 className="text-xl font-semibold mb-5">{totalMove} langkah</h3>

        <button
          onClick={onRestart}
          className="bg-linear-to-r border-3 text-blue px-4 py-2 block mt-3 mx-auto hover:from-blue hover:to-pastel-dark hover:text-white cursor-pointer"
        >
          <FontAwesomeIcon icon={faRefresh} className="mr-2" />
          Main Lagi
        </button>
        <button
          onClick={onReset}
          className="bg-linear-to-r border-3 text-blue px-4 py-2 block mt-3 mx-auto hover:from-blue hover:to-pastel-dark hover:text-white cursor-pointer"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
export default ModalGameOver;
