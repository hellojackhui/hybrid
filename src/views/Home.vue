<template>
  <div class="home">
    <p class="test">abc</p>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      a: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
  .test {
    font-size: px2rem(16);
  }
</style>
