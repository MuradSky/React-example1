interface TP {
    id?: string;
    name?: string;
    address?: string;
}

interface ChildComponentProps {
    data?: TP[]
}

export const Addresses: React.FC<ChildComponentProps> = ({ data=[] }) => {
    return (
        <ul className="addresses">
            { data.map((item?: TP, i?: number ) => (
                <li key={i}>
                    <span className="addresses__id">{item?.id}</span>
                    <div className="addresses__right">
                        <p className="addresses__name">{item?.name}</p>
                        <span className="addresses__address">{item?.address}</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}