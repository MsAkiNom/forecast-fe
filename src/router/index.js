import * as VueRouter from 'vue-router';

let routes = [
    {
      path: '/weather',
      component: () => import( '../views/Weather'),
      name: 'WeatherApp',
    },
    { path: '/', redirect: '/weather' }
  ]

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.VUE_APP_BASE),
    routes,
  })
  
  router.replace('/weather')
  export default router;
  