<template>
  <div>
    <van-nav-bar title="支付订单" left-arrow style=" height: 64px;" @click-left="onClickLeft" />
    <div style="margin:0.5rem 0;width:100%;text-align:center;font-size:0.5rem;">
      共需支付：
      <span style="color:red;">￥{{list[0].orderPrice/100}}</span>
    </div>
    <div class="paryment" v-for="(item,index) in payList" :key="index">
      <div>
        <img :src="item.img" alt />
        <p>{{item.name}}</p>
      </div>
      <van-radio-group v-model="radio">
        <van-radio :name="item.index" @click="onIfon(item.index)"></van-radio>
      </van-radio-group>
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="show = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="show = false"
      />
    </van-popup>
    <div class="footer">
      <van-button type="info" size="large" @click="onPay">确认支付</van-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";
export default {
  data() {
    return {
      list: {},
      radio: "1",
      value: "",
      info: 0,
      showKeyboard: true,
      show: false,
      html:'',
      obj:{},
      payList: [
        {
          img: "http://localhost:8080/05.png",
          name: "支付宝",
          index: 1,
        },
        {
          img: "http://localhost:8080/06.png",
          name: "微信",
          index: 2,
        },
        {
          img: "http://localhost:8080/07.png",
          name: "余额",
          index: 3,
        },
      ],
    };
  },
  created() {
    this.list = this.$store.state.paryment;
    // console.log(this.list[0]);
    this.obj=this.list[0]
    console.log(this.obj)
    // this.obj=this.$store.state.paryment
  },
  methods: {
    onIfon(i) {
      this.info = i;
      console.log(i);
    },
    onPay() {
      switch (this.info) {
        case 1:
          console.log("支付宝");
          let params = {
            OutTradeNo: this.obj.orderNumber,
            Subject: "支付宝支付",
            ProductCode: "QUICK_WAP_WAY",
            TotalAmount: this.obj.orderPrice,
          };
          this.$netClient.appwebpay(qs.stringify(params)).then((res) => {
            console.log(res);
            if (res.data.code == 201) {
              this.html = res.data.data;
              var from = res.data.data;
              var div = document.createElement("div");
              div.innerHTML = from;
              document.body.appendChild(div);
              document.forms[0].submit();
            }
          });
          break;
        case 2:
          console.log("微信");
          break;
        case 3:
          this.show = true;
          break;
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      console.log(this.value);
      if (this.value.length == 6) {
        let params = {
          paypwd: md5(this.value),
        };

        this.$netClient.pass(qs.stringify(params)).then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log("密码正确");
            this.$router.push("/money");
          } else {
            console.log("密码错误");
          }
        });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.paryment {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0.2rem;
  border: 1px solid rgb(250, 250, 250);
  img {
    height: 1.7rem;
  }
  div {
    display: inline-flex;
    align-items: center;
    font-size: 0.5rem;
    p {
      margin: 0 0.3rem;
    }
  }
}
</style>