<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="goods">
        <el-form-item label="一级分类" label-width="150px">
          <el-select v-model="goods.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
              <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="150px">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
              <el-option v-for='item in secondCateList' :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="150px">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="150px">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="150px">
          <el-input v-model="goods.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="150px">
          <el-upload class="avatar-uploader" action="#" v-if="info.isShow">
            <!-- <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="150px">
          <el-select v-model="goods.specsid" placeholder="请选择">
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="150px">
          <el-select placeholder="请选择" multiple v-model="goods.specsattr">
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="150px">
          <el-radio v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="150px">
          <el-radio v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="150px">
          <textarea v-model="goods.description" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>

        <el-button type="primary">添 加</el-button>
        <el-button type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateList } from '../../../utils/http'
export default {
  props:['info'],
  data(){
      return {
          //初始化goods
          goods:{
              first_cateid:'',
              second_cateid:'',
              goodsname:'',
              price:'',
              market_price:'',
              img:null,
              description:'',
              specsid:'',
              specsattr:[],
              isnew:1,
              ishot:1,
              status:1
          },
          //二级分类列表
          secondCateList:[]
      }
  },
  methods: {
    ...mapActions({
        //请求一级分类
        reqCateList:'cate/reqList'
    }),
    //通过一级分类的变化获取二级分类
    changeFirst(){
        this.goods.second_cateid = '',
        this.getSecondList()
    },
    getSecondList(){
        reqCateList({pid:this.goods.first_cateid}).then(res=>{
            this.secondCateList = res.data.list
        })
    }
  },
  computed: {
    ...mapGetters({
        //取出一级分类
        cateList:'cate/list'
    }),
  },
  mounted(){
      //一进来页面就开始请求一级分类
      this.reqCateList()
  }
};
</script>

<style>
</style>