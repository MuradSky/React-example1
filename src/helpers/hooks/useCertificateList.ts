import axios from "axios"
import useSWR from "swr"
const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data)

export const useCertificateList = (url: string) => {

  const { data, error } = useSWR(url, fetcher)
  return {
    certificates: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    meta: data?.meta ?? {}
  }
}
