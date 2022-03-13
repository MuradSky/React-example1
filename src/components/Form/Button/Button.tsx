import { ReactComponent as ArrowRight } from "./icon_arrow-right.svg";
import "./Button.scss";

type BtnTypes = {
  type?: any;
  icon?: string;
  color?: string;
  className?: string;
  disabled?: any;
  handleClick?: () => void;
};

export const Button: React.FC<BtnTypes> = ({
  type = "button",
  icon,
  color,
  className,
  children,
  disabled= false,
  handleClick,
}) => {
  const figure = icon === "figure" ? null : null;
  const arrow =
    icon === "arrow" ? <ArrowRight className="pop__btn_arrow" /> : null;
  return (
    <button
      type={type}
      className={`btn btn_${color} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {figure}

      {children}

      {arrow}
    </button>
  );
};
