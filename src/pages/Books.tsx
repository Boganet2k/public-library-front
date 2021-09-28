import React, {FC, useEffect, useState} from 'react';
import BooksGrid from "../components/BooksGrid";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Button, Layout, Modal, Row} from "antd";
import {IBook} from "../models/IBook";
import BookForm from "../components/BookForm";
import {jwtUtils} from "../utils/jwt";

const Books: FC = () => {

    const {sagaLoadBooks, sagaSaveBook, sagaUpdateBook, sagaDeleteBook} = useActions();
    const [modalVisible, setModalVisible] = useState(false);
    const {books} = useTypedSelector(state => state.book);
    const {user} = useTypedSelector(state => state.auth);

    useEffect(() => {
        sagaLoadBooks(user);
    }, [])

    const [bookForBookForm, setBookForBookForm] = useState<IBook>({title: "1"} as IBook);

    const createUpdateBook = (book: IBook) => {
        setModalVisible(false);

        //Save book to server
        console.log("addNewBook: ");
        console.log(book)
        book.user = user;

        if (book.id) {
            sagaUpdateBook(book);
        } else {
            sagaSaveBook(book);
        }
    }

    const onEditBook = (book: IBook): void => {

        console.log("onEditBook: ");
        console.log(book)
        book.user = user;

        setBookForBookForm(book);
        setModalVisible(true);
    }

    const onDeleteBook = (book: IBook): void => {

        console.log("onDeleteBook: ");
        console.log(book)
        book.user = user;

        sagaDeleteBook(book);
    }

    let isAdmin = jwtUtils.isAdmin(user);

    return (
        <Layout>
            <Row justify="end" style={{padding: '10px'}} hidden={!isAdmin}>
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
            <BooksGrid isAdmin={isAdmin} books={books} onDelete={onDeleteBook} onEdit={onEditBook}/>
        </Layout>
    );
};

export default Books;