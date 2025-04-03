import { createRouter, createWebHistory } from 'vue-router'
import Search from '@/components/Search.vue'
import BookList from '@/components/BookList.vue';
import Home from '@/components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/list',
    name: 'BookList',
    component: BookList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;