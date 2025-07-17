function ButtonHomePlay({ level, onLevel, onShowModal }) {
  const handleClick = () => {
    onLevel(level);
    onShowModal(false);
  };

  return (
    <button
      className="text-blue font-semibold px-10 py-2 bg-linear-to-r border-3 hover:from-blue hover:to-pastel-dark hover:text-white cursor-pointer transition block my-3 mx-auto"
      onClick={handleClick}
    >
      {level.toUpperCase()}
    </button>
  );
}
export default ButtonHomePlay;
