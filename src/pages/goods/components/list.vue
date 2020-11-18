<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="name" label="商品编号"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="name" label="商品价格"></el-table-column>
      <el-table-column prop="name" label="市场价格"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img width="80" height="80" alt />
        </template>
      </el-table-column>

      <el-table-column prop="name" label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <div>
            <el-button type="primary">编辑</el-button>
            <del-btn></del-btn>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
      return {
          list:[
              {
                  name:''
              }
          ]
      }
  },  
  methods: {
    ...mapActions({}),
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style>
</style>