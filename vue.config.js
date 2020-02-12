module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/_var.scss";',
      },
    },
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.glsl/,
          loader: 'raw-loader',
        },
      ],
    },
  },
};
