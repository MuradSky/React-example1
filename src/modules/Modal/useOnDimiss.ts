import { useNavigate, useLocation } from "react-router-dom";

export const useOnDimiss = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const onDismiss = () => {
    state?.backgroundLocation?.pathname
      ? navigate(state.backgroundLocation.pathname + decodeURI(state.backgroundLocation.search))
      : navigate(-1);
  };

  return onDismiss;
};
