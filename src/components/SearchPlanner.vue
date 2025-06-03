<template>
  <div>
    <Search @save-selected="saveSelectedBooks" @book-searched="addSearched" />
    <FoundBooks
      :books="searchedBooks"
      @update-selection="selectionUpdate"
    />
  </div>
</template>

<script>
import Search from './Search.vue';
import FoundBooks from './FoundBooks.vue';
import { saveBooks } from '@/service/asyncStorage';

export default {
  name: 'SearchPlanner',
  components: { Search, FoundBooks },
  data() {
    return {
      searchedBooks: [],
      selectedBooks: [],
    };
  },
  methods: {
    addSearched(bookData) {
      this.searchedBooks = bookData.length ? bookData : [];
    },
    selectionUpdate(selected) {
      this.selectedBooks = selected;
    },
    async saveSelectedBooks() {
      if (this.selectedBooks.length === 0) {
        alert('Nenhum livro selecionado para salvar!');
        return;
      }
      try {
        await saveBooks(this.selectedBooks);
        alert('Livros salvos com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar os livros:', error);
      }
    },
  },
};
</script>