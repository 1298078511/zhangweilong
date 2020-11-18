<template>
  <div>
    <el-button type="primary" @click="willAdd()">添加</el-button>
    <v-list :list="list" @init="newInit" @edit="edit" :info="info"></v-list>
    <v-from :info="info" @init="newInit" ref="from"></v-from>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vFrom from "./components/from";
import vList from "./components/list";
import { reqManageList, reqManageCount } from "../../utils/http";
export default {
  data() {
    return {
      //初始化info
      info: {
        isShow: false,
        title: "用户添加",
      },
      //初始化list
      list: [],
      //初始化页码
      total: 0,
      size: 2,
      page: 1,
    };
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isShow = true;
    },
    //列表请求
    init() {
      reqManageList({ page: this.page, size: this.size }).then((res) => {
        let list = res.data.list?res.data.list:[]
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
      });
    },
    //编辑
    edit(uid) {
      this.info = {
        isShow: true,
        title: "编辑角色",
      };
      this.$refs.from.getOne(uid);
    },
    //获取页码总数量
    getCount() {
      reqManageCount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    //页码发生变化的时候重新请求
    changePage(page) {
      this.page = page;
      this.init();
    },
    //添加或者删除会引起总数的变化,所以要重新渲染
    newInit() {
      this.init();
      this.getCount();
    },
  },
  mounted() {
    // 一进来就发送ajax请求渲染列表
    this.init();
    //一进来就直接获取页码的数量
    this.getCount();
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

<style>
.el-pagination {
  margin-top: 10px;
}
</style>