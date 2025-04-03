<template>
    <nav class="navbar">
      <ul class="nav-list">
        <li>
          <router-link to="/">Inicial</router-link>
        </li>
        <li>
          <router-link to="/search">Buscar</router-link>
        </li>
        <li>
          <router-link to="/list">Lista de livros</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar"
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 10px;
  }
  
  .nav-list {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }
  
  .nav-list li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .nav-list li a:hover {
    text-decoration: underline;
  }
  </style>