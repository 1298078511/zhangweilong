<template>
  <div>
    <div>
      <!-- 23.list展示在页面 -->
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children'}"
      >
        <el-table-column prop="id" label="用户编号" ></el-table-column>
        <el-table-column prop="nickname" label="昵称" ></el-table-column>
        <el-table-column prop="phone" label="手机号" >  </el-table-column>
        

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    
    </div>
  </div>
</template>
 

<script>
import { reqmemeberDetail } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
 
  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList",
    }),
    edit(uid) {
      this.$emit("edit", uid);

    },
     // 获取详情
    // getOne(uid) {
    //   reqmemeberDetail(uid).then(res => {
    //     // 此刻user没有id
    //     this.user = res.data.list[0];
    //     this.addAttr = JSON.parse(this.user.attrs).map((item) => ({
    //       value: item,
    //     }));
    //     // 补id
    //     this.user.uid = uid;
    //   });
    // },
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