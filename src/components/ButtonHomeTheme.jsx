function ButtonHomeTheme({
  theme,
  themeValue,
  themeList,
  onTheme,
  children,
  onShowModal,
}) {
  const handleClick = () => {
    onTheme(themeValue);
    onShowModal(false);
  };

  return (
    <button
      className={`text-blue font-semibold px-10 py-2 bg-linear-to-r border-3 hover:from-blue hover:to-pastel-dark hover:text-white cursor-pointer transition block my-3 mx-auto ${
        theme == themeValue ? "from-blue to-pastel-dark text-white" : ""
      }`}
      onClick={handleClick}
    >
      {
        <>
          <p className="text-xl pb-1">{children}</p>

          {themeList.map(
            (icon, index) =>
              index < 3 && (
                <span key={index} className="text-lg">
                  {icon}
                </span>
              )
          )}
        </>
      }
    </button>
  );
}
export default ButtonHomeTheme;
