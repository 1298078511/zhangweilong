<template>
  <div>
    <el-button type="danger" @click="del">删除</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //通知父组件,点了确定
          this.$emit('confirm')
        })
        .catch(() => {
            console.log('点击了取消')
        });
    },
  },
};
</script>

<style>
</style>