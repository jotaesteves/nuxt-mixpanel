const path = require('path');
const logger = require('consola').withScope('nuxt:mixpanel');

function bakeModule(moduleOptions) {
  const options = Object.assign(
    {
      token: process.env.MIXPANEL_TOKEN,
      config: {},
      name: 'mixpanel',
    },
    this.options.mixpanel,
    moduleOptions
  );

  const pluginOpts = {
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-mixpanel.js',
    ssr: false,
    options,
  };

  if (options.disabled) {
    logger.info('Disabled, skipping plugin injection');
    return;
  }

  this.addPlugin(pluginOpts);
}

module.exports = bakeModule;
module.exports = module.exports.meta = require('../package.json');
