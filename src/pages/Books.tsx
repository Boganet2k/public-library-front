import React, {FC, useEffect, useState} from 'react';
import BooksGrid from "../components/BooksGrid";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Button, Layout, Modal, Row} from "antd";
import {IBook} from "../models/IBook";
import BookForm from "../components/BookForm";
import {jwtUtils} from "../utils/jwt";
import {IBookFilter} from "../models/IBookFilter";

const Books: FC = () => {

    const {sagaLoadBooks, sagaSaveBook, sagaUpdateBook, sagaDeleteBook} = useActions();
    const [modalVisible, setModalVisible] = useState(false);
    const {books} = useTypedSelector(state => state.book);
    const {user} = useTypedSelector(state => state.auth);

    useEffect(() => {
        sagaLoadBooks(user, {} as IBookFilter);
    }, [])

    const [bookForBookForm, setBookForBookForm] = useState<IBook>({} as IBook);
    const [bookFilterRefresh, setBookFilterRefresh] = useState<IBookFilter>({} as IBookFilter);

    const createUpdateBook = (book: IBook) => {
        setModalVisible(false);

        //Save book to server
        console.log("addNewBook: ");
        console.log(book)

        if (book.id) {
            sagaUpdateBook(user, book, bookFilterRefresh);
        } else {
            sagaSaveBook(user, book, bookFilterRefresh);
        }
    }

    const onEditBook = (book: IBook): void => {

        console.log("onEditBook: ");
        console.log(book)

        setBookForBookForm(book);
        setModalVisible(true);
    }

    const onDeleteBook = (book: IBook): void => {

        console.log("onDeleteBook: ");
        console.log(book)

        sagaDeleteBook(user, book, bookFilterRefresh);
    }

    const onRefreshBook = (bookFilter: IBookFilter): void => {
        console.log("onRefreshBook: ");
        console.log(bookFilter)

        setBookFilterRefresh(bookFilter);
        sagaLoadBooks(user, bookFilter);
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
            <BooksGrid isAdmin={isAdmin} books={books} onDelete={onDeleteBook} onEdit={onEditBook} onRefresh={onRefreshBook}/>
        </Layout>
    );
};

export default Books;