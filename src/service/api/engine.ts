import { HelperService, HttpMethodEnum, MainResInterface } from "../../utils/helper.service";
import { API_ENDPOINTS } from "../api-endpoints";


export const getSearchEngineService = async () => {
    const service = new HelperService<null, null>(
        API_ENDPOINTS.ENGINE_SEARCH_ENGINES,
        null,
        HttpMethodEnum.Get,
        true,
        false,
        true,
        false
    );
    await service.call();
    if (service.response?.data) {
        return service.response?.data;
    } else {
        return []
    }
};

export const getSearchService = async (query: string, engineId: number, pageSize: number) => {
    const service = new HelperService<null, null>(
        `${API_ENDPOINTS.ENGINE_SEARCH}?query=${query}&engineId=${engineId}&pageSize=${pageSize}`,
        null,
        HttpMethodEnum.Get,
        true,
        false,
        true,
        false
    );
    await service.call();
    if (service.response?.data) {
        return service.response?.data;
    } else {
        return ""
    }
};
