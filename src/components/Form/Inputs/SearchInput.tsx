import close from "./close.svg"
type TP =  { 
    value?: string; 
    onSearch?: any; 
    onClear?: any; 
    onBlur?: any;
    onFocus?: any;
    disabled?: boolean;
}
export const SearchInput: React.FC<TP> = ({
    value,
    onSearch,
    onClear,
    onBlur,
    onFocus,
    disabled
}) => {
    return (
        <label htmlFor="search" className="form__label" onFocus={onFocus} onBlur={onBlur}>
            <input 
                id="search"
                type="text" 
                name="search"
                placeholder="Введите код / название / адрес точки"
                value={value}
                onChange={onSearch}
                autoComplete="off"
                disabled={disabled}
            />
            {value && <button className="form__clear" onClick={onClear}> <img src={close} alt="" /></button>}
        </label>
    )
}