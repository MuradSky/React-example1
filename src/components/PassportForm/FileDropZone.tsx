import { FileUpload } from "components/Form/Inputs"

export const FileDropZone: React.FC<{ data?: any; error?: any; isValid?: boolean }> = ({ data, error, isValid }) => {
    const { main_image, location_image, inn_image, snils_image } = error
    const err = main_image || location_image || inn_image || snils_image
    return (
        <div className="passport-form__dropzone">
            {data.map((item?: any)=> <FileUpload key={item.id} id={item.id} name={item.id} title={item.title} disabled={isValid}/>)}
            {err && <span className="form__error">Пожалуйста добавьте фотографии паспорта</span>}
        </div>
    )
}