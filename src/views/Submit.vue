<template>
  <div>
    <div class="topBar">
      <van-nav-bar title="确定订单" left-arrow style=" height: 64px;" @click-left="onClickLeft" />
    </div>
    <div style="width:100px;  height: 64px;"></div>
    <div class="site" @click="onSite">
      <img src="http://localhost:8080/04.png" alt />
      <div class="site_list">
        <div>
          <span>{{this.$store.state.selecList.name}}</span>
          <span>{{this.$store.state.selecList.tel}}</span>
        </div>
        <div>
          <span>{{this.$store.state.selecList.province}}</span>
          <span>{{this.$store.state.selecList.city}}</span>
          <span>{{this.$store.state.selecList.district}}</span>
          <span>{{this.$store.state.selecList.address}}</span>
        </div>
      </div>
    </div>
    <div class="boss" v-for="(item,index) in list1" :key="index">
      <div class="top">
        <img :src="item.shopLogo" alt />
        <p>{{item.shopName}}></p>
      </div>
      <div class="center">
        <van-card :thumb="item.goodsLogo">
          <template #num>
            <div style="font-weight: 600;" class="num">￥{{item.goodsPrice}}</div>
          </template>
          <template #title>
            <span style="font-weight: 600;">{{item.goodsName}}</span>
          </template>
          <template #desc>
            <p style="color: #B0B0B0;">原价：{{item.goodsOldPrice}}</p>
          </template>
          <template #tags>
            <van-tag
              type="primary"
              color="#FFF1EC"
              text-color="#FF8953"
              style="border: 1px solid #FF8953;"
            >七天退换</van-tag>
          </template>
        </van-card>
      </div>
      <div class="bottm">
        <img src="http://localhost:8080/03.png" alt />
      </div>
    </div>
    <van-submit-bar
      :price="this.total"
      label="合计："
      @submit="payment"
      button-text="去支付"
      button-color="#F21956"
    >
      <template #default>
        <p>
          共计:
          <span>{{list1.length}}件</span>
        </p>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import qs from "qs";
import { Notify } from "vant";
import store from "../store/index";
export default {
  // components: {
  //   [Notify.Component.name]: Notify.Component,
  // },
  data() {
    return {
      id: "",
      list: [],
      list1: [],
      total: 0,
    };
  },
  mounted() {
    this.id = this.$store.state.submitId;
    console.log(this.id);

    this.$netClient
      .submit({
        params: {
          goodsid: this.id,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        this.list = res.data.data;
        // console.log(this.list);
        this.list.forEach((i) => {
          if (i[0].goodsAre === i[1].shopAre) {
            this.list1.push(Object.assign(i[0], i[1]));
            // console.log(this.list1);

            this.list1.forEach((a) => {
              this.total += a.goodsPrice * 100;
              // console.log(this.total);
            });
          }
        });
      });
  },
  methods: {
    payment() {
      // console.log(Object.keys(this.$store.state.selecList).length);
      if (Object.keys(this.$store.state.selecList).length == 0) {
        // console.log("aaaa");
        Notify({ type: "danger", message: "请选择收货地址 " });
        return;
      }

      let params = {
        price: this.total,
        consignee_addr:
          store.state.selecList.name +
          "," +
          store.state.selecList.tel +
          "," +
          store.state.selecList.province +
          "," +
          store.state.selecList.city +
          "," +
          store.state.selecList.district +
          "," +
          store.state.selecList.address,
        goodsId: this.$store.state.submitId,
        isFcart: "yes",
      };

      this.$netClient.payment(qs.stringify(params)).then((res) => {
        console.log(res.data.data);
        
        let order=res.data.data
        order.forEach((a)=>{
          console.log(a.orderNumber)
            this.$store.dispatch("MONEY_ADD", a.orderNumber);
        })

        this.$store.dispatch("PARMENT_ADD", res.data.data);
      
      });

      this.$router.push("/payment");
    },
    onSite() {
      this.$router.push("/savesite");
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.topBar {
  width: 100%;
  height: 64px;
  // position: fixed;
  // z-index: 9999;
}
.site {
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  padding: 0 0.3rem;
  display: inline-flex;
  div {
    span {
      display: inline-block;
      margin: 0.05rem 0.15rem;
    }
  }
  img {
    height: 100%;
    margin-right: 0.5rem;
  }
}
.boss {
  width: 100%;
  height: 9rem;
  .top {
    width: 100%;
    height: 0.6rem;
    display: inline-flex;
    align-items: center;
    font-size: 0.35rem;
    margin: 0.4rem 0;
    img {
      height: 100%;
      margin: 0 0.3rem;
    }
  }
  /deep/ .van-card__num {
    color: black;
  }
  .center {
    width: 100%;
    position: relative;
    margin-top: 0.3rem;
    .num {
      position: absolute;
      right: 0;
      top: 30%;
    }
    .van-card {
      background: white;
    }
  }
  .bottm {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.van-button--round {
  border-radius: 0px;
}
</style>