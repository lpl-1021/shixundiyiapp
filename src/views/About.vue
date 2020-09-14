<template>
  <div class="about">
    <van-nav-bar left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft">
      <template #title>
        <van-search shape="round  " placeholder="请输入搜索关键词" />
      </template>
    </van-nav-bar>
    <div class="boss">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.cat_name"
          v-for="(item,index) in title"
          :key="index"
          @click="onClick(item.cat_id)"
        />
      </van-sidebar>
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
    <div style="width:100%;height:1.3rem;"></div>
  </div>
</template>
<script>
import List from "@/components/List.vue";
export default {
  components: {
    List,
  },
  data() {
    return {
      activeKey: 0,
      title: [],
      list: [],
      id: 0,
    };
  },
  mounted() {
    this.$netClient.page().then((res) => {
      console.log(res.data.data);
      this.title = res.data.data;
    });

    this.$netClient
      .classification({
        params: {
          cat_id: 85,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.list = res.data.data;
      });
  },
  methods: {
    onSearch(goodsId) {
      console.log(goodsId);
      this.$router.push({
        path: "Search",
        query: {
          goodsId,
        },
      });
    },
    onClick(id) {
      this.$netClient
        .classification({
          params: {
            cat_id: id,
          },
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.data;
        });
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .van-search {
  margin: 0;
  padding: 0;
}
/deep/ .van-sidebar-item {
  // margin: 0.1rem 0;
  padding: 0.7rem 0.2rem;
}
.boss {
  width: 100%;
  height: 90vh;
  display: inline-flex;
  justify-content: space-between;

  .list {
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    font-size: 0.2rem;
  }
}
</style>