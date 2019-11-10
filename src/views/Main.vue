<template>
    <div class="main">
      <component :is="conponentName"></component>
      <tool-bar @onChangeFragment="onChangeFragment" />
    </div>
</template>
<script>
import ToolBar from '@components/ToolBar.vue';

export default {
  name: 'Main',
  data() {
    return {
      conponentName: 'Home',
    };
  },
  components: {
    ToolBar,
    Home: () => import('@views/Home.vue'),
    Shopping: () => import('@views/Shopping.vue'),
    My: () => import('@views/My.vue'),
  },
  methods: {
    onChangeFragment(name) {
      this.conponentName = name;
    },
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
