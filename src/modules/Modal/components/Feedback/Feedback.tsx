import { useRef, useState } from 'react'
import { FormProvider, useForm} from 'react-hook-form'
import { Dialog } from '@reach/dialog'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";
import { useOnDimiss } from 'modules/Modal'
import { Button, PhoneMask, Textarea, TextInput } from 'components/Form'
import { TFeedBackForm } from "modules/Auth/type";
import { feedbackScheme } from 'helpers/utils';
import { useAuth } from 'modules/Auth';
import { useModalCallLink } from 'helpers/hooks';

import close from "./close.svg";


const schema = yup.object(feedbackScheme);

export const Feedback: React.FC = () => {
    const [disabledForm, setDisabledForm] = useState<boolean>(true)
    const [formValid, setFormValid] = useState<boolean>(false);
    const refInputName = useRef<HTMLInputElement>(null)
    const onDismiss = useOnDimiss()
    const auth = useAuth();
    const modalCall = useModalCallLink();
    const methods = useForm<TFeedBackForm>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: TFeedBackForm): void => {
        setFormValid(true);
        data &&
            auth.feedback(data, (res: any)=> {
                setFormValid(false);
                modalCall("/success")
            })
    };

    const onChangeForm = () => {
        const fields = methods.getValues();
        if (fields.name.length > 3 && fields.phone && fields.comment.length > 10) {
            setDisabledForm(false);
        } else {
            setDisabledForm(true);
        }
    }

    return (
        <Dialog
            aria-labelledby="label"
            initialFocusRef={refInputName}
            onDismiss={onDismiss}
            className="form-modal">
            {formValid && (
                <div className="form-modal__spin">
                <Oval
                    color="#98092D"
                    height={50}
                    width={50}
                    secondaryColor="#E0B5C0"
                />
                </div>
            )}
            <h3 className="form-modal__title">Обратная связь</h3>
            <button onClick={onDismiss} className="form-modal__close">
                <img src={close} alt="" />
            </button>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="form" onChange={onChangeForm}>
                    <TextInput id="name" type="name" placeholder="Имя*" />
                    <PhoneMask id="phone" />
                    <Textarea id="comment" placeholder="Комментарий"/>
                    <Button type="submit" color="red" className="form__submit" disabled={disabledForm}>
                        Отправить
                    </Button>
                </form>
            </FormProvider>
        </Dialog>
    )
}