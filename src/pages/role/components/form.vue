<template>
  <div class="box1">
    <!-- 绑定数据到模板 -->
    <!-- 绑定closed -->
  <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules" ref="formName">


        <el-form-item label="角色名称" label-width="120px" prop="rolename">
          <!-- 9.通过v-model将user绑定到表单上 -->
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="120px" prop="menus">
          <!-- 树形控件
            data:数据
            :props="{children:'哪个字段是代表有下一个子节点',label:'展示在页面的字段'}"
            node-key:选中节点后，得到什么字段
            this.$refs.tree.getCheckedNodes() 可以取到选中的节点对应的整条数据，拼成的数组
            this.$refs.tree.getCheckedKeys() 可以取到选中节点的key拼成的数组
            this.$refs.tree.setCheckedKeys([10,11,12]); 给树设置值
          -->
          <!-- 14.将menuList 绑定到tree,配置props -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      
        <div class="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加角色'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
      
      </el-form>
    
    </el-dialog>
  </div>
</template>

<script>
import { successAlert,errAlert } from "../../../utils/alert";
import { reqMenuList, reqRoleAdd, reqRoleDetail, reqRoleUpdata } from "../../../utils/http";
export default {
  props: ["info"],
    data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      menuList: [],
       rules: {
        rolename: [{ required: true, message: "请输入角色名称" }],
     menus: [{ required: true, message: "请选择角色权限" }],
    
    }
  }
    },
  methods:{
    cancel() {
      this.info.isshow = false;
    },
    empty() {
    this.user = {
        rolename: "",
        menus: "",
        status: 1,
      },
       this.$refs.tree.setCheckedKeys([]);
    },

    add() {
        this.$refs.formName.validate((valid) => {
        if (valid) {
     this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功"),
            this.cancel(),
            this.empty(),
            this.$emit("init");
        }
      });
    
}else{
   errAlert("添加失败");
}
})
  },

    getOne(id) {
      reqRoleDetail(id).then(res => {
        this.user = res.data.list;

        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));

        this.user.id = id;
      });
    },
    update() {
            this.$refs.formName.validate((valid) => {
        if (valid) {
    this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdata(this.user).then(res=>{
          if(res.data.code==200){
              successAlert("修改成功"),
              this.cancel();
              this.empty();
              this.$emit("init")
          } else {
            errAlert(res.data.msg);
          }

})
}else{
   errAlert("添加失败");
}
})
    },
    closed(){
        if(this.info.title==='编辑角色'){
            this.empty()
        }
    }
  },

  mounted() {
    reqMenuList().then(res => {
      if (res.data.code === 200) {
        this.menuList = res.data.list;
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