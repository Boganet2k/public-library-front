import React, {FC, useEffect, useState} from 'react';
import BooksGrid from "../components/BooksGrid";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Button, Layout, Modal, Row, Alert} from "antd";
import {IBook} from "../models/IBook";
import BookForm from "../components/BookForm";
import {jwtUtils} from "../utils/jwt";
import {IBookFilter} from "../models/IBookFilter";

const Books: FC = () => {

    const {sagaLoadBooks, sagaSaveBook, sagaUpdateBook, sagaDeleteBook, sagaReservationBook, sagaGiveOutBook, sagaReturnBook, setReservations, setBooksError} = useActions();
    const [modalVisible, setModalVisible] = useState(false);
    const {books, total, reservations, error} = useTypedSelector(state => state.book);
    const {user} = useTypedSelector(state => state.auth);

    const [bookForBookForm, setBookForBookForm] = useState<IBook>({} as IBook);
    const [bookFilterRefresh, setBookFilterRefresh] = useState<IBookFilter>({} as IBookFilter);

    const onRefreshBook = (bookFilter: IBookFilter): void => {
        console.log("onRefreshBook: ");
        console.log(bookFilter)

        setBookFilterRefresh(bookFilter);
        sagaLoadBooks(user, bookFilter);
    }

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

    const onReservationBook = (book: IBook): void => {
        console.log("onReservationBook: ");
        console.log(book)

        sagaReservationBook(user, book, bookFilterRefresh);
    }

    const onGiveOutBook = (book: IBook): void => {
        console.log("onGiveOutBook: ");
        console.log(book)

        sagaGiveOutBook(user, book, bookFilterRefresh);
    }

    const onReturnBook = (book: IBook): void => {
        console.log("onReturnBook: ");
        console.log(book)

        sagaReturnBook(user, book, bookFilterRefresh);
    }

    const resetReservations = (): void => {
        setReservations(null);
    }

    let isAdmin = jwtUtils.isAdmin(user);
    let isNewReservationPresent = reservations && reservations.length > 0;

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

            {error ?
                <Alert type="error" message={error} closable closeText="Hide error" afterClose={() => setBooksError(null)}/>
                :
                <div/>
            }

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

            {isNewReservationPresent ?
                <Modal
                    title="New Reservation"
                    footer={null}
                    visible={true}
                    onCancel={() => resetReservations()}
                >
                    {
                        reservations.map(reservation => {

                                if (reservation.status === 'reserved') {
                                    return <div key={reservation.id}><h4>Book title:&nbsp;{reservation.book.title}</h4><br/>Reservation
                                        code:&nbsp;{reservation.code}</div>
                                } else if (reservation.status === 'lent' && reservation.to) {
                                    return <div key={reservation.id}><h4>Book title:&nbsp;{reservation.book.title}</h4><br/>was returned</div>
                                } else if (reservation.status === 'lent') {
                                    return <div key={reservation.id}><h4>Book title:&nbsp;{reservation.book.title}</h4><br/>was give out</div>
                                } else {
                                    return <div></div>
                                }

                            }
                        )
                    }

                </Modal>
                :
                <></>

            }
            <BooksGrid isAdmin={isAdmin}
                       books={books}
                       total={total}
                       onRefresh={onRefreshBook}
                       onEdit={onEditBook}
                       onDelete={onDeleteBook}
                       onReservation={onReservationBook}
                       onGiveOut={onGiveOutBook}
                       onReturn={onReturnBook}
            />
        </Layout>
    );
};

export default Books;