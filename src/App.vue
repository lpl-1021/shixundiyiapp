<template>
  <div id="app">
    <van-tabbar v-model="active" route v-show="this.$route.meta.isShow" active-color="red">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/about">商城</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    // this.$router.push({
    //   path: "/home",
    // });
  },
};
</script>

<style lang="scss" scoped>
</style>
