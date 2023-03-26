import {useEffect, useState} from "react";
import LibraryRepository from "../../repository/libraryRepository";

function Categories(props) {
    const [categories, updateCategories] = useState([]);

    useEffect(() => {
        LibraryRepository.fetchCategories()
            .then(data => updateCategories(data.data))
    }, []);

    function EditCategoryName(category) {
        return category.charAt(0) + category.slice(1).toLowerCase();
    }

    return (
        <div className="container m-4">
            <div className="row row-cols-md-2 row-cols-lg-4 justify-content-center">
                {categories.map(c => {
                    return (
                        <div key={c} className="card m-2 col" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{EditCategoryName(c)}</h5>
                                <p className="card-text">Some description of the category.</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Categories