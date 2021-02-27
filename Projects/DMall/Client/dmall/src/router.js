import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/Users.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', name: "welcome", component: Welcome },
        { path: '/users', name: "users", component: Users },
      ]
    }
  ]
})

/*to:目标地址，from：当前地址，next函数*/
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (to.path == "/login" || to.path == "/" || token) return next();
  return next('/');
});

export default router
