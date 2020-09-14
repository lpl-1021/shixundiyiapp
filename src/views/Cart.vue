<template>
  <div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="管理"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-checkbox-group
      v-model="result"
      @change="Choice"
      v-for="(item,index) in this.$store.state.cartClist"
      :key="index"
      ref="checkboxGroup"
    >
      <van-row type="flex" align="center" justify="center">
        <van-col span="2">
          <van-checkbox @click="dan(item,index)" :name="item"></van-checkbox>
        </van-col>
        <van-col span="22" offset="4">
          <van-card :price="item.price" :title="item.title" :thumb="item.image">
            <template #footer>
              <van-stepper
                v-model="item.product_amount"
                theme="round"
                button-size="22"
                disable-input
                @change="numList(item)"
              />
            </template>
          </van-card>
        </van-col>
      </van-row>
    </van-checkbox-group>

    <van-submit-bar :price="subtotal" button-text="提交订单" @submit="submit" v-show="administration">
      <van-checkbox v-model="checked" @click="check">全选</van-checkbox>
    </van-submit-bar>

    <van-submit-bar button-text="删除" @submit="remove" v-show="!administration">
      <van-checkbox v-model="checked" @click="check">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      result: [],
      checked: false,
      list: [],
      value: 1,
      subtotal: 0,
      administration: true,
      index: 0,
      cartid: "",
      cartId01: "",
      list1: [],
    };
  },
  methods: {
    submit() {
      var arr = [];
      if (this.result == "") {
        return console.log("请选择商品");
      } else {
        this.result.map((res) => {
          arr.push(res.product_id);
        });
      }
      
      var add = arr.join(" ");
      this.$store.dispatch("SUBMIT_LIST", add);
      this.$router.push("/submit");
    },
    dan(item, index) {
      this.index = index;
      this.cartid = item.cart_id;
      this.cartId01 = item.product_id;
      this.$store.dispatch("CART_REMOVE", this.index);
    },
    remove() {
      console.log("aaa");
      let params = {
        carid: this.cartid,
      };

      this.$netClient.remove(qs.stringify(params)).then((res) => {
        console.log(res);
      });

      this.$store.dispatch("CART_REMOVE", this.index);

      this.$netClient
        .cartList({
          params: {
            page: "1",
            pageSize: "5",
          },
        })
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          this.$store.dispatch("ADD_LIST", res.data.data);
        });
    },
    onClickRight() {
      this.administration = !this.administration;
    },
    check() {
      if (this.checked == true) {
        this.result = this.$store.state.cartClist;
      } else {
        this.result = [];
      }
    },
    Choice() {
      this.subtotal = 0;
      this.result.map((res) => {
        this.subtotal += res.price * res.product_amount * 100;
      });

      this.checked = this.result.length == this.$store.state.cartClist.length;
    },
    numList(item) {
      let params = {
        catId: item.cart_id,
        product_amount: item.product_amount,
      };

      this.$netClient.cartNum(qs.stringify(params)).then((res) => {
        // console.log(res);
      });

      this.Choice();
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  mounted() {
    this.$netClient
      .cartList({
        params: {
          page: "1",
          pageSize: "5",
        },
      })
      .then((res) => {
        console.log(res.data.code);

        if (res.data.code == 200) {
          let li = res.data.data;
          if (li[li.length - 1] && li.length != 0) {
          } else {
            if (li.length == 0) {
            } else {
              li.pop();
            }
          }
          this.list1 = li;
          console.log('aaaaa')
          console.log(this.list1);
        }
        this.$store.dispatch("ADD_LIST", this.list1);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>