import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {IBook} from "../models/IBook";
import {useActions} from "../hooks/useActions";

interface BookFormProps {
    book: IBook;
    submit: (book: IBook) => void
}

const BookForm: FC<BookFormProps> = (props) => {

    const [book, setBook] = useState<IBook>(props.book);

    const submitForm = () => {
        props.submit(book)
    }

    {
        console.log("BookForm");
        console.log(book);
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Title"
                name="title"
                rules={[rules.required("Please enter Title!")]}
            >
                <Input
                    type={"text"}
                    defaultValue={book.title}
                    value={book.title}
                    onChange={e => setBook({...book, title : e.target.value})}
                />
            </Form.Item>
            <Form.Item
                label="Author"
                name="author"
                rules={[rules.required("Please enter Author")]}
            >
                <Input
                    defaultValue={book.author}
                    value={book.author}
                    onChange={e => setBook({...book, author : e.target.value})}
                />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[rules.required("Please enter Description")]}
            >
                <Input
                    defaultValue={book.description}
                    value={book.description}
                    onChange={e => setBook({...book, description : e.target.value})}
                    type={"text"}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={false}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BookForm;