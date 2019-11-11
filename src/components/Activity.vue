<template>
    <div class="activity">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
@import '@css/style.scss';
  .activity {
      max-height: px2rem(160px);
      position: relative;
  }
</style>
<script>
export default {
};
</script>
