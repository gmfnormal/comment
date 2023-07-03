/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const path = require('path');
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    /** tsx */
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('ts-loader')
    })
    /** less/css */
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ],
      include: path.resolve(__dirname, '../')
    })
    /** less/css module */
    config.module.rules.push({
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        'less-loader'
      ],
      include: path.resolve(__dirname, '../')
    })
    /** svg */
    config.module.rules = config.module.rules.map(rule => {
      if (
        String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        }
      }
      return rule
    })
    // use svgr for svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config;
  }
};
export default config;
