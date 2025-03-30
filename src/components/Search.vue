<template>
  <div>
    <h1>Digite o nome do {{option}}: </h1>
    <form>
      <select>
        <option>Livro</option>
        <option>Autor/a</option>
      </select>
      <input value="text"/>
      <button>Pesquisar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Search-comp",
};
</script>

<style scoped></style>
