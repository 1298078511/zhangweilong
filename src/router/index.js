import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from "../store"

function checkedEnter(path,next){
    if(store.state.userInfo.menus_url.includes(path)){
      next()
    }else{
      next("/")
    }
  }
export let routes=[
    {
        path:"menu",
        name:"菜单管理",
        component:()=>import("../pages/menu/menu")
    }, {
        path:"role",
        name:"角色管理",
        component:()=>import("../pages/role/role")
    }, {
        path:"manage",
        name:"管理员管理",
        component:()=>import("../pages/manage/manage")
    }, {
        path:"cate",
        name:"商品分类",
        component:()=>import("../pages/cate/cate")
    }, {
        path:"specs",
        name:"商品规格",
        component:()=>import("../pages/specs/specs")
    }, {
        path:"goods",
        name:"商品管理",
        component:()=>import("../pages/goods/goods")
    }, {
        path:"vip",
        name:"会员管理",
        component:()=>import("../pages/vip/vip")
    }, {
        path:"banner",
        name:"轮播图管理",
        component:()=>import("../pages/banner/banner")
    },{
        path:"seckill",
        name:"秒杀活动",
        component:()=>import("../pages/seckill/seckill")
    }
]



let router= new Router({
    routes:[
        {
            path:"/login",
            component:()=>import("../pages/login/login")
        },
        {
            path:"/",
            component:()=>import("../pages/index/index"),
            children:[
                {
                    path:"",
                    component:()=>import("../pages/home/home")
                }, 
                ...routes
            ]
        },
      
    ]
})
//登录拦截
router.beforeEach((to,from,next)=>{
    //前往"/login",next
    if(to.path=="/login"){
      next()
      return;
    }
    //前往的不是登录，查看是否登录
    if(store.state.userInfo.token){
      next()
      return;
    }
    next("/login")
  })
  
  export default router