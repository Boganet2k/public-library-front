import React, {FC, useEffect, useState} from 'react';
import BooksGrid from "../components/BooksGrid";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Button, Layout, Modal, Row} from "antd";
import {IBook} from "../models/IBook";
import BookForm from "../components/BookForm";

const Books: FC = () => {

    const {sagaLoadBooks, sagaSaveBook, sagaUpdateBook, sagaDeleteBook} = useActions();
    const [modalVisible, setModalVisible] = useState(false);
    const {books} = useTypedSelector(state => state.book);

    useEffect(() => {
        sagaLoadBooks();
    }, [])

    const [bookForBookForm, setBookForBookForm] = useState<IBook>({title: "1"} as IBook);

    const createUpdateBook = (book: IBook) => {
        setModalVisible(false);

        //Save book to server
        console.log("addNewBook: ");
        console.log(book)

        if (book.id) {
            sagaUpdateBook(book);
        } else {
            sagaSaveBook(book);
        }
    }

    const onEditBook = (book: IBook) => {

        console.log("onEditBook: ");
        console.log(book)

        setBookForBookForm(book);
        setModalVisible(true);
    }

    return (
        <Layout>
            <Row justify="end" style={{padding: '10px'}}>
                <Button
                    onClick={() => {
                        setBookForBookForm({} as IBook);
                        setModalVisible(true);
                    }}
                >
                    New book
                </Button>
            </Row>
            {modalVisible ?
                <Modal
                    title={bookForBookForm.id ? "Edit book" : "New book"}
                    footer={null}
                    visible={true}
                    onCancel={() => setModalVisible(false)}
                >
                    <BookForm
                        book={bookForBookForm}
                        submit={createUpdateBook}
                    />
                </Modal>
                :
                <></>
            }
            <BooksGrid books={books} onDelete={sagaDeleteBook} onEdit={onEditBook}/>
        </Layout>
    );
};

export default Books;