<template>
  <div class="box1">
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form" :rules="rules" ref="formName">

        <el-form-item label="菜单名称" label-width="120px" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="120px" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 23 list遍历 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px" prop="type">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 目录有图标，菜单有地址 -->
        <el-form-item label="菜单图标" v-if="form.type===1" label-width="120px" prop="icon">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else label-width="120px" prop="url">
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 10.遍历routes -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        
      <div class="footer">
   <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
    

      </div>
     

      </el-form>

      
    </el-dialog>
  </div>
</template>

<script>
import { routes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { errAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      routes: routes,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
   
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称" }],
        pid:[{required:true,message:'请选择上级菜单'}],
        url:[{required:true,message:'请选择菜单地址'}],
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
      this.empty()
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    add() {

          this.$refs.formName.validate((valid) => {
        if (valid) {
 reqMenuAdd(this.form).then((res) => {
          if (res.datd.code === 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            this.$emit("init");
          } else {
            errAlert(res.data.msg);
          }
        });
}else{
  errAlert("添加失败");
}
})
    },
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    getOne(id) {
      reqMenuDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
        this.$refs.formName.validate((valid) => {
        if (valid) {
 reqMenuUpdate(this.form).then((res) => {
          if (res.data.code === 200) {
            successAlert("修改成功");
            this.cancel;
            this.empty;
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
    closed() {
      if (this.info.title === "编辑菜单") {
        this.empty();
      }
    },
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