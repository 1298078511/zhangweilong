<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" v-if="info.title=='商品添加'" @click="add()">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecsAdd, reqSpecsInfo, reqSpecsUpdate } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      //属性值
      attrArr: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    //当点击了添加之后
    add() {
      this.user.attrs = JSON.stringify(
        this.attrArr.map((item) => {
          return item.value;
        })
      );
      reqSpecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //成功的弹窗
          successAlert(res.data.msg);
          //弹窗关闭
          this.cancel();
          //重置
          this.empty();
          //刷新页面
          this.reqList();
          this.reqCount();
        }
      });
    },
    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    //当点击了取消之后
    cancel() {
      this.info.isShow = false;
    },
    //重置
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      attrArr: [{ value: "" }];
    },
    //关闭时候的bug处理
    closed() {
      if (this.info.title == "编辑规格") {
        this.empty();
      }
    },
    //只获取一条数据
    getOne(id) {
      reqSpecsInfo(id).then((res) => {
        this.user = res.data.list[0];
        this.attrArr = JSON.parse(this.user.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    //当点击了修改之后
    update() {
      this.user.attrs = JSON.stringify(
        this.attrArr.map((item) => {
          return item.value;
        })
      );
      //发送请求
      reqSpecsUpdate(this.user).then(res=>{
          if(res.data.code == 200){
              successAlert(res.data.msg);
              this.empty()
              this.cancel()
              this.reqList()
              this.reqCount()
          }
      })
    },
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style scoped>
.line {
  display: flex;
}
.line el-input {
  flex: 1;
}
.line el-button {
  width: auto;
}
</style>