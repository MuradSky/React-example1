import useSWR from "swr"
import axios from "axios"
import { getTokenAuth } from "helpers/utils";


export const useOutletsSearch = (url: string) => {
  const token = getTokenAuth();
  const fetcher = (url: string) => axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }: any) => data)

  const { data, error } = useSWR(url, fetcher)
  return {
    outlets: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    meta: data?.meta ?? {}
  }
}
