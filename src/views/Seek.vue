<template>
  <div>
    <van-nav-bar title="商品搜索" left-arrow @click-left="onClickLeft" />

    <van-search v-model="value" show-action @focus="onFocus" label="商品名" placeholder="请输入搜索关键词">
      <template #action>
        <div @click="onSearc">搜索</div>
      </template>
    </van-search>

    <div class="boss" v-show="isBoss">
      <div class="hot">
        <p>全网热搜</p>
        <div>
          <van-tag
            plain
            type="primary"
            text-color="#A4A5A7"
            size="large"
            style="margin:0.1rem 0.12rem;"
            v-for="(item,index) in hotList"
            :key="index"
            @click="onTag(item)"
          >{{item}}</van-tag>
        </div>
      </div>
      <div class="history" v-show="isShow">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索历史</van-divider>
        <div v-show="isShow1" class="history01">
          <div
            v-for="(item,index) in  this.$store.state.historyList"
            :key="index"
            class="history02"
          >
            <p>{{item}}</p>
            <p @click="onRemove(index)">
              <van-icon name="close" />
            </p>
          </div>
        </div>
        <van-button
          plain
          type="info"
          style="width:66%;margin:0.5rem 17%;"
          @click="onRemove02"
        >清空历史记录</van-button>
      </div>
    </div>

    <div class="boss1" v-show="isBoss1">
      <van-tabs v-model="active">
        <van-tab title="综合"></van-tab>
        <van-tab title="销量"></van-tab>
        <van-tab title="新品"></van-tab>
        <van-tab title="价格"></van-tab>
      </van-tabs>

      <div class="list">
        <List
          v-for="(item,index) in list"
          :key="index"
          :goodsLogo="item.goodsLogo"
          :goodsName="item.goodsName"
          :goodsPrice="item.goodsPrice"
          :goodsBuyNum="item.goodsBuyNum"
          @onSearch="onSearch(item.goodsId)"
        ></List>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import { debounce, throttle } from "@/untils/untils";
export default {
  components: {
    List,
  },
  data() {
    return {
      value: "",
      hotList: [],
      isShow: false,
      isShow1: false,
      isBoss: true,
      active: 0,
      list: [],
      isBoss1: false,
      //   historyList: [],
    };
  },
  created() {
    this.$netClient.hot().then((res) => {
      // console.log(res.data.data)
      this.hotList = res.data.data;
    });
    console.log(this.$store.state.historyList.length);
  },
  methods: {
    isboss() {
      this.isBoss = false;
      this.isBoss1 = true;
      this.$netClient
        .seargoods({
          params: {
            goodsName: this.value,
            page: "1",
            pageSize: "20",
            sortType: "syn",
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
        });
    },
    onTag(item) {
      this.value = item;
      this.onSearc();
      this.onFocus();
      this.isboss();
    },
    onRemove(index) {
      //   console.log(index);
      this.$store.dispatch("REMOVE_SEEK", index);
    },
    onRemove02() {
      this.$store.dispatch("REMOVE_SEEK02");
    },
    onSearc: debounce(function () {
      console.log("aaa");
      if (this.value == "") {
        return alert("搜索的内容不能为空");
      } else if (this.$store.state.historyList.length != 0) {
        this.isShow1 = true;
      } else {
        this.isShow1 = false;
      }
      this.$store.dispatch("SEARCH_ADD", this.value);
      this.isboss();
    },1000),
    onFocus: throttle(function () {
      this.isShow = true;
      this.isShow1 = false;
      if (this.value == "") {
        return;
      }
      if (this.$store.state.historyList.length != 0) {
        this.isShow1 = true;
      } else {
        this.isShow1 = false;
      }
    },1000),

    onClickLeft() {
      this.$router.back();
    },
    onSearch(goodsId) {
      console.log(goodsId);
      this.$router.push({
        path: "Search",
        query: {
          goodsId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  font-size: 0.2rem;
}
.history01 {
  width: 100%;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.35rem;
    box-sizing: border-box;
    padding: 0 0.4rem;
    border-bottom: 1px solid #fafbfb;
  }
}
.hot {
  width: 100%;
  p {
    font-size: 0.35rem;
    color: #a4a5a7;
    margin-left: 1.5rem;
  }
  div {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.8rem;
  }
}
</style>