<template>
  <div>
      <div style="width:100%;">
          <img src="http://localhost:8080/10.png" alt="" style="width:100%;">
      </div>
      <div style="width:100%;" class="aa" @click="onClick">
          <button style="width:100%;">注销登录</button>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        onClick(){
            this.$store.dispatch("REMOVE_TOKEN")
             localStorage.removeItem('vuex')
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.aa{
    width: 100%;
    height: 1rem;
    border: 1px solid rgb(230, 229, 229);
    button{
        width: 100%;
        height: 100%;
        background: white;
        border: 0;
    }
}
</style>