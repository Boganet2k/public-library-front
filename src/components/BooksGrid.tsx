import React, {FC, Key, ReactNode, useEffect, useState} from 'react';
import {Table, Space, Input, Button} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {IBook} from "../models/IBook";
import {ColumnType} from 'antd/lib/table';
import {IBookFilter} from "../models/IBookFilter";
import {FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig} from "antd/lib/table/interface";

interface BooksGridProps {
    isAdmin: boolean;
    books: IBook[];
    onDelete: (book: IBook) => void;
    onEdit: (book: IBook) => void;
    onRefresh: (bookFilter: IBookFilter) => void;
    onReservation: (book: IBook) => void;
    onGiveOut: (book: IBook) => void;
    onReturn: (book: IBook) => void;
}

const BooksGrid: FC<BooksGridProps> = (props) => {

    const [bookFilter, setBookFilter] = useState({} as IBookFilter)

    let data: IBook[] = props.books.map((bookItem) => {
        return {...bookItem, key: bookItem.id.toString()}
    });

    const handleSearch = (dataIndex: string, selectedKeys: Key[], confirm: () => void) => {

        confirm();

        const newBookFilter = {...bookFilter, [dataIndex]: selectedKeys[0]} as IBookFilter;
        setBookFilter(newBookFilter);
        props.onRefresh(newBookFilter);
    };

    const handleReset = (dataIndex: string, clearFilters: () => void) => {

        clearFilters();

        const newBookFilter = {...bookFilter, [dataIndex]: null} as IBookFilter;
        setBookFilter(newBookFilter);
        props.onRefresh(newBookFilter);
    };

    function tableColumnTextFilterConfig<T>(dataIndex: string): ColumnType<T> {
        const searchInputHolder: { current: Input | null } = { current: null };

        return {
            filterDropdown: ({
                                 setSelectedKeys,
                                 selectedKeys,
                                 confirm,
                                 clearFilters,
                             }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={(node) => {
                            searchInputHolder.current = node;
                        }}
                        placeholder="Search"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(dataIndex, selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(dataIndex, selectedKeys, confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button size="small" style={{ width: 90 }} onClick={() => handleReset(dataIndex, clearFilters as () => void)}>
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInputHolder.current?.select());
                }
            }
        };
    }

    let columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            ...tableColumnTextFilterConfig<IBook>('title'),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: '30%',
            ...tableColumnTextFilterConfig<IBook>('author'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            filters: [
                { text: 'available', value: 0 },
                { text: 'reserved', value: 1 },
                { text: 'lent', value: 2 },
            ],
            render: (text: string, book: IBook) => (
                <Space size="small">
                        <span style={{color: book.status == "available" ? "green" : book.status == "reserved" ? "orange" : "red"}}>{book.status}</span>
                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, book: IBook) => (
                <Space size="small">
                    <a hidden={!props.isAdmin} onClick={event => props.onEdit(book)}>Edit</a>
                    <a hidden={!props.isAdmin} onClick={event => props.onDelete(book)}>Delete</a>
                    <a hidden={props.isAdmin || book.status !== "available"} onClick={event => props.onReservation(book)}>Reserve</a>
                    <a hidden={!props.isAdmin || book.status !== "reserved"} onClick={event => props.onGiveOut(book)}>Lent</a>
                    <a hidden={!props.isAdmin || book.status !== "lent"} onClick={event => props.onReturn(book)}>Return</a>
                </Space>
            ),
        }
    ];

    if (props.isAdmin) {
        columns.splice(3, 0, {
            title: 'Reservation code',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            ...tableColumnTextFilterConfig<IBook>('code'),
            render: (text: string, book: IBook) => (
                <Space size="small">
                    <span style={{fontWeight: "bold"}} hidden={(!Array.isArray(book.reservations) || book.reservations.length === 0)}>{book.reservations && book.reservations.length > 0 ? book.reservations[0].code : "" }</span>
                </Space>
            )
        });
    }

    const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<IBook> | SorterResult<IBook>[], extra: TableCurrentDataSource<IBook>) => {
        console.log("handleTableChange");
        console.log(pagination);
        console.log(filters);

        const newBookFilter = {...bookFilter, status: filters.status} as IBookFilter;
        setBookFilter(newBookFilter);
        props.onRefresh(newBookFilter);

    };

    return (
        <Table columns={columns}
               dataSource={data}
               onRow={(modelItem) => ({
                   onClick: (e) => {
                       console.log("onClick");
                       console.log(modelItem);
                       console.log(e);
                   },
                   onDoubleClick: (e) => {
                       console.log("onDoubleClick");
                       console.log(modelItem);
                       console.log(e);
                   }
               })}
               onChange={handleTableChange}
        />
    );
};

export default BooksGrid;