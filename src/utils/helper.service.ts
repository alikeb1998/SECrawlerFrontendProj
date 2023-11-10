import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export enum HttpMethodEnum {
    Post,
    Put,
    Get,
    Delete,
}

export interface MainResInterface {
    isSuccess: boolean;
    message: string;
    statusCode: number;
}

export interface RefreshServiceResInterface extends MainResInterface {
    token: string;
}

export class HelperService<Request, Response> {
    response?: AxiosResponse<Response>;
    errors: AxiosError[] = [];
    errorCode?: number;
    host: string;
    auth: any;

    constructor(
        readonly url: string,
        readonly data: Request,
        readonly method: HttpMethodEnum,
        readonly shouldRefresh: boolean,
        readonly skeletone: boolean,
        readonly authNeed: boolean = true,
        readonly loader?: boolean,
        readonly oidcApi?: boolean,
        readonly config?: AxiosRequestConfig,
    ) {
        this.host = 'http://localhost:5025/api';

    }

    private addLoader(url?: string) {
        if (this.loader ?? true) {
            if (this.skeletone) {

            } else {

            }
        }
    }

    private removeLoader(url?: string) {
        if (this.loader ?? true) {
            if (this.skeletone) {

            } else {

            }
        }
    }

    async call() {

        const axiosConfig: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        if (this.config) {
            if (this.config.headers) {
                axiosConfig.headers = {
                    ...axiosConfig.headers,
                    ...this.config.headers
                }
            }
        }

        this.addLoader();
        try {
            switch (this.method) {
                case HttpMethodEnum.Get:
                    this.response = await axios.get<Response>(this.host + this.url, axiosConfig);
                    break;
                case HttpMethodEnum.Delete:
                    this.response = await axios.delete<Response>(this.host + this.url, axiosConfig);
                    break;
                case HttpMethodEnum.Put:
                    this.response = await axios.put<Response>(
                        this.host + this.url,
                        this.data,
                        axiosConfig
                    );
                    break;
                default:
                case HttpMethodEnum.Post:
                    this.response = await axios.post<Response>(
                        this.host + this.url,
                        this.data,
                        axiosConfig
                    );
                    break;
            }
            this.removeLoader();
            // if ((this.response?.data?.message ?? "") !== "" && !this.response?.data.isSuccess) {

            // }
        } catch (e) {
            this.removeLoader();
            this.errors.push(e as AxiosError);
            if (((e as AxiosError).response?.data as MainResInterface)?.statusCode) {
                this.errorCode = ((e as AxiosError).response?.data as MainResInterface)?.statusCode;
            }
            if ((e as AxiosError)?.response?.status === 401 && this.authNeed) {
                // localStorage.clear();
                // sessionStorage.clear();

            } else {
                if (
                    (((e as AxiosError).response?.data as MainResInterface)?.message ?? "") !== ""
                ) {

                } else {

                }
            }
        }
    }

    async refresh() {
        this.addLoader("refresh");
        try {
            const res = await axios.post<RefreshServiceResInterface>(
                `${this.host}/refresh`,
                { refresh: localStorage.getItem("refresh") },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            this.removeLoader("refresh");
            return res.data.token;
        } catch (e) {
            if ((e as AxiosError).response?.status === 401 && this.authNeed) {

                return null;
            } else if (
                (e as AxiosError<MainResInterface>)?.response?.data.message &&
                (e as AxiosError<MainResInterface>)?.response?.data.message
                    .toLocaleLowerCase()
                    .indexOf("session id not found") !== -1
            ) {

            } else {

                this.removeLoader("refresh");
                return null;
            }
        }
    }
}