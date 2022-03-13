import axios from "axios"
import useSWR from "swr"
import { useSearchParams } from 'react-router-dom'

const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data)

export const useFilter = (url: string) => {
    const { data, error } = useSWR(url, fetcher)
    const [searchParams] = useSearchParams()
    const active = searchParams.get('tag_normalized')
    const page = searchParams.get('page')

    return {
        tags: data?.data ?? [],
        isLoading: !error && !data,
        isError: error,
        active,
        page
    }
}