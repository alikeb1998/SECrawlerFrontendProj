import { HelperService, HttpMethodEnum, MainResInterface } from "../../utils/helper.service";
import { API_ENDPOINTS } from "../api-endpoints";


export const getSearchResultService = async () => {
    const service = new HelperService<null, null>(
        API_ENDPOINTS.SEARCH_RESULT_HISTORIES,
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