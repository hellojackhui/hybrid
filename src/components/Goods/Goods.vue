<template>
    <div class="goods" :class="[layoutClass, {'goods-scroll' : isScroll}]" :style="{height: goodsViewHeight}"
    @scroll="onScrollChange" ref="goods">
        <div class="goods-item" :class="layoutItemClass"  :style="goodsItemStyles[index]"
        v-for="(item, index) in sortGoodsData" :key="index" ref="goodsItem" @click="onGoodsItemClick(item)">
            <img class="goods-item-img" :src="item.img" alt="" srcset="" :style="imgStyles[index]">
            <div class="goods-item-desc">
                <p class="goods-item-desc-name" :class="{'goods-item-desc-name-hint' : !item.isHave}">
                    <direct v-if="item.isDirect"></direct>
                    <no-have v-if="!item.isHave"></no-have>
                    {{item.name}}
                </p>
                <div class="goods-item-desc-data">
                    <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
                    <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Direct from '@components/Goods/Direct.vue';
import NoHave from '@components/Goods/NoHave.vue';

export default {
  data() {
    return {
      goodsData: [],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item',
      imgStyles: [],
      sortGoodsData: [],
      itemMarginBottomSize: 8,
      goodsItemStyles: [],
      goodsViewHeight: '100%',
      scrollTopValue: 0,
    };
  },
  props: {
    sort: {
      type: String,
      default: '1',
    },
    /**
     * 1：列表布局
     * 2：网格布局
     * 3：瀑布流布局
    */
    layoutType: {
      type: String,
      default: '3',
    },
    /**
      * 是否允许 goods 单独滑动
      */
    isScroll: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.initData();
  },
  activated() {
    this.$refs.goods.scrollTop = this.scrollTopValue;
  },
  watch: {
    sort() {
      this.setSortGoodsData();
    },
    layoutType() {
      this.initLayout();
    },
  },
  methods: {
    initData() {
      this.$http.get('/goods').then((data) => {
        this.goodsData = data;
        this.setSortGoodsData();
        this.initLayout();
      });
    },
    setSortGoodsData() {
      switch (this.sort) {
        // 默认
        case '1':
          // 浅拷贝，不改变原数组
          this.sortGoodsData = this.goodsData.slice(0);
          break;
        // 价格
        case '1-2':
          this.getSortGoodsDataFromKey('price');
          break;
        // 销量
        case '1-3':
          this.getSortGoodsDataFromKey('volume');
          break;
        // 有货优先
        case '2':
          this.getSortGoodsDataFromKey('isHave');
          break;
        // 直营优先
        case '3':
          this.getSortGoodsDataFromKey('isDirect');
          break;
        default:
          break;
      }
    },
    getSortGoodsDataFromKey(key) {
      /**
      *  返回 负数 ， 表示 goods1 在 goods2 之前，
      *  返回正数， 表示 goods1 在 goods2 之后，
      *  返回 0， 顺序不变
      */
      return this.sortGoodsData.sort((goods1, goods2) => {
        const v1 = goods1[key];
        const v2 = goods2[key];
        // boolean 类型值的处理
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1;
          }
          if (v2) {
            return 1;
          }
          return 0;
        }
        // float 类型值的处理
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1;
        }
        return 1;
      });
    },
    imgHeight() {
      return Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
    },
    initImgsStyle() {
      this.goodsData.forEach(() => {
        const imgHeight = `${this.imgHeight()}px`;
        this.imgStyles.push({
          height: imgHeight,
        });
      });
    },
    /**
      * 根据随机高度，生成图片样式数据
    */
    initImgStyles() {
      this.goodsData.forEach(() => {
        this.imgStyles.push(
          {
            height: `${this.imgHeight()}px`,
          },
        );
      });
    },
    initLayout() {
      this.goodsViewHeight = '100%';
      this.goodsItemStyles = [];
      this.imgStyles = [];
      switch (this.layoutType) {
        case '1':
          this.layoutClass = 'goods-list';
          this.layoutItemClass = 'goods-list-item';
          break;
        case '2':
          this.layoutClass = 'goods-grid';
          this.layoutItemClass = 'goods-grid-item';
          break;
        case '3':
          this.layoutClass = 'goods-waterfall';
          this.layoutItemClass = 'goods-waterfall-item';
          this.initImgStyles();
          this.$nextTick(() => {
            this.initWaterfall();
          });
          break;
        default:
          break;
      }
    },
    initWaterfall() {
      const $goodsItems = this.$refs.goodsItem;
      if (!$goodsItems) return;
      let leftHeightTotal = 0;
      let rightHeightTotal = 0;
      $goodsItems.forEach(($el) => {
        let goodsItemStyle = {};
        const elHeight = $el.clientHeight + this.itemMarginBottomSize;
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: `${leftHeightTotal}px`,
          };
          leftHeightTotal += elHeight;
        } else {
          goodsItemStyle = {
            right: '0px',
            top: `${rightHeightTotal}px`,
          };
          rightHeightTotal += elHeight;
        }
        this.goodsItemStyles.push(goodsItemStyle);
      });
      // 在不需要 goods 自滑动的时候，再去计算 goodsView 的高度
      if (!this.isScroll) {
        this.goodsViewHeight = leftHeightTotal > rightHeightTotal ? `${leftHeightTotal}px` : `${rightHeightTotal}px`;
      }
    },
    onScrollChange($e) {
      this.scrollTopValue = $e.target.scrollTop;
    },
    /**
      * 商品点击事件
    */
    onGoodsItemClick(item) {
      if (!item.isHave) {
        // eslint-disable-next-line
        alert('该商品暂无库存');
        return;
      }
      this.$store.commit('setSelectGoods', item);
      this.$router.push({
        name: 'goodsDetails',
        params: {
          routerType: 'push',
          // goods: item
        },
      });
    },
  },
  components: {
    Direct,
    NoHave,
  },
};
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }
  &-item {
    background-color: white;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        font-size: $infoSize;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        line-height: px2rem(18);
        &-hint {
          color: $textHintColor;
        }
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 300;
        }
        &-volume {
          font-size: $infoSize;
          color: $textHintColor;
        }
      }
    }
  }
}
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
.goods-grid {
  margin: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
.goods-waterfall {
  position: relative;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    box-sizing: border-box;
    padding: px2rem(2);
    border-radius: $radiusSize;
    background-color: white;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
