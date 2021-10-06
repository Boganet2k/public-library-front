import React, {FC, Key, useEffect, useState} from 'react';
import {Table, Space, Input, Button} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {IBook} from "../models/IBook";
import {ColumnType} from 'antd/lib/table';
import {IBookFilter} from "../models/IBookFilter";

interface BooksGridProps {
    isAdmin: boolean;
    books: IBook[];
    onDelete: (book: IBook) => void;
    onEdit: (book: IBook) => void;
    onRefresh: (bookFilter: IBookFilter) => void;
    onReservation: (book: IBook) => void;
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

    return (
        <Table columns={[
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
                title: 'Action',
                key: 'action',
                render: (text: string, book: IBook) => (
                    <Space size="middle">
                        <a hidden={!props.isAdmin} onClick={event => props.onEdit(book)}>Edit</a>
                        <a hidden={!props.isAdmin} onClick={event => props.onDelete(book)}>Delete</a>
                        <a hidden={(Array.isArray(book.reservations) && book.reservations.length > 0)} onClick={event => props.onReservation(book)}>Make a reservation</a>
                        <span style={{color: "red"}} hidden={(!Array.isArray(book.reservations) || book.reservations.length == 0)}>{book.reservations[0].status}</span>
                    </Space>
                ),
            }
        ]}
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
        />
    );
};

export default BooksGrid;