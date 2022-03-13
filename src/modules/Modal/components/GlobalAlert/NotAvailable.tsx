import { Button } from "components/Form";
import { useOnDimiss } from "modules/Modal/useOnDimiss";

export const NotAvailable: React.FC = () => {
    const onDismiss = useOnDimiss()
    return (
        <div className="global-alert">
            <p className="form-modal__text"> Для покупки сертификата необходимо приобрести Выбирай Card, на сумму равную минимальной сумме желаемого сертификата</p>
        
            <Button color="red" type="button" handleClick={onDismiss}>Закрыть</Button>
        </div>
    )
}