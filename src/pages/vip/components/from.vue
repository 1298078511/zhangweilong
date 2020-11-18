<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqVipInfo, reqVipUpdate } from "../../../utils/http";
import { successAlert } from '../../../utils/alert'
export default {
  props: ["info"],
  data() {
    return {
      //初始化form
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({}),
    //只获取一条数据
    getOne(uid) {
      reqVipInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = ''
        }
      });
    },
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    //当点击了确定之后
    update() {
      reqVipUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
            this.empty();
            successAlert(res.data.msg);
            this.$emit('init');
            this.cancel()
        }
      });
    },
    cancel(){
        this.info.isShow = false
    }
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style>
</style>