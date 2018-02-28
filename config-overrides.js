require('dotenv').config()
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const themeConfig = require('./src/config/theme');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config); // change importing css to less
  config = rewireLess.withLoaderOptions({
     modifyVars: themeConfig,
  })(config, env);
  return config;
};