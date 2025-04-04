<template>
  <div>
    <v-row>
      <v-col v-for="book in books" :key="book.id" cols="12" sm="6" md="4">
        <v-card :class="{ selected: selectedBooks.includes(book) }" @click="toggleSelection(book)">
          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-subtitle>{{ book.authors }}</v-card-subtitle>
          <v-card-text>
            <p>{{ book.publisher }}</p>
            <p>{{ book.categories }}</p>
            <p>{{ book.pages }}</p>
          </v-card-text>
          <v-img :src="book.image" :alt="book.title" class="book-thumbnail" height="200" contain></v-img>
        </v-card>
      </v-col>
    </v-row>
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
.selected {
  background-color: #def;
}

.v-card-text {
  padding: 10px;
}

.book-thumbnail {
  width: 100px;
  margin-left: 10px;
  padding: 20px;
}

</style>