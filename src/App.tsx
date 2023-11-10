import React, { useEffect, useState } from "react";
import { Button, Space, Input, Table,Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import QueryProvider from "./service/query-provider";
import { useSearch, useSearchEngines, useSearchResultHistories } from "./service/hook/search";
import { SearchEngineItem, SearchResultHistoriesItem } from "./types";
import { getSearchEngineService, getSearchService } from "./service/api/engine";
import { getSearchResultService } from "./service/api/searchResult";


interface HistoriesDataType {
    url: string;
    keyWords: string;
    rank: string;
    date: string;
    id: number;
}

const App = () => {
    const [searchEngineList, setSearchEngineList] = useState<SearchEngineItem[]>([]);
    const [searchResultList, setSearchResultList] = useState<SearchResultHistoriesItem[]>([]);

    const [selectedSearchEngine, setSelectedSearchEngine] = useState<SearchEngineItem | undefined>(
        undefined
    );

    const [searchKey, setSearchKey] = useState<string>("");
    const [searchResult, setSearchResult] = useState<string>("");
    const { Title } = Typography;
    const searchApi = () => {
        getSearchService(searchKey, selectedSearchEngine?.id ?? 0, 100).then((v)=>{
            setSearchResult(v)
        });
    };

    useEffect(() => {
        getServices();
    }, []);

    const getServices = () => {
        getSearchEngineService().then((result) => {
            setSearchEngineList(result ?? []);
        });
        getSearchResultService().then((result) => {
            setSearchResultList(result ?? []);
        });
    };

    const columns: ColumnsType<HistoriesDataType> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            // render: (id: string) => <a>{id}</a>,
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
        },
        {
            title: "KeyWords",
            dataIndex: "keyWords",
            key: "keyWords",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];

    const historiesData: SearchResultHistoriesItem[] = searchResultList;

    return (
        <div style={{ padding: "0 24px", display: "block" }}>
            <h1>Search Engines</h1>
            <h5>Please select search engine : </h5>
            <Space>
                {searchEngineList.length > 0 &&
                    searchEngineList.map((mapItem) => {
                        return (
                            <Button
                                onClick={() => {
                                    setSearchEngineList(
                                        searchEngineList.map((item) => {
                                            return { ...item, select: item.id === mapItem.id };
                                        })
                                    );
                                    setSelectedSearchEngine(mapItem);
                                }}
                                // disabled={!mapItem.select}
                                type={
                                    mapItem.id === selectedSearchEngine?.id ? "primary" : "dashed"
                                }
                            >
                                {mapItem.name}
                            </Button>
                        );
                    })}
            </Space>
            <br />
            <div
                style={{
                    height: "20px",
                }}
            />
            <hr />
            <Space>
                <Input
                    value={searchKey}
                    onChange={(e) => {
                        setSearchKey(e.target.value);
                    }}
                    placeholder="Search key"
                />
                <Button
                    onClick={() => {
                        searchApi();
                    }}
                    type="primary"
                >
                    Search
                </Button>
                <Title level={2}>{`Ranking: ${searchResult}`}</Title>
            </Space>

            <Table columns={columns} dataSource={historiesData} />
        </div>
    );
};

export default App;
