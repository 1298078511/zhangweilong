<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <!-- 4.绑定数据到模板 -->
      <el-form :model="from">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="from.roleid" placeholder="请选择">
            <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="from.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="from.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="from.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel()">取消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='用户添加'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqManageAdd,
  reqRoleList,
  reqManageDetail,
  reqManageUpdate
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //初始化from
      from: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      //初始化list
      list: [],
    };
  },
  methods: {
    ...mapActions({}),
    //请求list
    getRoleList() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
          console.log(this.list);
        }
      });
    },
    //当点击了添加之后
    add() {
      //发送请求
      reqManageAdd(this.from).then((res) => {
        if (res.data.code == 200) {
          //成功的弹窗
          successAlert(res.data.msg);
          //弹窗消失
          this.cancel();
          //清空数据
          this.empty();
          //通知父组件刷新
          this.$emit("init");
        }
      });
    },
    //当点击了取消之后
    cancel() {
      this.info.isShow = false;
    },
    //重置from
    empty() {
      this.from = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //只获取一条数据
    getOne(uid) {
      reqManageDetail(uid).then((res) => {
        //此刻user没有id,有uid,而修改要的就是uid
        this.from = res.data.list;
        //处理密码
        this.from.password = "";
      });
    },
    // 当点击了修改之后
    update() {
        //发送修改的请求
        reqManageUpdate(this.from).then(res=>{
            if(res.data.code == 200){
                //成功的弹框
                successAlert(res.data.msg);
                //弹窗消失
                this.cancel();
                //初始化from
                this.empty();
                //通知父组件刷新
                this.$emit('init')
            }
        })
    },
  },
  mounted() {
    this.getRoleList();
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style>
</style>