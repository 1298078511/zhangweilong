<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>

        <v-list :list="list" @init="init" @edit="edit"></v-list>

     <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import {reqRoleList} from "../../utils/http"
import vList from "./components/list.vue"
import vForm from "./components/form.vue"

export default {
components:{
    vList,
    vForm
},
data() {
  return {
    info:{
      isshow:false,
      title:"添加角色"
    },
    list:[],
  }
},
 methods: {
      init(){
          reqRoleList().then(res=>{
            this.list=res.data.list
          })
      },
      edit(id){
        this.info={
          isshow:true,
          title:"编辑角色",
        }
        this.$refs.form.getOne(id)
      },
      willAdd(){
      this.info={
          isshow:true,
          title:"添加角色",
        }
    }
    },
     mounted() {
      this.init()
    },
}
</script>

<style>

</style>