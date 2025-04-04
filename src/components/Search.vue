<template>
  <div>
    <h1>{{ adaptativeText }}</h1>
    <div>
      <select v-model="selectedOption" >
        <option disabled value="select">Selecione uma opção</option>
        <option value="book">Livro</option>
        <option value="author">Autor/a</option>
      </select>
      <input type="text" v-model="inputText" />
      <button @click="search">Pesquisar</button>
    </div>
  </div>
</template>

<script>

import { searchBook, searchAuthor } from '@/searchBook';

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
          console.log(this.inputText)
      if (this.selectedOption == "book") {
        try {
          const bookData = await searchBook(this.inputText);
          console.log(bookData);
          this.$emit("book-searched", bookData);
        } catch (error) {
          console.error("Erro ao buscar o livro:", error);
        }
      } else {
        try {
          const bookData = await searchAuthor(this.inputText);
          console.log(bookData);
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