import React, {FC} from 'react';
import {Table} from "antd";
import {IBook} from "../models/IBook";
import {Calendar} from "antd/es";

interface BooksGridProps {
    books: IBook[];
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