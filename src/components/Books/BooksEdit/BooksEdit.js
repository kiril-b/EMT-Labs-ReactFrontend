import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import LibraryRepository from "../../../repository/libraryRepository";


const BooksEdit = (props) => {
    const navigate = useNavigate();
    const [categories, updateCategories] = useState([]);
    const [authors, updateAuthors] = useState([]);
    const [book, updateBook] = useState({});
    const {id} = useParams();

    useEffect(() => {
        LibraryRepository.fetchBookById(id)
            .then(({data}) => updateBook({
                id: data.id,
                name: data.name,
                category: data.category,
                authorId: data.author.id,
                availableCopies: data.availableCopies
            }));

        LibraryRepository.fetchAuthors()
            .then(data => updateAuthors(data.data));

        LibraryRepository.fetchCategories()
            .then(data => updateCategories(data.data));
    }, [id])


    function handleChange(e) {
        updateBook({
            ...book,
            [e.target.name]: e.target.value.trim()
        })
    }

    function onFormSubmit(e) {
        e.preventDefault()
        LibraryRepository.editBook(
            book.id,
            book.name,
            book.category,
            book.availableCopies,
            book.authorId
        ).then(() => navigate('/books'));
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               value={book.name}
                               onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" className={"form-control"} onChange={(e) => handleChange(e)}
                                value={book.authorId}>
                            {authors.map(a => {
                                return <option key={a.id} value={a.id}>{a.name} {a.surname}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className={"form-control"} onChange={(e) => handleChange(e)}
                                value={book.category}>
                            {categories.map(c => {
                                return <option key={c} value={c}>{c}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="number"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               value={book.availableCopies}
                               required
                               onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );

}

export default BooksEdit