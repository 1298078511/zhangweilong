import { reqSpecsList,reqSpecsCount } from '../../utils/http'
const state = {
    //列表数据
    list:[],
    //总数量
    total:0,
    //一页展示的数量
    size:2,
    //页码
    page:1
}

const mutations = {
    changeList(state,arr){
        state.list = arr
    },
    changeTotal(state,num){
        state.total = num
    },
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    //发送请求
    reqList(context){
        reqSpecsList({page:context.state.page,size:context.state.size}).then(res=>{
            let list = res.data.list ? res.data.list : [];
            if(list.length == 0&&context.state.page>1){
                context.commit('changePage',context.state.page - 1);
                context.dispatch('reqList');
                return
            }
            list.forEach(item=>{
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit('changeList',list)
        })
    },
    //请求总数
    reqCount(context){
        reqSpecsCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    //修改页码
    changePage(context,page){
        //修改页码
        context.commit('changePage',page);
        //重新请求数据
        context.dispatch('reqList')
    }
}

const getters = {
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}

export default {
    state,mutations,actions,getters,
    namespaced: true
}