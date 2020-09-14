<template>
  <div>
    <van-nav-bar
      title="管理地址"
      left-text="返回"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-address-list
      @select="selectList"
      add-button-text="选择当前地址"
      v-model="chosenAddressId"
      :list="list"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      list: [],
      chosenAddressId: "1",
    };
  },
  mounted() {
    // let params = {
    //   userid: "75",
    //   areaId: "126",
    // };
    // this.$netClient.removesite(qs.stringify(params)).then((res) => {
    //   console.log(res);
    // });

    this.$netClient.savesite().then((res) => {
      console.log(res);
      this.list = res.data.data;
    });
  },
  methods: {
    selectList(item) {
      console.log(item);
      this.$store.dispatch("SELEC_SITE", item);
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push("/addsite");
    },
    onAdd() {
      this.$router.push("/submit");
      // Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>