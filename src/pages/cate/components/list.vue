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
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt v-if="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)" style="display:inline-block"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  mounted() {
    this.reqList();
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    //当点击了删除之后
    del(id) {
      //删除的请求
      reqCateDel(id).then((res) => {
        if (res.data.code == 200) {
          //成功的弹框
          successAlert(res.data.msg);
          //刷新list
          this.reqList();
        }
      });
    },
    //当点击了编辑之后
    edit(id){
      this.$emit('edit',id)
    }
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>