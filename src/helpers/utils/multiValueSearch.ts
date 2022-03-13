
export const multiValueSearch = (value?: string, data?: object[]) => {
    const replaceValue = (item?: any) => item.toLowerCase().replace(/\s/g, '')
    const val = replaceValue(value)
    
    return data?.filter((item: any) => (
        replaceValue(item.code).indexOf(val) >= 0 
        || replaceValue(item.name).indexOf(val) >= 0
        || replaceValue(item.address).indexOf(val) >= 0 
    ))
}