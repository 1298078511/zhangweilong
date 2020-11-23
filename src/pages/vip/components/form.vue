<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="list">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="list.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="list.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="list.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="list.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqmemeberDetail, reqmemberUpdate } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      list: {
        phone: "",
        nickname: "",
        password: "",
        uid:"",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList",
    }),
    // user置空
    empty() {
      this.list = {
        phone: "",
        nickname: "",
        password: "",
        uid:"",
        status: 1,
      };
    },
    cancel(){
      this.info.isshow = false;
    },

    // 获取详情
    getOne(uid) {
      reqmemeberDetail(uid).then(res => {
        // 此刻user没有id
        this.list = res.data.list;
         this.list.password = "";
        // 补id
        this.list.uid = uid;
      });
    },
    // 修改
    update() {
      reqmemberUpdate(this.list).then(res => {
        console.log(this.list);
        if (res.data.code == 200) {
          // 弹个成功
          successAlert("更新成功");
          // 弹框消失
          this.cancel();
          // form置空
          this.empty();
          // 列表数据刷新list
          this.reqList();
        }
      });
    },
    // 处理消失
    closed() {
      if (this.info.title === "编辑规格") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>

<style scoped >
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>