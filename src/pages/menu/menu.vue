<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>
      <!-- 列表 -->
      <!-- 将数据传输给v-list -->
      <v-list :list='list' @init='init' @edit='edit($event)'></v-list>
      <!-- 弹框 -->
      <!-- 将数据传输给v-from -->
      <v-from :info='info' :list='list' @init='init' ref='from'></v-from>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
//引入组件
import vList from './components/list'
import vFrom from './components/from'
import { reqMenuList } from '../../utils/http'
export default {
    data(){
        return {
            info:{
                isShow:false,
                title:'添加菜单'
            },
            //列表数据 由于list.vue 和form.vue都要使用列表数据，所以将列表数据放到menu.vue中，分别传递给list.vue和form.vue
            list:[]
        }
    },
    methods:{
        ...mapActions({}),
        willAdd(){
            this.info.isShow = true,
            this.info.title = '添加菜单'
        },
        init(){
            reqMenuList().then(res=>{
                console.log(res)
                this.list = res.data.list
            })
        },
        //从新编写edit编辑
        edit(id){
            //出现弹框
            this.info.isShow = true;
            //给info添加一个字段,用来判断是添加点击还是编辑点击的按钮
            this.info.title = '编辑菜单';
            //父组件调用子组件的方法
            this.$refs.from.getOne(id)
        }
    },
    mounted(){
        this.init();
    },
    computed:{
        ...mapGetters({})
    },
    //注册组件
    components:{
        vList,
        vFrom
    }
}
</script>

<style>

</style>