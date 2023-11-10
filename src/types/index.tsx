export interface SearchEngineItem {
    name: string;
    baseUrl: string;
    searchUrl: string;
    expression: string;
    id: number;
    select?: boolean;
}
//a
export interface SearchResultHistoriesItem {
    url: string;
    keyWords: string;
    rank: string;
    date: string;
    id: number;
}
