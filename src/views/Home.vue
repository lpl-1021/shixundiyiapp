<template>
  <div class="home">
    <header>
      <div class="header">
        <img src="http://localhost:8080/01.png" alt />
        <van-search v-model="value" @click="onSeek " placeholder="请输入搜索关键词" />
      </div>
    </header>
    <section>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swiper" :key="index">
          <img :src="item.slide_show_imgUrl" alt />
        </van-swipe-item>
      </van-swipe>
      <van-grid column-num="5" :border="border">
        <van-grid-item v-for="(item,index) in navigation" :key="index" class="icon">
          <template #default>
            <img :src="item.sp_home_ico" alt style="width:100%;" />
            <p>{{item.sp_home_title}}</p>
          </template>
        </van-grid-item>
      </van-grid>
      <div id="showDays" :class="headerFixed?'issFixed':''">
        <van-tabs v-model="active" @click="showDays">
          <van-tab :title="item" v-for="(item,index) in label" :key="index"></van-tab>
        </van-tabs>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
      </van-list>

      <!-- <div style="width:100%;height:1.5rem;"></div> -->
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import List from "@/components/List.vue";

export default {
  name: "Home",
  components: {
    List,
  },
  data() {
    return {
      swiper: [],
      navigation: [],
      value: "",
      border: false,
      label: ["流行", "新款", "精选"],
      active: 0,
      list: [],
      headerFixed: 0, //是否吸顶 条件
      offsetTop: 0, //元素的offsetTop
      type: ["syn", "new", "sell"],
      num: 0,
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.$netClient.swiper().then((res) => {
      // console.log(res.data.data[0]);
      this.swiper = res.data.data[1];
      this.navigation = res.data.data[0];
    });
    this.$netClient.list().then((res) => {
      console.log(res.data.data);
      this.list = res.data.data;
    });

    // 监听dom渲染完成
    this.$nextTick(function () {
      // 这里fixedHeaderRoot是吸顶元素的ID
      let header = document.getElementById("showDays");
      // 这里要得到top的距离和元素自身的高度
      this.offsetTop = header.offsetTop;
      console.log("offsetTop:" + this.offsetTop);
    });
    // handleScroll为页面滚动的监听回调
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置       console.log("divoffsetTOP"+document.getElementById("showDays").offsetTop);

      //如果滚动距离 大于元素的offsetTop 就返回1，吸顶
      //如果滚动距离 小于元素的offsetTop 就返回0，不吸顶
      this.headerFixed = scrollTop > this.offsetTop ? 1 : 0;
    },
    onSeek(){
      this.$router.push('/Seek')
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
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.$netClient
        .list({
          params: {
            sortType: this.type[this.num],
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          setTimeout(() => {
            this.list = [...this.list, ...res.data.data];
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 40) {
              this.finished = true;
            }
          }, 1000);
        });
    },
    showDays(obj) {
      // console.log(obj);
      this.list = [];
      this.finished = false;
      this.onLoad();
      this.loading = false;
      this.num = obj;
      this.$netClient
        .list({
          params: {
            sortType: this.type[this.num],
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 13.5vh;
  .header {
    width: 100%;
    height: 13.5vh;
    position: fixed;
    background: white;
    z-index: 999;
    img {
      width: 100%;
    }
  }
}
section {
  width: 100%;
  height: 80vh;
  .my-swipe {
    width: 100%;
    height: 5rem;
    margin-bottom: 0.3rem;
    img {
      width: 100%;
    }
  }
  .list {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    font-size: 0.2rem;
  }
  /deep/ .van-grid-item__content {
    padding: 8px 8px;
  }
  .issFixed {
    position: fixed;
    top: 150px;
    left: 0px;
    right: 0px;
    z-index: 4;
  }
  #showDays {
    margin: 0.2rem 0;
  }
}
</style>
