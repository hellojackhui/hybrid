<template>
    <div class="home">
      <div class="home-content">
        <new-swiper :swiperImgs="swiperImgs" :height="height"></new-swiper>
        <activity>
          <div class="activity-1111">
            <img v-for="(item, index) in activityImgs" :key="index" :src="item.icon"/>
          </div>
        </activity>
        <mode-options />
        <seconds :dataSource="secondsDatas"/>
      </div>
    </div>
</template>
<script>
import NewSwiper from '@components/NewSwiper.vue';
import Activity from '@components/Activity.vue';
import ModeOptions from '@components/ModeOptions.vue';
import Seconds from '@components/Seconds/Seconds.vue';

export default {
  name: 'home',
  created() {
    this.initData();
  },
  components: {
    NewSwiper,
    Activity,
    ModeOptions,
    Seconds,
  },
  data() {
    return {
      swiperImgs: [],
      height: '184px',
      activityImgs: [],
      secondsDatas: [],
    };
  },
  methods: {
    initData() {
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activities'),
        this.$http.get('/seconds'),
      ]).then(this.$http.spread((swiperImgs, activityImgs, secondsDatas) => {
        this.swiperImgs = swiperImgs.list;
        this.activityImgs = activityImgs.list;
        this.secondsDatas = secondsDatas.list;
      }));
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
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
