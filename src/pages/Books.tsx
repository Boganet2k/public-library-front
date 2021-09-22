import React, {FC, useEffect} from 'react';
import BooksGrid from "../components/BooksGrid";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Books: FC = () => {

    const {loadBooks} = useActions();
    const {books} = useTypedSelector(state => state.book);

    useEffect(() => {
        loadBooks();
    }, [])

    return (
        <div>
            <BooksGrid books={books}/>
        </div>
    );
};

export default Books;