<template>
  <v-app-bar fixed color="#5C5470">

    <v-img src="/book-shelf.png" max-height="40" max-width="40" contain class="ml-5"></v-img>

    <v-spacer></v-spacer>

    <v-tabs>
      <v-tab to="/">Inicial</v-tab>
      <v-tab to="/search">Buscar</v-tab>
      <v-tab to="/list">Lista de livros</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.v-tabs-bar {
  float: left !important;
}
</style>