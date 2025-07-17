function ButtonHome({ onClick, title }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-10 mt-5 bg-linear-to-r border-3 w-[300px] font-semibold text-blue cursor-pointer hover:from-blue hover:to-pastel-dark hover:text-white block mx-auto text-2xl`}
    >
      {title}
    </button>
  );
}
export default ButtonHome;
