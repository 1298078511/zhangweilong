<template>
    <div>
    
   
    <v-list :info="info" @edit="edit"></v-list>

    
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import {  } from "../../utils/http";
export default {
  components:{
    vList,
    vForm
  },
  data() {
    return {
      info:{
        isshow:false,
        title: "会员修改"
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
        title:"会员修改"
    }

  },
  edit(uid){
    this.info={
        isshow:true,
        title:"会员修改"
    };
    this.$refs.form.getOne(uid);
    
  }
  },
  

}
</script>

<style scoped>

</style>