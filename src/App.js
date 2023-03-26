import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Books from "./components/Books/BooksList/Books";
import BooksAdd from "./components/Books/BooksAdd/BooksAdd";
import Header from "./components/Header/Header";
import BooksEdit from "./components/Books/BooksEdit/BooksEdit";
import Categories from "./components/Categories/Categories";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <main>
                <div className="container">
                    <Routes>
                        <Route path="/books" element={<Books/>}/>
                        <Route path="/" element={<Books/>}/>
                        <Route path="/books/add" element={<BooksAdd/>}/>
                        <Route path="/books/edit/:id" element={<BooksEdit/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;
