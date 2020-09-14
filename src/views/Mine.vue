<template>
  <div>
      <div class="header" style="width:100%;">
        <img src="http://localhost:8080/08.png" alt="" style="width:100%;">
      </div>
      <div class="footer" style="width:100%;" @click="onClick">
        <img src="http://localhost:8080/09.png" alt="" style="width:100%;">
      </div>
  </div>
</template>

<script>
export default {
      methods:{
        onClick(){
          this.$router.push('/quit')
        }
      }
}
</script>

<style>

</style>