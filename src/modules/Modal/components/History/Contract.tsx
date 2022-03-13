import axios from "axios"
import { getTokenAuth, routeName } from "helpers/utils"
import { useState } from "react"
import { Oval } from "react-loader-spinner"

// import { jsPDF } from "jspdf"

const token = getTokenAuth()

export const Contract: React.FC<{id?: any}> = ({ id }) => {
    const [loader, setLoader] = useState<boolean>(false)
    const [contract, setContract] = useState<any>("")
        
    const onDownloadContract = () => {
        setLoader(true)
        axios.get(routeName("api.seller.seller.donation-contract.generate", id), {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/pdf'
            },  
        })
        .then(res=> {
            setContract(res?.data)
            setLoader(false)
            console.log(contract)
            // TODO- доработать метод преобразования и вывода сгенерированных пдф базовая структура метода имеется по пути /helpers/utils/generatePDF.ts
        })
    }


    return (
        <>
            {loader ? 
                <Oval
                    color="#98092D"
                    height={10}
                    width={10}
                    secondaryColor="#ab3a57"
                /> :
                <button onClick={onDownloadContract}>
                    Скачать договор
                </button>
            }
        </>
    )
}