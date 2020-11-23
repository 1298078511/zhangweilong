<template>
   <div class="box1">
    <!-- 4.绑定数据到模板 -->
    <!-- 40 绑定closed -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules" ref="formName">
        <el-form-item label="所属角色" label-width="120px" prop="roleid">
          <!-- 9.通过v-model将user绑定到表单上 -->
          <el-select v-model="user.roleid" placeholder="请选择角色" >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="120px" prop="username">
          <!-- 9.通过v-model将user绑定到表单上 -->
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px" >
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
  <div class="footer" >
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加管理员'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>


      </el-form>
    
    </el-dialog>
  </div>
</template>

<script>
import { successAlert ,errAlert} from "../../../utils/alert";
import { reqRoleList,reqUserAdd, reqUserDetail, reqUserUpdata } from "../../../utils/http";
export default {
  props: ["info"],
    data() {
    return {
      user: {
       roleid: "",
        username: "",
        password: "",
        status: 1
      },
        roleList: [],
         rules: {
         roleid: [{ required: true, message: "请选择所属角色"}],
         username: [{ required: true, message: "请输入用户名" }],
          password: [{ required: true, message: "请输入密码" }],
   
      },
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    empty() {
    this.user = {
           roleid: "",
        username: "",
        password: "",
        status: 1
      }
    },
    add() {
        this.$refs.formName.validate((valid) => {
        if (valid) {
      reqUserAdd(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功"),
            this.cancel(),
            this.empty(),
            this.$emit("init");
        } else {
            errAlert(res.data.msg);
          }

})
}else{
   errAlert("添加失败");
}
})
    },
    getOne(uid) {
      reqUserDetail(uid).then(res => {
        this.user = res.data.list;


        this.user.password = ""
      });
    },
    update() {
        this.$refs.formName.validate((valid) => {
        if (valid) {
    reqUserUpdata(this.user).then(res=>{
          if(res.data.code==200){
              successAlert("修改成功"),
              this.cancel();
              this.empty();
              this.$emit("init")
          }else {
            errAlert(res.data.msg);
          }

})
}else{
   errAlert("添加失败");
}
})
    },
    closed(){
        if(this.info.title==='编辑管理员'){
            this.empty()
        }
    }
  },

  mounted() {
    reqRoleList().then(res => {
      if (res.data.code === 200) {
          this.roleList = res.data.list;
      }
    });
  },
};
</script>

<style>
.box1{
  position: relative;
}

.footer{
position:absolute;
bottom:10px;
right:10px;
}
</style>