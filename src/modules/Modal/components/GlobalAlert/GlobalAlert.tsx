import Dialog from "@reach/dialog"
import { useOnDimiss } from "modules/Modal/useOnDimiss"
import { useParams } from "react-router-dom"
import { UsePoints } from "./UsePoints"
import { NotAvailable } from "./NotAvailable"

import close from  "./close.svg"


const components: any = {
    "use-points": <UsePoints />,
    "not-available": <NotAvailable />
}

export const GlobalAlert: React.FC  = () => {
    const onDismiss = useOnDimiss()
    const { global } = useParams()

    return (
        <Dialog
            aria-labelledby="label"
            onDismiss={onDismiss}
            className="form-modal modal-global"
        >
            <button onClick={onDismiss} className="form-modal__close">
                <img src={close} alt="" />
            </button>
            { global && components[global]}
        </Dialog>
    )
}