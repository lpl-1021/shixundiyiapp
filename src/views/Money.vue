<template>
  <div>
    <div
      style="width:100%;height:3rem;text-align:center;font-size:0.7rem;color:red;margin-top:1rem;"
    >{{text}}</div>
    <div class="time">
      <p>
        五秒后自动跳转至支付页面：
        <van-count-down :time="time" format="ss" finish="onBack" />
      </p>
    </div>
    <div>
        <van-button type="primary" size='large' @click="onBack1">手动返回</van-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      text: "",
      time: 6000,
    };
  },
  created() {
    let order = this.$store.state.order;
    console.log(order);

    let params = {
      orderId: order,
    };

    this.$netClient.money(qs.stringify(params)).then((res) => {
      console.log(res);
      this.text = res.data.msg;
    });

    setTimeout(() => {
      this.$router.back();
    }, 5000);
  },
  methods: {
    onBack1() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.time {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.2rem;
  height: 1rem;
  margin: 1rem 0;
  p {
    font-size: 0.5rem;
    width: 100%;
    display: inline-flex;
    text-align: center;
    align-items: center;
    .van-count-down {
      font-size: 0.5rem;
      color: blue;
    }
  }
}
</style>>