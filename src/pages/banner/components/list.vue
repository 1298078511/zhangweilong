<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" ></el-table-column>
      <el-table-column prop="title" label="轮播图标题" ></el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt v-if="scope.row.pid!=0"/>
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
          <el-button type="primary" @click="edit(scope.row.id)" >编辑</el-button>
          <!-- 32.绑定confirm事件 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 

<script>
import { reqbannerDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
 
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    del(id) {
      reqbannerDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
   edit(id) {
      this.$emit("edit", id);
    
    },
   
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style  scoped>
img {
  width: 80px;
  height: 80px;
}
</style>