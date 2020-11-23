import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import actions from './actions'
import {state, mutations,getters} from "./mutations"
import order from "./modules/order"
import cate from "./modules/cate"
import specs from "./modules/specs"
import vip from "./modules/vip"
import banner from "./modules/banner"
import seck from "./modules/seck"
import goods from "./modules/goods"




export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        order,
        cate,
        specs,
        vip,
        banner,
        seck,
        goods
    }
})