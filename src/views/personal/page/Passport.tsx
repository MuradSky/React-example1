import { Breadcrumb } from 'components/Breadcrumb'
import { PassportForm } from 'components/PassportForm'
import { passportCrumbs } from 'helpers/utils'

import "./Passport.scss"

const Passport: React.FC = () => {
    return (
        <section className="passport">
            <div className="container">
                <Breadcrumb crumbs={passportCrumbs}/>
                <h3 className="passport__title title">Паспортные данные</h3>
                <PassportForm />
            </div>
        </section>
    )
}

export default Passport