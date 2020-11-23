import {
    reqseckList,
 
  } from "../../utils/http"
  const state = {
    //分类list
    list: [],
    //总数
    title:"",
    begintime:"",
    endtime:"",
    first_cateid:"",
    second_cateid:"",
    goodsid:"",
  }
  
  const mutations = {
    //修改list
    changeList(state,arr){
        state.list=arr
    }
  }
  
  const actions = {
    //发起请求
    reqList(context) {
      //发请求，成功之后，修改list
      reqseckList().then(res => {
        context.state.list = res.data.list;
      });
    //请总数
    
  }
}
  
  const getters = {
    list(state){
        return state.list
    },
    title(state){
        return state.title
    },
    begintime(state){
        return state.begintime
    },
    endtime(state){
        return state.endtime
    },
    first_cateid(state){
        return state.first_cateid
    },
    second_cateid(state){
        return state.second_cateid
    },
    goodsid(state){
        return state.goodsid
    },
  
  
  }
  
  export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
  }
  