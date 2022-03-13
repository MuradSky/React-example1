import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
type TPItem = {
    code?: string;
    name?: string;
    address?: string;
    onClick?: any
}

type TP = {
    data?: {
        code?: string;
        name?: string;
        address?: string;
    }[];
    onAddOutlet?: any;
    isLoading?: boolean;
}

const Item: React.FC<TPItem> = ({ code, name, address, onClick }) => {
    return (
        <div>
            <p>{code}</p>
            <p>{name}</p>
            <p>{address}</p>
            <button onClick={onClick} className="btn btn_red">Выбрать</button>
        </div>
    )
}

export const OutletsList: React.FC<TP> = ({
    data,
    onAddOutlet,
    isLoading
}) => {
    const [endPos, setEndPos] = useState<number>(20)
    const [outlets, setOutlets] = useState<any>([])
 
    useEffect(()=> {
        const sliceData = data?.slice(0, endPos)
        setTimeout(()=> setOutlets(sliceData), 500)
    }, [data, endPos])
    
    const fetchMoreData = () => setEndPos((state: number) => state + 20)
    
    return (
       <div className="outlets__dropdown" id="scrollableDiv">
            { isLoading ? <p>Загрузка...</p>
                : (
                    <InfiniteScroll
                        dataLength={outlets?.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={null}
                        className="outlets__list"
                        scrollableTarget="scrollableDiv"
                    >
                        {outlets?.map((item: any, i: number)=> (
                            <Item
                                key={item.id}
                                code={item.id}
                                name={item.name}
                                address={item.full_address}
                                onClick={()=> onAddOutlet(item.id)}
                            />
                        ))}
                    </InfiniteScroll>
                )
            }
       </div>
    )
}