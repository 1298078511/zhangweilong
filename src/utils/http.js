import axios from 'axios';
import qs from 'qs';
import { errorAlert } from './alert'
import store from '../store'
import Vue from 'vue'

//开发环境使用
let baseUrl = '/my';
Vue.prototype.$imgPre = "http://localhost:3000"

//生产环境使用
// let baseUrl = '';
// Vue.prototype.$imgPre=" "



// --------------------------菜单开始---------------------------
//添加
export const reqMenuAdd = (from) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        //避免后台拿不到数据,用qs转换一下
        data: qs.stringify(from)
    })
}

//menu的列表交互
export const reqMenuList = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }
    })
}

//menu删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//只请求一条数据
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}

//菜单修改的请求
export const reqMenuUpdate = (from) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(from)
    })
}
//------------------菜单结束-------------------

//------------------角色开始-------------------
//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
//角色添加
export const reqRoleAdd = (from) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(from)
    })
}
//角色删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: {
            id: id
        }
    })
}
//获取一条数据
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//角色修改
export const reqRoleUpdate = (from) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: qs.stringify(from)
    })
}
//---------------------角色结束----------------------

//---------------------管理员开始--------------------
//管理员添加
export const reqManageAdd = (from) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(from)
    })
}
//管理员总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + '/api/usercount',
        method: 'get'
    })
}
//管理员列表 分页 p = {page:0,size:0}
export const reqManageList = (p) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params: p
    })
}
//管理员获取一条
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        method: 'get',
        params: {
            uid: uid
        }
    })
}
//管理员修改
export const reqManageUpdate = (from) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: qs.stringify(from)
    })
}
//管理员删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: {
            uid: uid
        }
    })
}
//管理员登录
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: qs.stringify(user)
    })
}
//------------------------管理员结束-----------------------

//------------------------商品分类开始---------------------
//商品分类添加
export const reqCateAdd = (cate) => {
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: d
    })
}
//商品列表
export const reqCateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}
//商品分类获取一条
export const reqCateInfo = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//商品分类修改
export const reqCateUpdate = (cate) => {
    let d = new FormData();
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: d
    })
}
//商品分类删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}
//-------------------------商品分类结束--------------------------

//-------------------------商品规格开始--------------------------
//商品规格添加
export const reqSpecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//商品规格列表 p={page:1,size:10}
export const reqSpecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//商品规格删除删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//商品规格只获取一条
export const reqSpecsInfo = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//商品规格修改
export const reqSpecsUpdate = (user) => {

    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}
//------------------------商品规格结束-------------------------

//------------------------会员管理开始-------------------------
//会员管理列表
export const reqVipList = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get'
    })
}
//请求一条
export const reqVipInfo = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: {
            uid: uid
        }
    })
}
//会员修改
export const reqVipUpdate = (user) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(user)
    })
}
//------------------会员管理结束----------------------

//------------------轮播图管理------------------------
//添加
export const reqBannerAdd = (user) => {
    let d = new FormData();
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data:d
    })
}
//列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + '/api/bannerlist',
        method:'get'
    })
}
//获取一条
export const reqBannerDetail = (id) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        method: 'get',
        params:{
            id:id
        }
    })
}
//修改
export const reqBannerUpdate = (user) => {
    let d = new FormData
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + '/api/banneredit',
        method:'post',
        data:d
    })
}
//删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        params:{
            id:id
        }
    })
}
//-----------------------轮播图管理结束------------------------

//-----------------------商品管理开始--------------------------
//添加
export const reqGoodsAdd = (goods) => {
    let d = new FormData
    for(let i in goods){
        d.append(i,goods[i])
    }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data:d
    })
}
//总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + '/api/goodscount',
        method: 'get'
    })
}
//列表 p={page:1,size:10}
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//详情只获取一条
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



//修改 文件
export const reqgoodsUpdate = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}


//-----------------------商品管理结束--------------------------


//登录拦截
axios.interceptors.request.use(req => {
    if (req.url != baseUrl + '/api/userlogin') {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req
})

//响应拦截
axios.interceptors.response.use(res => {
    console.log('本次请求地址是', res.config.url);
    console.log(res);
    if (res.data.code != 200) {
        errorAlert(res.data.msg)
    }
    return res;
})