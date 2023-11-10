import { useQuery } from "@tanstack/react-query";
import client from '../index';
import { SearchEngineItem, SearchResultHistoriesItem } from "../../types";


export function useSearch(query: string, engineId: number, pageSize: number) {
    return useQuery<SearchEngineItem[], Error>({
        // queryKey: [query, engineId, pageSize],
        queryKey: [query, engineId, pageSize],
        queryFn: () => {
            return client.engine.getSearch(query, engineId, pageSize)
        },
        // queryFn: () => {
        //     client.engine.getSearch(query, engineId, pageSize)
        // },
        enabled: false
    });
}

export function useSearchEngines() {
    return useQuery<SearchEngineItem[], Error>({
        queryKey: [''],
        queryFn: client.engine.getSearchEngine,
        enabled: false
    });
}

export function useSearchResultHistories() {
    return useQuery<SearchResultHistoriesItem[], Error>({
        queryKey: [''],
        queryFn: client.engine.getSearchResultHistory,
        enabled: false
    });
}