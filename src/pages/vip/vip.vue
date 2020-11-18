<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-from :info="info" ref='from' @init='init'></v-from>
    <v-list :list="list" @edit='edit' @init='init'></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqVipList } from "../../utils/http";
import vFrom from "./components/from";
import vList from "./components/list";
export default {
  data() {
    return {
      //初始化info
      info: {
        isShow: false,
        title: "会员编辑",
      },
      list: [],
    };
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isShow: true,
      };
    },
    //请求列表
    init() {
      reqVipList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //编辑
    edit(uid){
        this.info = {
            isShow : true,
        }
        this.$refs.from.getOne(uid)
    }
  },
  computed: {
    ...mapGetters({}),
  },
  components: {
    vFrom,
    vList,
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>