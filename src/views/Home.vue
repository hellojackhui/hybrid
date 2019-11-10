<template>
    <div class="home">
      <div class="home-content">
        <new-swiper :swiperImgs="swiperImgs" :height="height"></new-swiper>
      </div>
    </div>
</template>
<script>
import NewSwiper from '@components/NewSwiper.vue';
import Swiper1 from '@imgs/swiper-1.jpg';
import Swiper2 from '@imgs/swiper-2.jpg';
import Swiper3 from '@imgs/swiper-3.jpg';
import Swiper4 from '@imgs/swiper-4.jpg';
import Swiper5 from '@imgs/swiper-5.jpg';
import Swiper6 from '@imgs/swiper-6.jpg';
import Swiper7 from '@imgs/swiper-7.jpg';
import Swiper8 from '@imgs/swiper-8.jpg';

export default {
  name: 'home',
  components: {
    NewSwiper,
  },
  data() {
    return {
      swiperImgs: [
        Swiper1,
        Swiper2,
        Swiper3,
        Swiper4,
        Swiper5,
        Swiper6,
        Swiper7,
        Swiper8,
      ],
      height: '184px',
    };
  },
};
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
  .home {
    width: 100%;
    height: 100%;
    &-content {
      height: 100%;
    }
  }
</style>
