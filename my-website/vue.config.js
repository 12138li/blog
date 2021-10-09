// vue-cli的配置文件
module.exports = {
    devServer: {
      proxy: {
        "/api": {
            // 开发服务器
          target: "http://test.my-website.com",
        },
      },
    },
  };
  