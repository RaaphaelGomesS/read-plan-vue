<template>
    <div>
        <Search @book-searched="addSearched" />
        <button @click="saveSelectedBooks">Salvar</button>
        <FoundBooks :books="searchedBooks" @update-selection="selectionUpdate" />
    
    </div>
</template>

<script>

import Search from './Search.vue';
import FoundBooks from './FoundBooks.vue';
import { saveBooks } from '@/service/asyncStorage';

export default {
    name: "SearchPlanner",
    components: { Search, FoundBooks },
    data() {
        return {
            searchedBooks: [],
            selectedBooks: []
        };
    },

    methods: {
        addSearched(bookData) {
            if (this.searchedBooks.length !== 0) {
                this.searchedBooks = [];
            }

            this.searchedBooks = bookData;
        },

        selectionUpdate(selected) {
            this.selectedBooks = selected;
        },

        async saveSelectedBooks() {
            try {
                await saveBooks(this.selectedBooks);
                alert("Livros salvos com sucesso!");
            } catch (error) {
                console.error("Erro ao salvar os livros:", error);
            }
        }
    }
};
</script>

<style></style>