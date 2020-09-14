<template>
  <div class="search">
    <div
      style="width:100%;height:7vh;width: 100%;position: fixed;z-index: 99999;background: white;"
    >
      <van-row>
        <van-col span="2">
          <div class="left_icon" @click="onHomme">
            <van-icon name="arrow-left" size="0.7rem" />
          </div>
        </van-col>
        <van-col span="22">
          <van-tabs v-model="active" class="label">
            <van-tab title="商品"></van-tab>
            <van-tab title="评论"></van-tab>
            <van-tab title="详情"></van-tab>
            <van-tab title="推荐"></van-tab>
          </van-tabs>
        </van-col>
      </van-row>
    </div>

    <div style="width:100%;height:1.5rem;"></div>
    <div class="boss">
      <img :src="img" alt />
      <p style="font-size:0.4rem;">{{goodsName}}</p>
      <p style="color:pink;font-size:0.5rem;margin:0.2rem 0;">
        ￥{{goodsPrice}}
        <s style="font-size:0.35rem;margin:0.3rem;color:black;">{{goodsOldPrice}}</s>
      </p>
      <div class="sales">
        <p>销量{{goodsBuyNum}}</p>
        <p>收藏{{goodsFav}}</p>
        <p>{{goodsAre}}</p>
      </div>
      <div class="serve">
        <div v-for="(item,index) in serve" :key="index">
          <img :src="item.icon" alt style="height:0.3rem;width:0.3rem;" />
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="may">
        <p>买家评论</p>
        <p>更多>></p>
      </div>
      <div class="comment">
        <div v-for="(item,index) in filtercomment" :key="index">
          <div class="aa">
            <img :src="item.comment_body.user_img" alt />
            <p>{{item.comment_body.user_name}}</p>
          </div>
          <img :src=" item.comment_img" alt />
          <p>{{item.comment_body.content}}</p>
          <p>{{time01}}</p>
        </div>
      </div>
      <div class="described">
        <div class="described1">
          <img :src="described.shopLogo" alt />
          <p>{{described.shopName}}</p>
        </div>
        <div class="described2">
          <div class="left1">
            <div>
              <p>{{described.sells}}</p>
              <p>总销量</p>
            </div>
            <div>
              <p>{{described.snum}}</p>
              <p>全部宝贝</p>
            </div>
          </div>
          <div class="right1">
            <img src="http://localhost:8080/02.png" alt />
          </div>
        </div>
        <button>进店逛逛</button>
      </div>
    </div>
    <div style="width:100%;height:2rem;"></div>\
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="0" @click="onCartlist" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onCart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import qs from "qs";
import {padLeftZero} from '@/untils/untils'
export default {
  data() {
    return {
      id: 0,
      active: 0,
      img: "",
      goodsName: "",
      goodsPrice: "",
      goodsOldPrice: "",
      goodsBuyNum: "",
      goodsFav: "",
      goodsAre: "",
      serve: [],
      comment: [],
      filtercomment: [],
      described: {},
      image: {},
      num: 1,
      caryList: [],
      page: 0,
      time01:''
    };
  },
  methods: {
    onHomme() {
      this.$router.back();
    },
    onCart() {
      // console.log("aaaa");
      // var id = this.id;
      let params = {
        product_id: this.id,
        price: this.goodsPrice,
        product_amount: this.num++,
      };
      this.$netClient.cart(qs.stringify(params)).then((res) => {
        console.log(res.data);
      });
    },
    onCartlist() {
      this.$router.push("/cart");
    },
  },
  mounted() {
    this.id = this.$route.query.goodsId;
    // console.log(this.id);
    this.$netClient
      .datalis({
        params: {
          goodsId: this.id,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        this.image = res.data.data[0];
        this.img = res.data.data[0].goodsLogo;
        this.goodsName = res.data.data[0].goodsName;
        this.goodsPrice = res.data.data[0].goodsPrice;
        this.goodsOldPrice = res.data.data[0].goodsOldPrice;
        this.goodsBuyNum = res.data.data[0].goodsBuyNum;
        this.goodsFav = res.data.data[0].goodsFav;
        this.goodsAre = res.data.data[0].goodsAre;
        this.serve = res.data.data[2];
        this.comment = res.data.data[3];
        this.described = res.data.data[1];
        // console.log(this.goodsPrice);

        this.comment.map((a) => {
          if (Object.keys(a).length == 0) {
          } else {
            this.filtercomment.push(a)
            console.log(this.filtercomment)
            this.filtercomment.map(b=>{
              console.log(b.comment_body.audit_time)

              let time=new Date(b.comment_body.audit_time*1000)
              var fti=''
              this.time01=padLeftZero(time,fti)
             console.log(padLeftZero(time,fti)) 
            })
          }
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.1rem;
}

.left_icon {
  height: 6vh;
  display: inline-flex;
  align-items: center;
}
.boss {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;

  img {
    width: 100%;
  }
  .sales {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(230, 229, 229);
  }
  .serve {
    width: 100%;
    height: 2rem;
    display: inline-flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(230, 229, 229);
    div {
      display: inline-flex;
      align-items: center;
    }
  }
  .may {
    width: 100%;
    height: 1.5rem;
    border-bottom: 1px solid rgb(230, 229, 229);
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
  .comment {
    width: 100%;
    img {
      width: 2rem;
    }
    div {
      width: 100%;
      border-bottom: 1px solid rgb(230, 229, 229);
      margin: 0.3rem 0;
      .aa {
        display: inline-flex;
        align-items: center;
        margin: 0.3rem 0;
        border: 0;
        p {
          margin-left: 0.3rem;
        }
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
    }
  }
  .described {
    width: 100%;
    border-bottom: 1px solid rgb(230, 229, 229);
    button {
      width: 46%;
      height: 0.9rem;
      margin: 0.5rem 0;
      margin-left: 27%;
      border: 0;
      border-radius: 0.3rem;
      font-size: 0.35rem;
    }
    .described1 {
      width: 100%;
      display: inline-flex;
      font-size: 0.5rem;
      align-items: center;
      img {
        width: 1.4rem;
        margin-right: 0.5rem;
      }
    }
    .described2 {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .left1 {
        width: 49%;
        font-size: 0.35rem;
        display: inline-flex;
        border-right: 2px solid rgb(230, 229, 229);
        div {
          width: 50%;
          text-align: center;
        }
      }
      .right1 {
        width: 50%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>