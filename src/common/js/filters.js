import Vue from 'vue';

// 金额过滤器
Vue.filter('priceValue', (value) => {
  if (!value) {
    return '0.00';
  }
  const result = parseFloat(value);
  if (Number.isInteger(result)) {
    return result;
  }
  return result.toFixed(2);
});
