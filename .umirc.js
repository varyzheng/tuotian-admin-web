
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '托田官网管理系统',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  targets: {
    ie: 9,
  },
  proxy: {
    "/api": {
      "target": "http://47.91.253.15/",
      // "target": "http://192.168.1.103:9090/",
      "changeOrigin": true,
      "pathRewrite": { "^/" : "" }
      // "pathRewrite": { "^/api" : "" }
    },
  },
}
