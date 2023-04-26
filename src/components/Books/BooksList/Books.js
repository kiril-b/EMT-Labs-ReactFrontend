import {useEffect, useState} from "react";
import LibraryRepository from "../../../repository/libraryRepository";
import {Link} from "react-router-dom";
import BookItem from "../BookItem/BookItem";
import ReactPaginate from "react-paginate";


function Books(props) {
    const [books, updateBooks] = useState([]);
    const [numberOfBooks, updateNumberOfBooks] = useState(0)
    const [page, updatePage] = useState(0);
    let pageSize = 5;
    let pageCount = Math.ceil(numberOfBooks / pageSize)

    useEffect(() => {
        fetchBooks(page, pageSize);
        fetchNumberOfBooks();
    }, [page])

    function fetchBooks(page, pageSize) {
        LibraryRepository.fetchBooks(page, pageSize)
            .then(data => updateBooks(data.data));
    }

    function fetchNumberOfBooks() {
        LibraryRepository.fetchNumberOfBooks()
            .then(data => updateNumberOfBooks(data.data))
    }

    function handlePageClick(data) {
        updatePage(data.selected)
    }

    function deleteBook(id) {
        LibraryRepository.deleteBook(id)
            .then(() => fetchBooks())
    }

    function decrementAvailableCopies(id) {
        LibraryRepository.decrementAvailableCopies(id)
            .then(() => fetchBooks());
    }

    return (
        <div className={"container mm-4 mt-5"}>
            <div>
                <Link to={'/books/add'} className={"btn btn-info"}>Add a new book</Link>
            </div>
            <div className={"row"}>
                <div className={"row"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Author</th>
                            <th scope={"col"}>Category</th>
                            <th scope={"col"}>Copies</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => {
                            return (
                                <BookItem key={book.id} book={book} onDelete={deleteBook} onDecrement={decrementAvailableCopies}/>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactPaginate previousLabel={"back"}
                           nextLabel={"next"}
                           breakLabel={<a href={"/#"}>...</a>}
                           breakClassName={"break-me"}
                           pageClassName={"ml-1"}
                           pageCount={pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={handlePageClick}
                           containerClassName={"pagination m-4 justify-content-center"}
                           activeClassName={"active"}
            />
        </div>
    );

}

export default Books;