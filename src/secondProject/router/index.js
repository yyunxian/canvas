import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/secondProject/App.vue'),
      // 当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性。
      children: [
        {
          // 首页
          path: '/',
          name: 'HomePage',
          component: () => import('@/secondProject/pages/Home.vue')
        },
        {
          // 拖拽
          path: '/secondProject/pages/drag',
          name: 'Drag',
          component: () => import('@/secondProject/pages/drag.vue')
        },
      ],
    }
  ]
})
