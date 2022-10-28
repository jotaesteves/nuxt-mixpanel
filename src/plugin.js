import Vue from 'vue';
import VueMixpanel from './vue-mixpanel.js';

function shouldUseRouter(moduleOptions, $config) {
  return moduleOptions.useRouter ?? $config.MIXPANEL_USE_ROUTER ?? true;
}

const OPTIONS = '<%= JSON.stringify(options) %>';

export default function (context, inject) {
  const { app, store, $config } = context;

  const moduleOptions = JSON.parse(OPTIONS);

  const options = {
    token: process.env.mixpanelToken || ($config && $config.mixpanelToken),
    config: moduleOptions.config || ($config && $config.mixpanelConfig) || {},
    name: moduleOptions.name || ($config && $config.mixpanelName) || null,
  };

  const useRouter = shouldUseRouter(moduleOptions, $config);

  if (useRouter && app.router) {
    options.router = app.router;
  }

  Vue.use(VueMixpanel, options);

  if (store) {
    store.$mixpanel = Vue.$mixpanel;
  }

  context.$mixpanel = Vue.$mixpanel;

  if (Vue.$mixpanel) {
    inject('mixpanel', Vue.$mixpanel);
  }
}
