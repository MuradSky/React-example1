import { useLocation, useNavigate } from "react-router-dom"

export const useModalCallLink = () => {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };
    const navigate = useNavigate()
    const trigger = (to?: any,)=> {
        navigate(to, {
            replace: true,
            state: { backgroundLocation: state?.backgroundLocation || location },
        })
    }
    
    return trigger
}