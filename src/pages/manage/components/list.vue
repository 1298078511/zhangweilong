<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" width="100px"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn style="display:inline-block" @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqManageDel } from "../../../utils/http";
export default {
  props: ["list", "info"],
  methods: {
    ...mapActions({}),
    //当点击了删除之后
    del(uid) {
      //发送删除的请求
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          //成功弹窗
          successAlert(res.data.msg);
          //通知父组件刷新
          this.$emit("init");
        }
      });
    },
    //当点击了编辑之后
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>