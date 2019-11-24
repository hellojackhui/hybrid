<template>
    <div class="shopping">
      <navgation-bar :isShowBack="false" :pageName="'购物车'"></navgation-bar>
      <h1>Shopping</h1>
    </div>
</template>
<script>
import NavgationBar from '@components/NavigationBar.vue';

export default {
  name: 'shopping',
  components: {
    NavgationBar,
  },
};
</script>
<style lang="scss" scoped>
  .shopping {
    width: 100%;
    height: 100%;
  }
</style>
