<template>
    <div id="app">
      <tool-bar />
    </div>
</template>
<script>
import ToolBar from '@components/ToolBar.vue';

export default {
  name: 'Main',
  components: {
    ToolBar,
  },
};
</script>
<style lang="scss" scoped>
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
