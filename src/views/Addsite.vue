<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="管理地址"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-edit
      @save="onSave"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import qs from "qs";
import { Toast } from "vant";
export default {
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
        },
      },
      searchResult: [],
    };
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {},
    onSave(content) {
      // Toast("save");
      // console.log(content.name);
      // console.log(content.tel);
      // console.log(content.province);
      // console.log(content.city);
      // console.log(content.county);
      // console.log(content.addressDetail);

      let params = {
        Name: content.name,
        Phone: content.tel,
        Province: content.province,
        City: content.city,
        District: content.county,
        Address: content.addressDetail,
      };
      this.$netClient.addsite(qs.stringify(params)).then((res) => {
        console.log(res);
      });
      Toast.success('成功保存');
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>