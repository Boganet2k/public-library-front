import React, {FC} from 'react';
import {Table, Space} from "antd";
import {IBook} from "../models/IBook";

interface BooksGridProps {
    books: IBook[];
    onDelete: (book: IBook) => void;
    onEdit: (book: IBook) => void;
}

const BooksGrid: FC<BooksGridProps> = (props) => {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%'
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: '30%'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, book: IBook) => (
                <Space size="middle">
                    <a onClick={event => props.onEdit(book)}>Edit</a>
                    <a onClick={event => props.onDelete(book)}>Delete</a>
                </Space>
            ),
        }
    ]

    let data: IBook[] = props.books.map((bookItem) => {
        return {...bookItem, key: bookItem.id.toString()}
    });

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
        />
    );
};

export default BooksGrid;