<template>
    <div class="home" @scroll="onScrollChange" ref="home">
      <navgation-bar :isDefault="false" :navBarStyle="navBarStyle">
        <template v-slot:nav-left>
            <img :src="navBarCurrentSlot.leftIcon">
        </template>
        <template v-slot:nav-center>
            <search :bgColor="navBarCurrentSlot.search.bgColor" :hintColor="navBarCurrentSlot.search.hintColor"
            :icon="navBarCurrentSlot.search.icon"></search>
        </template>
        <template v-slot:nav-right>
            <img :src="navBarCurrentSlot.rightIcon">
        </template>
      </navgation-bar>
      <div class="home-content">
        <new-swiper :swiperImgs="swiperImgs" :height="height"></new-swiper>
        <activity>
          <div class="activity-1111">
            <img v-for="(item, index) in activityImgs" :key="index" :src="item.icon"/>
          </div>
        </activity>
        <mode-options />
        <seconds :dataSource="secondsDatas"/>
        <activity>
          <div class="activity-img">
            <img src="@imgs/pinyigo.webp" />
          </div>
        </activity>
        <goods :layoutType="'3'" :isScroll="false" />
      </div>
    </div>
</template>
<script>
import NavgationBar from '@components/NavigationBar.vue';
import NewSwiper from '@components/NewSwiper.vue';
import Activity from '@components/Activity.vue';
import ModeOptions from '@components/ModeOptions.vue';
import Seconds from '@components/Seconds/Seconds.vue';
import Goods from '@components/Goods/Goods.vue';
import Search from '@components/Search.vue';
import MoreWhite from '@imgs/more-white.svg';
import SearchIcon from '@imgs/search.svg';
import MessageWhite from '@imgs/message-white.svg';
import More from '@imgs/more.svg';
import SearchWhite from '@imgs/search-white.svg';
import Message from '@imgs/message.svg';

export default {
  name: 'home',
  created() {
    this.navBarCurrentSlot = this.navBarSlotData.normal;
    this.initData();
  },
  components: {
    NewSwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavgationBar,
    Search,
  },
  activated() {
    this.$refs.home.scrollTop = this.scrollTopValue;
  },
  data() {
    return {
      navBarSlotData: {
        normal: {
          leftIcon: MoreWhite,
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: SearchIcon,
          },
          rightIcon: MessageWhite,
        },
        highlight: {
          leftIcon: More,
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: SearchWhite,
          },
          rightIcon: Message,
        },
      },
      swiperDatas: [],
      height: '184px',
      activityImgs: [],
      secondsDatas: [],
      // 顶部样式
      navBarStyle: {
        backgroundColor: '',
        position: 'fixed',
      },
      // 滚动值
      scrollTopValue: -1,
      ANCHOR_SCROLL_TOP: 160,
      navBarCurrentSlot: {},
    };
  },
  methods: {
    initData() {
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activities'),
        this.$http.get('/seconds'),
      ]).then(this.$http.spread((swiperImgs, activityImgs, secondsDatas) => {
        this.swiperDatas = swiperImgs.list;
        this.activityImgs = activityImgs.list;
        this.secondsDatas = secondsDatas.list;
      }));
    },
    onScrollChange($e) {
      this.scrollTopValue = $e.target.scrollTop;
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
      if (opacity >= 1) {
        this.navBarCurrentSlot = this.navBarSlotData.highlight;
      } else {
        this.navBarCurrentSlot = this.navBarSlotData.normal;
      }
      this.navBarStyle.backgroundColor = `rgba(255, 255, 255,${opacity + 0.2})`;
    },
  },
  computed: {
    swiperImgs() {
      return this.swiperDatas.map(item => item.icon);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
  .home {
    width: 100%;
    height: 100%;
    background: $bgColor;
    overflow-y: scroll;
    &-content {
      height: 100%;
      .activity-1111 {
        margin-top: -8px;
        border-top-left-radius: px2rem(8);
        border-top-right-radius: px2rem(8);
        img {
          display: inline-block;
          width: 33.3%;
          z-index: 2;
        }
      }
      .activity-img {
        background-color: white;
        margin-top: $marginSize;
        img {
          width: 100%;
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
