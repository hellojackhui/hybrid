const path = require('path');

// vue.config.js
module.exports = {
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
      } else {
        // 为开发环境修改配置...
        // return {
        //     resolve: {
        //         alias: {
        //             '@js': path.resolve(__dirname, './src/common/js'),
        //             '@css': path.resolve(__dirname, './src/common/css'),
        //             '@imgs': path.resolve(__dirname, './src/assets/images'),
        //             '@components': path.resolve(__dirname, './src/components'),
        //             '@views': path.resolve(__dirname, './src/views'),
        //         }
        //     }
        // }
      }
      return {
        resolve: {
            alias: {
              '@js': path.resolve(__dirname, './src/common/js'),
              '@css': path.resolve(__dirname, './src/common/css'),
              '@imgs': path.resolve(__dirname, './src/assets/images'),
              '@components': path.resolve(__dirname, './src/components'),
              '@views': path.resolve(__dirname, './src/views'),
            }
        }
    }
    }
}