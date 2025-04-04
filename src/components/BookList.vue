<template>
  <v-container>
    <v-row class="title-message" justify="center">
      <v-col cols="12" class="text-center">
        <h2>Meu plano de leituras</h2>
      </v-col>
    </v-row>
    <div v-if="books.length > 0">
      <v-row>
        <v-col v-for="(book, index) in books" :key="book.id" cols="12" sm="6" md="4">
          <v-card class="ma-2 pa-2">
            
            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-subtitle>{{ book.authors }}</v-card-subtitle>
            
            <v-card-text>
              <p>{{ book.publisher }}</p>
              <p>{{ book.categories }}</p>
              <p>{{ book.pages }}</p>
              <v-img :src="book.image" :alt="book.title" class="book-thumbnail" height="200" contain></v-img>
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="error" @click="removeBook(index)">Remover</v-btn>
              <v-btn color="success" @click="finishBook(index)">Concluído</v-btn>
            </v-card-actions>
          
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <p>Nenhuma leitura foi planejada.</p>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center" class="title-message" v-if="finishedBooks.length > 0">
      <v-col cols="12" class="text-center">
        <h2>Leituras concluídas</h2>
      </v-col>
    </v-row>

    <div>
      <v-row>
        <v-col v-for="(book, index) in finishedBooks" :key="book.id" cols="12" sm="6" md="4">
          <v-card class="ma-2 pa-2">
            
            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-subtitle>{{ book.authors }}</v-card-subtitle>
            
            <v-card-text>
              <p>{{ book.publisher }}</p>
              <p>{{ book.categories }}</p>
              <p>{{ book.pages }}</p>
              <v-img :src="book.image" :alt="book.title" class="book-thumbnail" contain></v-img>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="comeback(index)">Voltar</v-btn>
            </v-card-actions>
          
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
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
.v-card-text {
  padding: 10px;
}

.title-message {
  margin-top: 50px;
}

.book-thumbnail {
  width: 100px;
  margin-left: 10px;
  padding: 20px;
}

</style>