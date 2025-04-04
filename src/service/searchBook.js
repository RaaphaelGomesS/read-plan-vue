import axios from 'axios';

export async function searchBook(value) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`);

        return (response.data.items || []).map((book, index) => ({
            id: index + 1,
            title: book.volumeInfo.title,
            authors: Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors,
            categories: Array.isArray(book.volumeInfo.categories) ? book.volumeInfo.categories.join(', ') : book.volumeInfo.categories,
            pages: book.volumeInfo.pageCount,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }))
    } catch (error) {
        console.error("Error ao buscar livro: ", error);
        return [];
    }
}

export async function searchAuthor(value) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${value}`);

        return (response.data.items || []).map((book, index) => ({
            id: index + 1,
            title: book.volumeInfo.title,
            authors: Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors,
            categories: Array.isArray(book.volumeInfo.categories) ? book.volumeInfo.categories.join(', ') : book.volumeInfo.categories,
            pages: book.volumeInfo.pageCount,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }))
    } catch (error) {
        console.error("Error ao buscar livros do autor: ", error);
        return [];
    }
}