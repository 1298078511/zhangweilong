<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed()'>
      <!-- 4.绑定数据到模板 -->
      <el-form :model="from">
        <el-form-item label="角色名称" label-width="120px">
          <!-- 9.通过v-model将user绑定到表单上 -->
          <el-input v-model="from.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="from.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title === '添加角色'">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuList, reqRoleAdd,reqRoleDetail,reqRoleUpdate } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //   初始化from
      from: {
        rolename: "",
        menus: "",
        status: 1,
      },
      //初始化树形控件
      menuList: [],
    };
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isShow = false;
    },
    //重置from
    empty() {
      this.from = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //重置树形控件
      this.$refs.tree.setCheckedKeys([]);
    },
    //当点击添加之后
    add() {
      //将树形控件里面的ID发送给后台
      this.from.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.$refs.tree.getCheckedKeys());

      //发送ajax请求
      reqRoleAdd(this.from).then((res) => {
        if (res.data.code == 200) {
          //重置
          this.empty();
          //关闭弹窗
          this.cancel();
          //成功的弹窗
          successAlert("添加成功");
          //通知父组件刷新
          this.$emit("init");
        }
      });
    },
     //请求一条数据
    getOne(id){
        //调用ajax
        reqRoleDetail(id).then(res=>{
            //给from重新赋值
            this.from = res.data.list;
            //补id
            this.from.id = id;
            //获取树形控件的数据
            this.$refs.tree.setCheckedKeys(JSON.parse(this.from.menus)); 
        })
    },
    //修改
    update(){
        //树形控件重新赋值
        this.from.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        //ajax
        reqRoleUpdate(this.from).then(res=>{
            if(res.data.code == 200){
                //成功时候的弹窗
                successAlert(res.data.msg);
                //关闭弹窗
                this.cancel();
                //重置from
                this.empty();
                //告知父组件刷新列表数据
                this.$emit('init');
            }
        })
    },
    //处理bug
    closed(){
        if(this.info.title == '角色编辑'){
            this.empty();
        }
    }   
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    //一进来就直接请求,获取列表数据
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>

<style scoped>
</style>