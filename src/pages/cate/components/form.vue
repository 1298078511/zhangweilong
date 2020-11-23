<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules" ref="formName">
        <el-form-item label="上级分类" label-width="120px" prop="pid">
          <el-select v-model="user.pid" placeholder="请选择角色">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px" prop="catename">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="user.pid!==0" prop="img">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

           <div class="footer" >
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加分类'" @click="add">添 加</el-button>
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
import { reqRoleList,reqcateAdd, reqcateDetail, reqcateUpdata } from "../../../utils/http";
export default {
  props: ["info"],
    data() {
    return {
      user: {
         pid: "",
        catename: "",
        img: null,
        status: 1
      },
        imgUrl: "",
         rules: {
        pid: [{ required: true, message: "请选择上级分类"}], 
        catename: [{ required: true, message: "请输入分类名称"}], 
        img: [{ required: true, message: "请添加图片"}], 
      },

    };
  },
  computed:{
...mapGetters({
    cateList: "cate/list"
})
  },
  methods: {
    cancel() {
      this.info.isshow = false;
      this.empty()
    },
    empty() {
    this.user = {
      pid: "",
        catename: "",
        img: null,
        status: 1
      }
      this.imgUrl=""
    },
    reUpload(file){
      let extname = path.extname(file.name);
       let arr = [".jpg", ".jpeg", ".png", ".gif"];
       if (file.size > 2 * 1024 * 1024) {
        errAlert("文件大小不能超过2M");
        return false;
      } else if(!arr.includes(extname) ){
         errAlert("请上传正确的图片格式！");
        return false;
      } 
    },
    changeFile2(e){
      let  file=e.raw;
      
      this.imgUrl=URL.createObjectURL(file);
      this.user.img=file;
      
     
      
      this.imgUrl=URL.createObjectURL(file);
      this.user.img=file;
    },
   
add() {
        this.$refs.formName.validate((valid) => {
        if (valid) {
   reqcateAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功"),
            this.cancel()
            this.empty()
            this.reqList()
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
      reqList:"cate/reqList"
    }),
    getOne(id) {
      reqcateDetail(id).then(res => {
        this.user = res.data.list;


        this.imgUrl=this.$imgPre+ this.user.img;
        this.user.id=id;
      });
    },
  
    update() {
              this.$refs.formName.validate((valid) => {
        if (valid) {
 reqcateUpdata(this.user).then(res=>{
          if(res.data.code==200){
              successAlert("修改成功"),
              this.cancel();
              this.empty();
              this.reqList()
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
        if(this.info.title==='编辑分类'){
            this.empty()
        }
    },
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

  // 穿透
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