<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="from">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="from.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="from.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="from.pid != 0">
          <template>
            <div class="myupload">
              <h3>+</h3>
              <img class="img" :src="imgSrc" alt v-if="imgSrc" />
              <!-- 如果添加成功，此时，input上的文件应该清掉，所以直接将input节点清除 -->
              <input type="file" class="ipt" v-if="info.isShow" @change="changeFile" />
            </div>
          </template>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="from.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title == '商品添加'">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqCateAdd, reqCateInfo, reqCateUpdate } from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      //初始化from
      from: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      //初始化图片路径
      imgSrc: "",
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    //当选择了一张图片之后
    changeFile(e) {
      let file = e.target.files[0];
      console.log(file);
      //判断文件大小不能超过2M
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("图片大小不能超过2M");
        return;
      }
      //判断文件的类型
      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      //生成图片地址
      this.imgSrc = URL.createObjectURL(file);
      this.from.img = file;
    },
    //重置from,imgSrc
    empty() {
      this.from = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
      this.imgSrc = "";
    },
    //当点击了取消之后
    cancel() {
      this.info.isShow = false;
    },
    //当点击了添加之后
    add() {
      reqCateAdd(this.from).then((res) => {
        if (res.data.code == 200) {
          //成功的弹窗
          successAlert(res.data.msg);
          //重置from 路径
          this.empty();
          //刷新页面
          this.reqList();
          //弹窗关闭
          this.cancel();
        }
      });
    },
    //请求一条数据
    getOne(id) {
      reqCateInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.from = res.data.list;
          this.from.id = id;
          this.imgSrc = this.$imgPre + this.from.img;
        }
      });
    },
    //当点击修改之后
    update() {
      reqCateUpdate(this.from).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.reqList();
          this.cancel();
        }
      });
    },
    //关闭弹窗的bug处理
    closed() {
      if (this.info.title == "商品编辑") {
        this.empty();
      }
    },
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
};
</script>

<style scoped>
.myupload {
  width: 120px;
  height: 120px;
  position: relative;
  border: 2px dotted #999;
  border-radius: 5px;
}
.myupload h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.myupload input {
  width: 120px;
  height: 120px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: 0;
}
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>