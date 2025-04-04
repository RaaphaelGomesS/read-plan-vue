<template>
  <div>
    <h2>Meu plano de leituras</h2>
    <ul v-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        <h3>{{ book.title }}</h3>
        <p>{{ book.authors }}</p>
        <p>{{ book.publisher }}</p>
        <p>{{ book.categories }}</p>
        <p>{{ book.pages }}</p>
        <div>
          <img :src="book.image" :alt="book.title" class="book-thumbnail" />
        </div>
        <button @click="removeBook(index)">Remover</button>
      </li>
    </ul>
    <p v-else>Nenhum livro salvo ainda.</p>
  </div>
</template>

<script>

import { loadBooks, saveBooks } from '@/service/asyncStorage';

export default {
  name: "SelectedBooks",
  data() {
    return {
      books: []
    };
  },

  methods: {
    async fetchBooks() {
      try {
        this.books = await loadBooks();
      } catch (error) {
        console.error("Erro ao carregar os livros:", error);
      }
    },

    async removeBook(index) {
      this.books.splice(index, 1);
      await saveBooks(this.books);
    },
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