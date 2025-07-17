import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonGameMenu({ onClickAction, icon, onPaused, title }) {
  return (
    <button
      className="text-blue font-semibold cursor-pointer"
      onClick={onClickAction}
      disabled={title != "pause" && onPaused ? true : false}
    >
      <FontAwesomeIcon
        icon={icon}
        className="border-2 border-blue p-1.5 bg-white hover:bg-blue hover:text-white "
      />
    </button>
  );
}
export default ButtonGameMenu;
