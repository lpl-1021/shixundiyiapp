<template>
  <div class="list_commodity" @click="onclick">
    <img :src="goodsLogo" alt />
    <p>{{goodsName}}</p>
    <p style="color:#FF5777;">￥{{goodsPrice}}</p>
    <p class="aa">
      <s>￥{{goodsPrice}}</s>
    </p>
    <div class="sold">已售{{goodsBuyNum}}件</div>
  </div>
</template>

<script>
export default {
  props: {
    goodsLogo: String,
    goodsName: String,
    goodsPrice: Number,
    goodsPrice: Number,
    goodsBuyNum: Number,
  },
  methods: {
    onclick() {
      this.$emit("onSearch");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 48%;
  height: 7.1rem;
  position: relative;
  margin: 0;
  padding: 0;
  img {
    width: 100%;
    height: 4.8rem;
  }
  p {
    margin: 0.1rem 0;
    padding: 0;
  }
  .aa {
    text-align: left;
    color: #e6e6e6;
  }
  .sold {
    width: 2rem;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    color: white;
    background: rgba(55, 55, 55, 0.5);
    position: absolute;
    top: 4rem;
    left: 0;
  }
}
</style>