<template>
    <div class="login">
        <div class="box">
            <h3>登录</h3>
            <div class="line">
                <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
            </div>
            <div class="line">
                <el-input v-model="user.password" placeholder="请输入密码" show-password clearable ></el-input>
            </div>
            <div class="last">
                <el-button type="primary" @click='login'>登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../utils/alert'
import { reqLogin } from '../../utils/http'
export default {
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    computed:{
        ...mapGetters({})
    },
    methods:{
        login(){
            this.$router.push('/')
        },
        ...mapActions({
            "changeUser":'changeUser'
        }),
        //当点击了登录之后
        login(){
            reqLogin(this.user).then(res=>{
                if(res.data.code == 200){
                    //成功的弹框
                    successAlert(res.data.msg);
                    //存入vuex
                    this.changeUser(res.data.list);
                    //页面跳转
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style>
.login{
    position: relative;
    width:100vw;
    height: 100vh;
    background: linear-gradient(to right,#563443,#413952,#2f3d5f);
}
.box{
    width: 400px;
    padding: 20px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 15px;
}
.box h3{
    text-align: center;
    margin: 10px;
}
.box .line{
    margin-bottom:20px;
}
.last{
    text-align: center;
}
.last .el-button{
    width: 400px;
    margin-bottom: 20px;
}
</style>