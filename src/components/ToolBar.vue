<template>
    <div class="tool-bar">
        <div class="tool-bar-item" v-for="(item, index) in toolBarData" :key="index">
            <img
              class="tool-bar-item-img"
              :src="[index === selectItemIndex ? item.hIcon : item.nIcon]"
              alt=""
              srcset="" />
            <p class="tool-bar-item-name"
            :class="{'tool-bar-item-name-h' : index === selectItemIndex}">{{item.name}}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@css/style.scss';
  .tool-bar {
    width: 100%;
    height: px2rem(46);
    display: flex;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    border-top: 1px solid $lineColor;
    .tool-bar-item {
      text-align: center;
      padding: px2rem(4) 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tool-bar-item-img {
        width: px2rem(22);
        height: px2rem(22);
      }
      .tool-bar-item-name {
        font-size: $minInfoSize;
        margin-top: px2rem(4);
        &-h {
          color: $mainColor;
        }
      }
    }
  }
</style>
<script type="text/javascript">
export default {
  data() {
    return {
      toolBarData: [
        {
          nIcon: import('@imgs/home-n.svg'),
          hIcon: import('@imgs/home-h.svg'),
          name: '首页',
          componentName: 'home',
        },
        {
          nIcon: import('@imgs/shopping-n.svg'),
          hIcon: import('@imgs/shopping-h.svg'),
          name: '购物车',
          componentName: 'shopping',
        },
        {
          nIcon: import('@imgs/my-n.svg'),
          hIcon: import('@imgs/my-h.svg'),
          name: '我的',
          componentName: 'my',
        },
      ],
      selectItemIndex: 0,
    };
  },
};
</script>
