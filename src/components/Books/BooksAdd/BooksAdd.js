import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import LibraryRepository from "../../../repository/libraryRepository";


function BooksAdd(props) {
    const navigate = useNavigate();
    const [categories, updateCategories] = useState([]);
    const [authors, updateAuthors] = useState([]);
    const [formData, updateFormData] = useState({
        name: "",
        category: categories[0] ? categories[0] : "NOVEL",
        availableCopies: 0,
        authorId: authors[0] ? authors[0].id : 1
    });

    useEffect(() => {
        LibraryRepository.fetchAuthors()
            .then(data => updateAuthors(data.data))

        LibraryRepository.fetchCategories()
            .then(data => updateCategories(data.data))
    }, [])

    function handleChange(e) {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    function onFormSubmit(e) {
        e.preventDefault()
        LibraryRepository.saveBook(
            formData.name,
            formData.category,
            formData.availableCopies,
            formData.authorId
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
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" className={"form-control"} onChange={handleChange}>
                            {authors.map(a => {
                                return <option key={a.id} value={a.id}>{a.name} {a.surname}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className={"form-control"} onChange={handleChange}>
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
                               placeholder="Available Copies"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BooksAdd;