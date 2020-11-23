<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules" ref="formName">
        <el-form-item label="规格名称" label-width="120px" prop="specsname">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item,index) in attrArr"
          :key="index"
          prop="attrs"
        >
          <div class="line">
            <el-input v-model="item.value" autocomplete="off" ></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <div class="footer">
          <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
        </div>
      </el-form>
      
    </el-dialog>
  </div>
</template>

<script>
import { errAlert, successAlert } from "../../../utils/alert";
import path from "path";
import { mapGetters, mapActions } from "vuex";
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
  reqspecsDel,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }],
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
    
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    cancel() {
      this.info.isshow = false;
      this.empty();
    },
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },

    add() {
      this.$refs.formName.validate((valid) => {
        //添加逻辑
        if (valid) {
          if(this.attrArr.some(item=>item.value==="")){
            errAlert("请输入规格属性")
            return;
          }
          this.user.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );
          reqspecsAdd(this.user).then((res) => {
            if (res.data.code === 200) {
              successAlert("添加成功");
              this.cancel();
              this.empty();
              //刷新list
              this.reqList();
              this.reqCount();
            } 
          });
        }
        return
      });
    },
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    getOne(id) {
      reqspecsDetail(id).then((res) => {
        this.user = res.data.list[0];
        this.attrArr = JSON.parse(this.user.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    update() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.user.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );
          reqspecsUpdate(this.user).then((res) => {
            if (res.data.code == 200) {
              successAlert("更新成功");
              this.cancel();
              this.empty();
              this.reqList();
            } else {
              errAlert(res.data.msg);
            }
          });
        } else {
          errAlert("添加失败");
        }
      });
      //添加逻辑
    },

    closed() {
      if (this.info.title === "编辑规格") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>

<style scoped lang="stylus">
.line {
  display: flex;
}

.line .el-input {
  flex: 1;
}

.line .el-button {
  width: auto;
}
.add{
  position:relative;
}
.footer{
    position:absolute;
    bottom:10px;
    right:10px;
 
}
</style>