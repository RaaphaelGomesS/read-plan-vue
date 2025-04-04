<template>
  <div>
    <h2>{{ adaptativeText }}</h2>
    <div>
      <input type="radio" id="book" value="book" v-model="selectedOption" />
      <label for="book">Livro</label>

      <input type="radio" id="author" value="author" v-model="selectedOption" />
      <label for="author">Autor/a</label>

      <input type="text" v-model="inputText" />
      <button @click="search">Pesquisar</button>
    </div>
  </div>
</template>

<script>

import { searchBook, searchAuthor } from '@/service/searchBook';

export default {
  name: "Search-comp",

  data() {
    return {
      inputText: "",
      selectedOption: "select"
    };
  },

  computed: {
    adaptativeText() {
      switch (this.selectedOption) {
        case "book":
          return "Digite o nome do livro :"
        case "author":
          return "Digite o nome do author/a :"
        case "select":
          return "Selecione uma opção"
        default: return "Selecione uma opção"
      }
    }
  },

  methods: {
    async search() {
      if (this.inputText.trim() === "") return;

      if (this.selectedOption == "book") {
        try {
          const bookData = await searchBook(this.inputText);
          this.$emit("book-searched", bookData);
        } catch (error) {
          console.error("Erro ao buscar o livro:", error);
        }
      } else {
        try {
          const bookData = await searchAuthor(this.inputText);
          this.$emit("book-searched", bookData);
        } catch (error) {
          console.error("Erro ao buscar o livro:", error);
        }
      }
    }
  }
};
</script>

<style scoped></style>