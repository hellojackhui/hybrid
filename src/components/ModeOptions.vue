<template>
    <div class="mode-options">
        <div class="mode-options-item" v-for="(item, index) in dataSource" :key="index">
            <img class="mode-options-item-icon" :src="item.icon" />
            <span class="mode-options-item-title">{{item.title}}</span>
        </div>
    </div>
</template>
<script>
import icon1 from '@imgs/mode/1.webp';
import icon2 from '@imgs/mode/2.webp';
import icon3 from '@imgs/mode/3.webp';
import icon4 from '@imgs/mode/4.webp';
import icon5 from '@imgs/mode/5.webp';
import icon6 from '@imgs/mode/6.webp';
import icon7 from '@imgs/mode/7.webp';
import icon8 from '@imgs/mode/8.webp';
import icon9 from '@imgs/mode/9.webp';
import icon10 from '@imgs/mode/10.webp';

export default {
  name: 'ModeOptions',
  data() {
    return {
      dataSource: [
        {
          id: '1',
          icon: icon1,
          title: '京东超市',
        },
        {
          id: '2',
          icon: icon2,
          title: '数码电器',
        },
        {
          id: '3',
          icon: icon3,
          title: '京东服饰',
        },
        {
          id: '4',
          icon: icon4,
          title: '京东生鲜',
        },
        {
          id: '5',
          icon: icon5,
          title: '京东到家',
        },
        {
          id: '6',
          icon: icon6,
          title: '充值缴费',
        },
        {
          id: '7',
          icon: icon7,
          title: '9.9元拼',
        },
        {
          id: '8',
          icon: icon8,
          title: '领劵',
        },
        {
          id: '9',
          icon: icon9,
          title: '赚钱',
        },
        {
          id: '10',
          icon: icon10,
          title: 'PLUS会员',
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
  .mode-options {
      display: flex;
      flex-wrap: wrap;
      background-color: white;
      padding-bottom: px2rem(14);

      &-item {
          display: inherit;
          flex-direction: column;
          align-items: center;
          width: 20%;
          text-align: center;
          margin-top: px2rem(10);
          &-icon {
              width: px2rem(40);
              height: px2rem(40);
          }
          &-title {
              font-size: $minInfoSize;
              margin-top: px2rem(6);
          }
      }
  }
</style>
