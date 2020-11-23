import Vue from "vue"
let vm= new Vue()


//成功弹窗
   export const successAlert=(msg)=>{
       vm.$message({
           message:msg,
           type:"success"
       })
   }

//失败弹窗

export const errAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:"warning"
    })
}