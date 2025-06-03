<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="2">
          <v-card-title class="text-h5 justify-center">
            Cadastro
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field v-model="name" label="Nome" required prepend-inner-icon="mdi-account" />
              <v-text-field v-model="email" label="Email" type="email" required prepend-inner-icon="mdi-email" />
              <v-text-field v-model="password" label="Senha" type="password" required prepend-inner-icon="mdi-lock" />
              <v-btn type="submit" color="#352F44" block class="mb-2">
                Cadastrar
              </v-btn>
            </v-form>

            <div class="text-center">
              <span>Já tem uma conta?</span>
              <router-link to="/login"> Entre aqui</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { register } from '@/service/connectAPI';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        await register(this.name, this.email, this.password);
        alert('Cadastro realizado com sucesso!');
        this.$router.push('/login');
      } catch (error) {
        alert('Erro no cadastro. Verifique os dados.');
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f8;
}

.auth-card {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:disabled {
  background-color: #93d7a5;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1e7e34;
}

.error {
  color: red;
  text-align: center;
  margin-top: 0.75rem;
}

.redirect {
  margin-top: 1rem;
  text-align: center;
}

.redirect a {
  color: #28a745;
  text-decoration: none;
}
</style>