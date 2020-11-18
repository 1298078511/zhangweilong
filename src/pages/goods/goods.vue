<template>
  <div>
    <el-button type="primary">添加</el-button>
    <v-list :info="info"></v-list>
    <v-from :info="info"></v-from>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list'
import vFrom from './components/from'
export default {
  data(){
      return {
          //初始化info
          info:{
              isShow:true,
              title:'商品添加'
          }
      }
  },
  methods: {
    ...mapActions({}),
  },
  computed: {
    ...mapGetters({}),
  },
  components:{
      vList,
      vFrom
  }
};
</script>

<style>
</style>