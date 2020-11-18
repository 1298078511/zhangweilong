<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed()'>
      <el-form :model="from">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="from.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="from.pid" placeholder="请选择" @change='changePid()'>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio :label="1" v-model="from.type" disabled>菜单</el-radio>
          <el-radio :label="2" v-model="from.type" disabled>目录</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="120px" v-if="from.type===1">
          <el-select v-model="from.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="from.url" placeholder="请选择">
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="'/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="from.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if='info.title==="添加菜单"'>添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqMenuAdd,reqMenuDetail,reqMenuUpdate } from "../../../utils/http";
import { successAlert,errorAlert } from '../../../utils/alert'
export default {
  props: ["info", "list"],
  data() {
    return {
      //初始化from
      from: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      routes: routes,
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
    };
  },
  methods: {
    ...mapActions({}),
    //点击了取消之后
    cancel() {
      this.info.isShow = false;
    },
    //点击了添加按钮之后
    add() {
      //发送ajax请求
      reqMenuAdd(this.from).then(res=>{
          //添加成功的时候弹出成功
          if(res.data.code == 200){
              successAlert('添加成功')
              //关闭弹框
              this.cancel();
              //from置空
              this.empty();
              //通知menu重新刷新数据
              this.$emit('init')
          }else{
              //失败的时候弹出失败的弹窗
              errorAlert(res.data.msg)
          }
      })
    },
    //当上级菜单发生修改之后
    changePid(){
        if(this.from.pid === 0){
            this.from.type = 1;
        }else{
            this.from.type = 2
        }
    },
    //from置空
    empty() {
      this.from = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    //获取一条数据
    getOne(id){
        reqMenuDetail(id).then(res=>{
            //此时的from上面并没有id 
            this.from = res.data.list;
            //补一个id
            this.from.id = id;
        })
    },
    //修改逻辑
    update() {
        reqMenuUpdate(this.from).then(res=>{
            // console.log(res)
            if(res.data.code == 200){
                //刷新列表
                this.$emit('init');
                //弹窗关闭
                this.empty();
                //from重置
                this.cancel();
                //弹出成功
                successAlert(res.data.msg)
            }else{
                errorAlert(res.data.msg)
            }
        })
    },
    //弹框消失
    closed(){
        //如果添加界面取消，此时什么都不做，数据还在
        //如果是编辑点击取消，from置空
        if(this.info.title == '编辑菜单'){
            this.empty()
        }
    }
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style>
</style>