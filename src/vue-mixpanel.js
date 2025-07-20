/**
 * Vue Mixpanel v1.0.5
 * https://github.com/Loschcode/vue-mixpanel
 *
 * Copyright 2020, cmp-cc
 * Released under the MIT license
 */
import mixpanel from "mixpanel-browser";
const consola = require("consola").withScope("nuxt:mixpanel");

const VueMixpanel = {};

Object.assign(VueMixpanel, {
  install(Vue, options) {
    if (typeof options !== "object") options = {};

    Vue.prototype.$mixpanel = mixpanel;

    const defaultConfig = {};
    const debug = {
      loaded() {
        consola.success("✔ Mixpanel reporting is enabled");
      },
    };
    const endConfig = Object.assign(defaultConfig, options.config || {});

    if (options.config && options.config.debug) {
      Object.assign(endConfig, debug);
    }

    try {
      Vue.prototype.$mixpanel.init(options.token, endConfig, options.name || null);
    } catch (error) {
      consola.error("Failed to initialize Mixpanel:", error.message);
      return;
    }

    if (options.router) {
      try {
        options.router.afterEach((to) => {
          Vue.prototype.$mixpanel.track("Page Viewed", {
            url: to.fullPath,
          });
        });
        consola.success(`✔ Mixpanel router is enabled`);
      } catch (error) {
        consola.error(`Mixpanel router is disabled (${error})`);
      }
    }
  },
});

export default VueMixpanel;
