// axios配置
import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc81fbc452b5262380ceb52/api';

/* eslint-disable */
axios.interceptors.response.use((response) => {
  // 统一处理数据
  return response.data.data;
}, (error) => {
  // 处理错误响应
  return Promise.reject(error);
});

Vue.prototype.$http = axios;
