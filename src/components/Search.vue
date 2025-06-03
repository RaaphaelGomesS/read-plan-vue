<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="justify-center">
            <h2>{{ adaptativeText }}</h2>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="selectedOption" row>
              <v-radio label="Livro" value="book"></v-radio>
              <v-radio label="Autor/a" value="author"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="inputText"
              label="Digite sua pesquisa"
              outlined
              clearable
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="emitSave">Salvar selecionados</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="search">Pesquisar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { searchBook, searchAuthor } from '@/service/searchBook';

export default {
  name: 'SearchComp',
  data() {
    return {
      inputText: '',
      selectedOption: 'book',
    };
  },
  computed: {
    adaptativeText() {
      switch (this.selectedOption) {
        case 'book':
          return 'Digite o nome do livro:';
        case 'author':
          return 'Digite o nome do autor/a:';
        default:
          return 'Selecione uma opção';
      }
    },
  },
  methods: {
    async search() {
      if (this.inputText.trim() === '') return;

      try {
        const bookData =
          this.selectedOption === 'book'
            ? await searchBook(this.inputText)
            : await searchAuthor(this.inputText);

        this.$emit('book-searched', bookData);
      } catch (error) {
        console.error('Erro na busca:', error);
      }
    },
    emitSave() {
      this.$emit('save-selected');
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
