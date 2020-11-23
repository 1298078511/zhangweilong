<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="list" :rules="rules" ref="formName">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="list.title" autocomplete="off"></el-input>
        </el-form-item>

        <div class="block">
          <!-- <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span> -->
          <el-form-item label="活动期限" label-width="120px" >
            <el-card class="box-card">
              <el-date-picker
                v-model="dateTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="medium"
                value-format="timestamp"
              ></el-date-picker>
            </el-card>
          </el-form-item>
        </div>

        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="list.first_cateid" placeholder="请选择分类" @change="changeFirst">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in  cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="list.second_cateid" placeholder="请选择分类" @change="changeSecond">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px" prop="goodsid">
          <el-select v-model="list.goodsid" placeholder="请选择商品" @change="getGoods">
            <el-option
              v-for="item in list1"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="list.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <div class="footer" >
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='活动添加'" @click="add">添 加</el-button>
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
  reqcateList,
  reqgoodsList,
  reqseckList,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdata,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      list: {
        title: "",
        begintime: null,
        endtime: null,
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //存储时间
      dateTime: [],
      //商品的列表
      list1: [],
      //二级的列表
      secondCateList: [],
        rules: {
        title: [{ required: true, message: "请输入活动名称"}], 
        first_cateid: [{ required: true, message: "请选择一级分类"}],
        second_cateid: [{ required: true, message: "请选择二级分类" }],
        goodsid: [{ required: true, message: "请选择商品"}],
      },
    };
  },
  computed: {
    ...mapGetters({
      //一级的列表
      cateList: "cate/list",
      //商品的列表
      goodlist: "goods/list",
    }),
  },
  methods: {
    //弹框消失
    cancel() {
      this.info.isshow = false;
      this.empty()
    },
    //清空数据
    empty() {
      this.list = {
        title: "",
        begintime: null,
        endtime: null,
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      (this.dateTime = []), (this.list1 = []), (this.secondCateList = []);
    },
  
    //添加数据
    add() {

this.$refs.formName.validate((valid) => {
        if (valid) {
    //开始的时间赋值
      this.list.begintime = this.dateTime[0]
      //结束的时间赋值
      this.list.endtime = this.dateTime[1]
      //请求添加的接口
       if(this.dateTime){
            errAlert("请选择秒杀时间")
            return;
          }
      reqseckAdd(this.list).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功"), 
          this.reqSeckList();
          this.cancel();
          this.empty();         
          this.list1 = res.data.list;
          console.log( this.begintime);
          console.log( this.endtime);
        } else {
            errAlert(res.data.msg);
          }

})
}else{
   errAlert("添加失败");
}
})
    },
    ...mapActions({
      reqSeckList: "seck/reqList",
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
    }),
    changeFirst() {
      //二级分类的id重置
      this.list.second_cateid = "";
      //商品的id重置
      this.list.goodsid = "";
      //根据二级的数据来找到goods的数据
      this.getSecondList();
    },
    //goods的数据
    getSecondList() {
      //获取二级分类list
      reqcateList({ pid: this.list.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    //输入框改变的时候调用
    changeSecond() {
      this.list.goodsid = "";
      this.getGoods();
    },
    //得到goods的数据
    getGoods() {
      reqgoodsList({
        fid: this.list.first_cateid,
        sid: this.list.second_cateid,
      }).then((res) => {
        this.list1 = res.data.list;
      });
    },
    //得到一条数据
    getOne(id) {
      reqseckDetail(id).then((res) => {
        this.list = res.data.list;
        this.list.id = id;
        this.begintime = res.data.list.begintime,
        this.endtime = res.data.list.endtime;
          console.log( this.begintime);
          console.log( this.endtime);
             console.log(new Date(parseInt(this.list.begintime)));
             console.log(new Date(parseInt(this.list.endtime)))

          //给datTime赋值，现在是字符串，先转成数字再用时间戳来得到相应的值
         
        this.dateTime =[      
          new Date(parseInt(this.list.begintime)),
          new Date(parseInt(this.list.endtime)),
        ];
        this.getSecondList();
        this.getGoods();
      });
    },
    
  //更新
    update() {
        this.$refs.formName.validate((valid) => {
        if (valid) {
   this.list.begintime = this.dateTime[0]
      //结束的时间赋值
      this.list.endtime = this.dateTime[1]
       if(this.dateTime){
            errAlert("请选择秒杀时间")
            return;
          }
  reqseckUpdata(this.list).then((res) => {
           console.log(res);
        if (res.data.code == 200) {
          successAlert("更新成功"),
          this.reqSeckList();
          // this.reqseckDetail()
           this.cancel();
          this.empty();
          this.getGoods();
        
        }  else {
            errAlert(res.data.msg);
          }

})
}else{
   errAlert("添加失败");
}
})
    },
    closed() {
      if (this.info.title === "活动编辑") {
        this.empty();
      }
    },
  },

  mounted() {
    //一进来就请求数据。让上面值有值
    this.reqCateList();
    this.getSecondList();
    this.getGoods();
  },
};
</script>

<style scoped lang="stylus">
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
  .add{
  position: relative;
}
.footer{
position:absolute;
bottom:10px;
right:10px;
}
</style>