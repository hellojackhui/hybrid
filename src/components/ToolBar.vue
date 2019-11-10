<template>
    <div class="tool-bar">
        <div class="tool-bar-item" v-for="(item, index) in toolBarData" :key="index"
        @click="onChangeFragment(item, index)">
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

import nName from '@imgs/home-n.svg';
import hName from '@imgs/home-h.svg';
import nShopping from '@imgs/shopping-n.svg';
import hShopping from '@imgs/shopping-h.svg';
import nMy from '@imgs/my-n.svg';
import hMy from '@imgs/my-h.svg';

export default {
  data() {
    return {
      toolBarData: [
        {
          nIcon: nName,
          hIcon: hName,
          name: '首页',
          componentName: 'home',
        },
        {
          nIcon: nShopping,
          hIcon: hShopping,
          name: '购物车',
          componentName: 'shopping',
        },
        {
          nIcon: nMy,
          hIcon: hMy,
          name: '我的',
          componentName: 'my',
        },
      ],
      selectItemIndex: 0,
    };
  },
  methods: {
    onChangeFragment(item, index) {
      this.selectItemIndex = index;
      this.$emit('onChangeFragment', item.componentName);
    },
  },
};
</script>
