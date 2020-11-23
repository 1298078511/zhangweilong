<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- table -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import { reqMenuList } from "../../utils/http";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      //弹框状态，用对象直接可以改
      info: {
        isshow: false,
         title:"添加菜单"
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.title="添加菜单"
    },
    init() {
      reqMenuList().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.title = "编辑菜单";
      this.$refs.form.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>