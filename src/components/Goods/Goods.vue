<template>
    <div class="goods goods-waterfall" :style="{height: goodsViewHeight}">
      <div class="goods-waterfall-item" v-for="(item, index) in list" :key="index" ref="goodsItem" :style="goodsItemStyles[index]">
        <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]"/>
        <div class="goods-item-desc">
          <p class="goods-item-desc-name" :class="{'goods-item-desc-name-hint' : !item.isHave}">
            <direct v-if="item.isdirect"></direct>
            <no-have v-if="!item.isHave"></no-have>
            {{item.name}}
          </p>
          <div class="goods-item-desc-data">
            <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
            <p class="goods-item-desc-data-volume">销量:{{item.volume}}</p>
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
      list: [],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles: [],
      itemMarginBottomSize: 8,
      goodsItemStyles: [],
      goodsViewHeight: '100%',
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
  watch: {
    layoutType() {
      this.initLayout();
    },
  },
  methods: {
    initData() {
      this.$http.get('/goods').then((data) => {
        this.list = data;
        this.initImgsStyle();
        this.initLayout();
      });
    },
    imgHeight() {
      return Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
    },
    initImgsStyle() {
      this.list.forEach(() => {
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
      this.list.forEach(() => {
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
