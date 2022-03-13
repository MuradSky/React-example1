import React, { useRef, useState } from "react"
import { toast  } from "react-toastify"
import { useAuth } from "modules/Auth";
import Dialog from "@reach/dialog"
import { Oval } from "react-loader-spinner"
import { SearchInput } from "components/Form/Inputs"
import { useOnDimiss } from "modules/Modal"
import { OutletsList } from "./OutletsList"
import { SelectedList } from "./SelectedList"
import { useOutletsSearch } from "helpers/hooks"
import { routeName } from "helpers/utils"
import note from './note.svg'
import close from './close.svg'

import "./ChoiceOfOutlets.scss"

export const ChoiceOfOutlets: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [addOutlet, setAddOutlet] = useState<object[]>([])
    const [savedFetch, setSavedFetch] = useState<boolean>(false)
    const refInputSearch = useRef<any>(null)
    const searchPanel = useRef<any>(null)
    const { saveOutlets } = useAuth()
    const onDismiss = useOnDimiss()
    const { outlets, isLoading } = useOutletsSearch(`${routeName("api.seller.outlet.search")}?q=${search}`)

    const onClear = () => setSearch('')
    const onBlur = (e: any)=> !searchPanel.current.contains(e.target) && setOpen(false)

    const onSearch = (e?: any) => {
        const val = e.target.value
        setSearch(val)
        if(val) setOpen(true)
    }
    
    const onFocus = () => {
        if(search) setOpen(true)
    }

    const onAddOutlet = (id?: string) => {
        if(addOutlet.some((item: any) => item.id === id)) return toast.error("Вы уже выбрали эту точку")
        const addItem = outlets.find(((item: any)=> item.id === id))
        setAddOutlet((state?: any)=> [addItem, ...state])
        setOpen(false)
    }

    const onRemoveOutlet = (id?: string) => {     
        const replaceItem = addOutlet.filter(((item: any)=> item.id !== id))
        setAddOutlet(replaceItem)
    }

    const onSaveOutlets = () => {
        if(!addOutlet.length) return toast.info("Пожалуйста выберите торговые точки")
        const outletsId = addOutlet.map((item: any) => item.id)
        const data = { outlet_ids: outletsId }
        setSavedFetch(true);
        saveOutlets(data, (res)=> {
            if(res?.data?.outlets) {
                setSavedFetch(false);
                onDismiss()
            } else {
                setSavedFetch(false);
                onDismiss()
                toast.info(res)
            }
        })
    }

    return (
        <Dialog
            aria-labelledby="label"
            initialFocusRef={refInputSearch}
            onDismiss={onDismiss}
            className="outlets"
            onClick={onBlur}
        >
            <button onClick={onDismiss} className="outlets__close">
                <img src={close} alt="" />
            </button>
            <h3 className="outlets__title">Выбор торговых точек</h3>
            <div className="outlets__head-mobile">Введите код / название / адрес точки </div>
            <div className="outlets__search-panel" ref={searchPanel}>
                <SearchInput 
                    value={search}
                    onSearch={onSearch}
                    onClear={onClear}
                    onFocus={onFocus}
                    disabled={savedFetch}
                />
                {open && <OutletsList data={outlets} onAddOutlet={onAddOutlet} isLoading={isLoading} />}
            </div>
            <div className="outlets__head">
                <div className="outlets__head-item">Код точки</div>
                <div className="outlets__head-item">Наименование</div>
                <div className="outlets__head-item">Адрес</div>
            </div>
            <div className="saved">
                {!!addOutlet.length ? <SelectedList data={addOutlet} onRemoveOutlet={onRemoveOutlet} disabled={savedFetch}/> : null}
            </div>
            <div className="outlets__row">
                <div className="outlets__note">
                    <img src={note} alt="" />
                    <p>Торговые точки принимаются один раз и сменить их можно будет только при личном обращении к администрации программы. </p>
                    <span>Внимательно проверьте все данные перед сохранением.</span>
                </div>
                <button 
                    className="outlets__save btn btn_red" 
                    onClick={onSaveOutlets}
                    disabled={savedFetch}
                >
                    {savedFetch && 
                        <Oval
                            color="#98092D"
                            height={35}
                            width={35}
                            secondaryColor="#ab3a57"
                        />
                    }
                    <span>Сохранить</span>
                </button>
            </div>
        </Dialog>
    )
} 