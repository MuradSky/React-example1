import info from "./info.svg"

export const NotCards: React.FC = ({ children }) => {
    return (
        <div className="personal-area__not-card">
            <p className="personal-area__text">Чтобы принимать участие в программах, пожалуйста, выберите Торговые точки, к которым вы относитесь. </p>
            <p className="personal-area__info">
                <img src={info} alt="" />
                Торговые точки принимаются один раз и сменить их можно будет только при личном обращении к администрации программы. 
            </p>
            <p className="personal-area__text">Внимательно проверьте все данные перед сохранением.</p>
            {children}
        </div>
    )
}