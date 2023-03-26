import axios from '../custom-axios/axios'

const LibraryRepository = {
    fetchAuthors: () => {
        return axios.get("/authors");
    },

    fetchBooks: (page, size) => {
        return axios.get("/books", {
            params: {
                "page": page,
                "size": size
            }
        });
    },

    fetchBookById: (id) => {
        return axios.get(`/books/${id}`);
    },

    fetchNumberOfBooks: () => {
        return axios.get('/books/num-books');
    },

    fetchCategories: () => {
        return axios.get('/categories')
    },

    saveBook: (name, category, availableCopies, authorId) => {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('category', category);
        params.append('availableCopies', availableCopies);
        params.append('authorId', authorId);

        return axios.post('/books/save', params);
    },

    editBook: (id, name, category, availableCopies, authorId) => {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('category', category);
        params.append('availableCopies', availableCopies);
        params.append('authorId', authorId);

        return axios.put(`/books/edit/${id}`, params);
    },

    deleteBook: (id) => {
        return axios.post(`/books/delete/${id}`)
    },

    decrementAvailableCopies: (id) => {
        return axios.put(`/books/available-copies/${id}`)
    }
}

export default LibraryRepository