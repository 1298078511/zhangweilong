import {
    reqmemberList,
 
  } from "../../utils/http"
  const state = {
    //分类list
    list: [],
    //总数
   uid:"",
   nickname:"",
   phone:"",
   password:"",
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
      reqmemberList().then(res => {
        context.state.list = res.data.list;
      });
    //请总数
    
  }
}
  
  const getters = {
    list(state){
        return state.list
    },
    uid(state){
        return state.uid
    },
    nickname(state){
        return state.nickname
    },
    phone(state){
        return state.phone
    },
    password(state){
        return state.password
    },
  
  }
  
  export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
  }
  