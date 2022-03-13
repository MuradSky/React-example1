
type TPItem = {
    code?: string;
    name?: string;
    address?: string;
    onClick?: any;
    disabled?: boolean
}

type TP = {
    data?: {
        id?: string;
        code?: string;
        name?: string;
        address?: string;
    }[];
    onRemoveOutlet?: any;
    disabled?: boolean
}

const Item: React.FC<TPItem> = ({ code, name, address, onClick, disabled }) => {
    return (
        <li>
            <p>{code}</p>
            <p>{name}</p>
            <p>{address}</p>
            <button onClick={onClick} className="btn selected__list-btn" disabled={disabled}>Удалить</button>
        </li>
    )
}

export const SelectedList: React.FC<TP> = ({
    data,
    onRemoveOutlet,
    disabled
}) => {
    return (
        <ul className="selected__list">
            {!!data?.length && data?.map((item: any)=> (
                <Item
                    key={item.id}
                    code={item.id}
                    name={item.name}
                    address={item.full_address}
                    onClick={()=> onRemoveOutlet(item.id)}
                    disabled={disabled}
                />
            ))}
        </ul>
    )
}