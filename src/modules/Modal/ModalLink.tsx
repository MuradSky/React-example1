import { Link, useLocation } from "react-router-dom";

type TP = {
  to: string;
  hash?: any;
  search?: any;
  modal?: boolean;
  className?: string;
};

export const ModalLink: React.FC<TP> = ({
  children,
  to,
  hash,
  search,
  modal = false,
  className,
  ...props
}) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Link
      to={{
        pathname: to,
        search: search,
        hash: hash,
      }}
      state={{ backgroundLocation: state?.backgroundLocation || location }}
      {...props}
      className={className}
    >
      {children}
    </Link>
  );
};
