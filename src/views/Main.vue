<template>
    <div class="main">
      <keep-alive>
      <component :is="conponentName"></component>
      </keep-alive>
      <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment" />
    </div>
</template>
<script>
import ToolBar from '@components/ToolBar.vue';
import Home from '@views/Home.vue';
import Shopping from '@views/Shopping.vue';
import My from '@views/My.vue';

export default {
  name: 'Main',
  data() {
    return {
      conponentName: 'home',
    };
  },
  activated() {
    this.pushComponent();
  },
  components: {
    ToolBar,
    home: Home,
    shopping: Shopping,
    my: My,
  },
  methods: {
    pushComponent() {
      /* eslint-disable */
      const componentIndex = this.$route.params.componentIndex;
      if (!componentIndex) return;
      this.$refs.toolBar.onChangeComponent(componentIndex);
    },
    onChangeFragment(componentName) {
      this.conponentName = `${componentName}`;
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
