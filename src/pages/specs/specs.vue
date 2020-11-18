<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-from :info='info' ref='from'></v-from>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vFrom from "./components/from";
import vList from "./components/list";
export default {
  data() {
    return {
      //初始化info
      info: {
        isShow: false,
        title: "商品添加",
      },
    };
  },
  methods: {
    ...mapActions({}),
    //当点击了添加之后
    willAdd() {
      this.info = {
        isShow: true,
        title: "商品添加",
      };
    },
    //编辑
    edit(id){
      this.info = {
        isShow:true,
        title:'商品编辑'
      }
      this.$refs.from.getOne(id)
    }
  },
  computed: {
    ...mapGetters({}),
  },
  components: {
    vFrom,
    vList,
  },
};
</script>

<style>
</style>