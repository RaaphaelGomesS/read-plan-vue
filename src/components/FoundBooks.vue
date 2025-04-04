<template>
  <div>
    <ul class="bookList">
      <li v-for="book in books" :key="book.id" :class="{ selected: selectedBooks.includes(book) }"
        @click="toggleSelection(book)">
        <h3>{{ book.title }}</h3>
        <p>{{ book.authors }}</p>
        <p>{{ book.publisher }}</p>
        <p>{{ book.categories }}</p>
        <p>{{ book.pages }}</p>
        <div>
          <img :src="book.image" :alt="book.title" class="book-thumbnail" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FoundBooks",
  props: {
    books: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectedBooks: []
    };
  },

  methods: {
    toggleSelection(book) {
      const index = this.selectedBooks.findIndex(b => b.id === book.id);
      if (index > -1) {
        this.selectedBooks.splice(index, 1);
      } else {
        this.selectedBooks.push(book);
      }
      this.$emit("update-selection", this.selectedBooks);
    }
  }
};
</script>

<style scoped>

.bookList {
  
}

.selected {
  background-color: #def;
}
</style>
