<template>
  <div>
    <h2>Meu plano de leituras</h2>
    <ul v-if="books.length > 0">
      <li v-for="(book, index) in books" :key="book.id">
        <h3>{{ book.title }}</h3>
        <p>{{ book.authors }}</p>
        <p>{{ book.publisher }}</p>
        <p>{{ book.categories }}</p>
        <p>{{ book.pages }}</p>
        <div>
          <img :src="book.image" :alt="book.title" class="book-thumbnail" />
        </div>
        <button @click="removeBook(index)">Remover</button>
        <button @click="finishBook(index)">Concluído</button>
      </li>
    </ul>
    <p v-else>A próxima leitura ainda não foi planejada.</p>
  </div>

  <div v-if="finishedBooks.length > 0">
    <h2>Leituras concluídas</h2>
    <ul>
      <li v-for="(book, index) in finishedBooks" :key="book.id">
        <h3>{{ book.title }}</h3>
        <p>{{ book.authors }}</p>
        <p>{{ book.publisher }}</p>
        <p>{{ book.categories }}</p>
        <p>{{ book.pages }}</p>
        <div>
          <img :src="book.image" :alt="book.title" class="book-thumbnail" />
        </div>
        <button @click="comeback(index)">Voltar</button>
      </li>
    </ul>
  </div>
</template>

<script>

import { loadBooks, loadFinishedBooks, saveBooks, saveFinishedBooks } from '@/service/asyncStorage';

export default {
  name: "SelectedBooks",
  data() {

    return {
      books: [],
      finishedBooks: []
    };
  },

  methods: {
    async fetchBooks() {
      try {
        this.books = await loadBooks();
        this.finishedBooks = await loadFinishedBooks();
      } catch (error) {
        console.error("Erro ao carregar os livros:", error);
      }
    },

    async removeBook(index) {
      this.books.splice(index, 1);
      await saveBooks(this.books);
    },

    async finishBook(index) {
      const finishedBook = this.books.splice(index, 1)[0];
      await saveBooks(this.books);

      this.finishedBooks.push(finishedBook);
      await saveFinishedBooks(this.finishedBooks);
      console.log(finishedBook);
    },

    async comeback(index) {
      const returnedBook = this.finishedBooks.splice(index, 1)[0];
      await saveFinishedBooks(this.finishedBooks);
      
      this.books.push(returnedBook);
      await saveBooks(this.books);
    }
  },

  mounted() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}

img {
  max-width: 100px;
  height: auto;
  display: block;
  margin-top: 10px;
}
</style>