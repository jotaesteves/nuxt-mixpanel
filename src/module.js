const path = require('path');
const consola = require('consola').withScope('nuxt:mixpanel');

function mixpanelModule(moduleOptions) {
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
    consola.info('Mixpanel module disabled, skipping plugin injection');
    return;
  }

  if (!options.token) {
    consola.warn('Mixpanel token not provided. Module will not work properly.');
  }

  this.addPlugin(pluginOpts);
  
  consola.success('Mixpanel module initialized');
}

module.exports = mixpanelModule;
module.exports.meta = require('../package.json');
