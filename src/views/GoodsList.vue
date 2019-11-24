<template>
    <div class="goods-list-page">
      <navigation-bar :pageName="'商品列表'" @onLeftClick="onBackClick">
        <template v-slot:nav-right>
            <img :src="layoutType.icon" @click="onChangelayoutTypeClick()">
        </template>
      </navigation-bar>
      <div class="goods-list-page-content" :class="{'iphonex-bottom' : isIphoneX}">
        <goods-options @optionsChange="onOptionsChange"></goods-options>
        <goods :sort="sortType" :layoutType="layoutType.type"></goods>
      </div>
    </div>
</template>
<script>
import NavigationBar from '@components/NavigationBar.vue';
import ListType from '@imgs/list-type.svg';
import GridType from '@imgs/grid-type.svg';
import WaterfallType from '@imgs/waterfall-type.svg';
import GoodsOptions from '@components/Goods/GoodsOptions.vue';
import Goods from '@components/Goods/Goods.vue';

export default {
  name: 'Goodslist',
  data() {
    return {
      isIphoneX: window.isIphoneX,
      sortType: '1',
      layoutTypeDatas: [
        {
          type: '1',
          icon: ListType,
        },
        {
          type: '2',
          icon: GridType,
        },
        {
          type: '3',
          icon: WaterfallType,
        },
      ],
      layoutType: {},
    };
  },
  created() {
    /* ignore prefer-destructuring */
    this.layoutType = { ...this.layoutTypeDatas[0] };
  },
  components: {
    NavigationBar,
    GoodsOptions,
    Goods,
  },
  methods: {
    /**
     * 后退按钮点击事件
     */
    onBackClick() {
      this.$router.go(-1);
    },
    /**
     * 监听筛选项的变化
     */
    onOptionsChange(option) {
      this.sortType = option.id;
    },
    /**
     * 修改数据的排列方式
     */
    onChangelayoutTypeClick() {
      if (this.layoutType.type === '1') {
        this.layoutType = { ...this.layoutTypeDatas[1] };
      } else if (this.layoutType.type === '2') {
        this.layoutType = { ...this.layoutTypeDatas[2] };
      } else {
        this.layoutType = { ...this.layoutTypeDatas[0] };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
    .goods-list-page {
        height: 100%;
        width: 100%;
        background-color: $bgColor;
        display: flex;
        flex-direction: column;
        position: absolute;
        &-content {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }
</style>
