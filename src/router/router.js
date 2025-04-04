import { createRouter, createWebHistory } from 'vue-router'
import SearchPlanner from '@/components/SearchPlanner.vue';
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
    name: 'SearchPlanner',
    component: SearchPlanner
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