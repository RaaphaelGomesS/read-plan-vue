import axios from 'axios';

export async function searchBook(value) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`);

        return response.data.items.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publisher: book.volumeInfo.publisher,
            categorie: book.volumeInfo.categories,
            pages: book.volumeInfo.pageCount,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""
        }))
    } catch (error) {
        console.error("Error ao buscar livro: ", error);
        return [];
    }
}

export async function searchAuthor(value) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${value}`);

        return response.data.items.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publisher: book.volumeInfo.publisher,
            categorie: book.volumeInfo.categories,
            pages: book.volumeInfo.pageCount,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""
        }))
    } catch (error) {
        console.error("Error ao buscar livros do autor: ", error);
        return [];
    }
}