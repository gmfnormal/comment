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
    // /** svg */
    // const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    // fileLoaderRule.exclude = /\.svg$/;
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   loader: ['@svgr/webpack'],
    // });
    const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));

    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query
    };

    // Merge our rule with existing assetLoader rules
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", assetLoader]
    });

    return config;
  }
};
export default config;
