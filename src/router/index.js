import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)


//路由独享守卫
function checkedEnter(path, next) {
  // if (store.state.userInfo.menus_url.includes(path)) {
  //   next()
  // } else {
  //   next("/")
  // }
  next()
}

export let routes = [
  {
    path: 'menu',
    name: '菜单管理',
    component: () => import("../pages/menu/menu"),
    beforeEnter(to, from, next) {
      checkedEnter("/menu", next)
    }
  },
  {
    path: 'role',
    name: '角色管理',
    component: () => import("../pages/role/role"),
    beforeEnter(to, from, next) {
      checkedEnter("/role", next)
    }
  },
  {
    path: 'manage',
    name: '管理员管理',
    component: () => import("../pages/manage/manage"),
    beforeEnter(to, from, next) {
      checkedEnter("/manage", next)
    }
  },
  {
    path: 'cate',
    name: '商品分类',
    component: () => import("../pages/cate/cate"),
    beforeEnter(to, from, next) {
      checkedEnter("/cate", next)
    }
  },
  {
    path: 'specs',
    name: '商品规格',
    component: () => import("../pages/specs/specs"),
    beforeEnter(to, from, next) {
      checkedEnter("/specs", next)
    }
  },
  {
    path: 'goods',
    name: '商品管理',
    component: () => import("../pages/goods/goods"),
    beforeEnter(to, from, next) {
      checkedEnter("/goods", next)
    }
  },
  {
    path: 'vip',
    name: '会员管理',
    component: () => import("../pages/vip/vip"),
    beforeEnter(to, from, next) {
      checkedEnter("/vip", next)
    }
  },
  {
    path: 'banner',
    name: '轮播图管理',
    component: () => import("../pages/banner/banner"),
    beforeEnter(to, from, next) {
      checkedEnter("/banner", next)
    }
  },
  {
    path: 'seckill',
    name: '秒杀活动',
    component: () => import("../pages/seckill/seckill"),
    beforeEnter(to, from, next) {
      checkedEnter("/seckill", next)
    }
  }
]

let router = new Router({
  routes: [
    {
      path: '/',
      // name: '首页',
      component: () => import("../pages/index/index"),
      children: [
        {
          path: '',
          // name:'首页',
          component: () => import("../pages/home/home")
        },
        //将上面的路由拼接到这里
        ...routes
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import("../pages/login/login")

    }
  ]
})

router.beforeEach((to, from, next) => {
  //前往的是登录直接跳转
  if (to.path == '/login') {
    next();
    return;
  }
  //如果前往的不是登录,查看是否已经登录
  if (store.state.userInfo.token) {
    next();
    return;
  }
  next('/login');
})

export default router