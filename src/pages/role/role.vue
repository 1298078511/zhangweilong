<template>
  <div>
    <el-button type="primary" @click="willAdd()">添加</el-button>
    <v-list :list='list' @init='init' @edit='edit'></v-list>
    <v-from :info='info' @init='init' ref="from"></v-from>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleList } from '../../utils/http';
import vList from "./components/list";
import vFrom from "./components/from";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "角色添加",
      },
      //初始化list
      list:[]
    };
  },
  methods: {
    ...mapActions({}),
    willAdd() {
        this.info.isShow = true;
        this.info.title = '角色添加'
    },
    //封装请求
    init(){
        reqRoleList().then(res=>{
            this.list = res.data.list
        })
    },
    edit(id){
       //重置info
       this.info = {
            isShow: true,
            title: "角色编辑",
       }
       //调用子组件from的getOne
       this.$refs.from.getOne(id)
    },
  },
  mounted(){
    //   一进来页面就发送请求
    this.init()
  },
  computed: {
    ...mapGetters({}),
  },
  components: {
    vList,
    vFrom,
  },
};
</script>

<style scoped>
</style>