import Vue from 'vue'
let vm = new Vue()

//成功时候的弹框
export const successAlert = (msg) => {
    vm.$message({
        message: msg,
        type: "success"
    })
}

//失败时候的弹框\
export const errorAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'warning'
    })
}