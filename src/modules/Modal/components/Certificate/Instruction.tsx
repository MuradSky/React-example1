import calendar from "./calendar.svg";
import printer from "./printer.svg";
import credit from "./credit.svg";
import help from "./help.svg";

const instruction = [
    { 
        src: calendar,
        txt: "Можно вопользоваться через 1 день",
    },
    { 
        src: printer,
        txt: "Требуется обязательная печать карты",
    },
    { 
        src: credit,
        txt: "Можно воспользоваться однократно",
    },
    { 
        src: help,
        txt: "Можно воспользоваться в розничном интернет магазине",
    },
]

export const Instruction: React.FC = () => {
    return (
        <div className="instruction">
            {instruction.map((item: any, i: number)=> (
                <div className="instruction__item" key={i}>
                    <img src={item.src} alt="" />
                    <p className="instruction__text">{item.txt}</p>
                </div>
            ))}
        </div>
    )
}