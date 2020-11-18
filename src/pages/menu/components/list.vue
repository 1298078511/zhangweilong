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
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuAdd, reqMenuDel } from "../../../utils/http";
import { successAlert,errorAlert } from '../../../utils/alert';
export default {
  props: ["list"],
  methods: {
    ...mapActions({}),
    //当点击删除按钮之后
    del(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除的ajax请求
          reqMenuDel(id).then(res=>{
              if(res.data.code == 200){
                  successAlert(res.data.msg);
                  //通知menu刷新数据
                  this.$emit('init');
              }else{
                  errorAlert(res.data.msg);
              }
          })
        })
        .catch(() => {
            console.log('你点击了取消')
        });
    },
    //当点击编辑之后
    edit(id){
        //通知父组件,要进行编辑了
        this.$emit('edit',id)
    }
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