import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';

class Client {
    engine = {
        getSearch: (query: string, engineId: number, pageSize: number) => HttpClient.get<any>(`${API_ENDPOINTS.ENGINE_SEARCH}?query=${query}&engineId=${engineId}&pageSize=${pageSize}`),
        getSearchEngine: () => HttpClient.get<any>(API_ENDPOINTS.ENGINE_SEARCH_ENGINES),
        getSearchResultHistory: () => HttpClient.get<any>(API_ENDPOINTS.SEARCH_RESULT_HISTORIES),
    };
}

export default new Client();
