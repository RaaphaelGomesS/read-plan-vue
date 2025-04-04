<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  }
}
</script>

<style scoped>

.v-main {
  background-color: #F6F0F0;
}

</style>