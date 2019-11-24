<template>
    <div class="main">
      <keep-alive>
      <component :is="conponentName"></component>
      </keep-alive>
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
  activated() {
    this.pushComponent();
  },
  components: {
    ToolBar,
    Home: () => import('@views/Home.vue'),
    Shopping: () => import('@views/Shopping.vue'),
    My: () => import('@views/My.vue'),
  },
  methods: {
    pushComponent() {
      /* eslint-disable */
      const componentIndex = this.$route.params.componentIndex;
      if (!componentIndex) return;
      this.$refs.toolBar.onChangeComponent(componentIndex);
    },
    onChangeFragment(componentName) {
      this.isComponent = componentName;
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
