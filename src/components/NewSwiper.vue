<template>
  <swiper :options="swiperOption" ref="newSwiper">
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :src="item" :style="{height: height}" />
    </swiper-slide>
    <template v-slot:pagination>
        <div class="swiper-pagination">
        </div>
    </template>
  </swiper>
</template>
<style lang="scss" scoped>
@import '@css/style.scss';
    .swiper-container {
        .swiper-wrapper {
            .swiper-slide {
                background-color: white;
                .swiper-slide-img {
                    width: 100%;
                }
            }
        }

        .swiper-pagination {
            bottom: px2rem(12);
            .custom-bullet-class {
                box-sizing: border-box;
                border-radius: 100%;
                height: px2rem(6);
                width: px2rem(6);
                border: px2rem(1) solid #fff;
                margin: 0 px2rem(4);
                display: inline-block;
                opacity: 1;
            }
            .swiper-pagination-bullet-active {
                background: white;
            }
        }
        .swiper-pagination-fraction {
            left: auto;
            right: 0;
            width: auto;
            font-size: $infoSize;
            background-color: rgba(0, 0, 0, .3);
            padding: px2rem(6) px2rem(18);
            border-top-left-radius: px2rem(16);
            border-bottom-left-radius: px2rem(16);
            bottom: px2rem(32);
            color: white;
            .swiper-pagination-current {
                font-size: $titleSize;
                font-weight: bold;
            }
        }
    }
</style>
<script>
import 'swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'new-swiper',
  props: {
    height: {
      type: String,
      default: 'auto',
    },
    swiperImgs: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    paginationType: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      },
    };
  },
  created() {
    this.initPaginationLayout();
  },
  methods: {
    initPaginationLayout() {
      switch (this.paginationType) {
        case '1':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletClass: 'custom-bullet-class',
          };
          break;
        case '2':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'fraction',
          };
          break;
        default:
          break;
      }
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>
