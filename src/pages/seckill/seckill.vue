<template>
    <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

   
    <v-list :info="info" @edit="edit"></v-list>

    
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqseckList } from "../../utils/http";
export default {
  components:{
    vList,
    vForm
  },
  data() {
    return {
      info:{
         isshow: false,
        title: "添加分类"
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd(){
    this.info={
        isshow:true,
        title:"活动添加"
    }

  },
  edit(id){
    this.info={
        isshow:true,
        title:"活动编辑"
    };
    this.$refs.form.getOne(id);
    
  }
  },
  

}
</script>

<style scoped>

</style>