<template>
  <v-container>
    <v-row class="title-message" justify="center">
      <v-col cols="12" class="text-center">
        <h2>Meu plano de leituras</h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-4">
      <v-col cols="auto">
        <v-btn
          :class="tab === 'planned' ? 'active' : 'inactive'"
          @click="tab = 'planned'"
        >
          Planejadas
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          :class="tab === 'finished' ? 'active' : 'inactive'"
          @click="tab = 'finished'"
        >
          Concluídas
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="tab === 'planned'">
      <div v-if="books.length > 0">
        <draggable v-model="books" item-key="id" tag="v-row" @end="onDragEnd">
          <template #item="{ element: book, index }">
            <v-col :key="book.id" cols="12" sm="6" md="4">
              <v-card class="ma-2 pa-2">
                <v-card-title>{{ book.title }}</v-card-title>
                <v-card-subtitle>{{ book.author }}</v-card-subtitle>

                <v-card-text class="ma-2 pa-2">
                  <p>{{ book.publisher }}</p>
                  <p>{{ book.categories }}</p>
                  <p>{{ book.pages }}</p>
                  <v-img
                    :src="book.img"
                    :alt="book.title"
                    class="book-thumbnail"
                    height="200"
                    contain
                  ></v-img>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="error" @click="removeBook(book.id, index)">
                    Remover
                  </v-btn>
                  <v-btn color="success" @click="finishBook(book.id, index)">
                    Concluído
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </draggable>
      </div>

      <div v-else>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p>Nenhuma leitura foi planejada.</p>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab === 'finished'">
      <div v-if="finishedBooks.length > 0">
        <v-row>
          <v-col
            v-for="(book, index) in finishedBooks"
            :key="book.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="ma-2 pa-2">
              <v-card-title>{{ book.title }}</v-card-title>
              <v-card-subtitle>{{ book.author }}</v-card-subtitle>

              <v-card-text class="ma-2 pa-2">
                <p>{{ book.publisher }}</p>
                <p>{{ book.categories }}</p>
                <p>{{ book.pages }}</p>
                <v-img
                  :src="book.img"
                  :alt="book.title"
                  class="book-thumbnail"
                  contain
                ></v-img>
              </v-card-text>

              <v-card-actions>
                <v-btn color="primary" @click="unfinish(book.id, index)">
                  Voltar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p>Nenhuma leitura foi concluída.</p>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import {
  loadBooks,
  loadFinishedBooks,
  saveBooks,
  deleteBook,
  finishBook,
  unfinishBook,
} from "@/service/connectAPI";

export default {
  name: "SelectedBooks",
  components: {
    draggable,
  },
  data() {
    return {
      tab: "planned",
      books: [],
      finishedBooks: [],
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

    async removeBook(id, index) {
      this.books.splice(index, 1);
      await deleteBook(id);
    },

    async finishBook(id, index) {
      const finishedBook = this.books.splice(index, 1)[0];
      this.finishedBooks.push(finishedBook);
      await finishBook(id);
    },

    async unfinish(id, index) {
      const returnedBook = this.finishedBooks.splice(index, 1)[0];
      this.books.push(returnedBook);

      await unfinishBook(id);
    },
    async onDragEnd() {
      try {
        await saveBooks(this.books);
      } catch (error) {
        console.error("Erro ao salvar nova ordem:", error);
      }
    },
  },

  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.active {
  background-color: #352f44 !important;
  color: white !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.inactive {
  background-color: #dbd8e3 !important;
  color: #352f44 !important;
  box-shadow: none;
  transition: 0.3s;
}

.v-card-text {
  padding: 10px;
}

.title-message {
  margin-top: 30px;
}

.book-thumbnail {
  width: 100px;
  margin-left: 10px;
  padding: 20px;
}
</style>
