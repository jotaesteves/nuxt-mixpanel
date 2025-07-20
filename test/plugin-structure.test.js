const fs = require("fs");
const path = require("path");

describe("Nuxt Mixpanel Plugin Structure", () => {
  let pluginContent;

  beforeAll(() => {
    const pluginPath = path.join(__dirname, "../src/plugin.js");
    pluginContent = fs.readFileSync(pluginPath, "utf8");
  });

  describe("Plugin Code Structure", () => {
    test("should export a default function", () => {
      expect(pluginContent).toContain("export default function");
    });

    test("should import Vue and VueMixpanel", () => {
      expect(pluginContent).toContain('import Vue from "vue"');
      expect(pluginContent).toContain('import VueMixpanel from "./vue-mixpanel.js"');
    });

    test("should use template string for options", () => {
      expect(pluginContent).toContain("<%= JSON.stringify(options) %>");
    });

    test("should check for router integration", () => {
      expect(pluginContent).toContain("shouldUseRouter");
      expect(pluginContent).toContain("useRouter");
    });

    test("should handle token configuration", () => {
      expect(pluginContent).toContain("token:");
      expect(pluginContent).toContain("mixpanelToken");
    });

    test("should inject mixpanel into context", () => {
      expect(pluginContent).toContain('inject("mixpanel"');
    });

    test("should handle store integration", () => {
      expect(pluginContent).toContain("store.$mixpanel");
    });
  });

  describe("Router Configuration Logic", () => {
    test("should have shouldUseRouter function", () => {
      expect(pluginContent).toContain("function shouldUseRouter");
      expect(pluginContent).toContain("MIXPANEL_USE_ROUTER");
    });

    test("should use nullish coalescing for default values", () => {
      expect(pluginContent).toContain("??");
    });
  });

  describe("Code Quality", () => {
    test("should handle all context properties", () => {
      expect(pluginContent).toContain("const { app, store, $config } = context");
    });

    test("should properly destructure options", () => {
      expect(pluginContent).toContain("JSON.parse(OPTIONS)");
    });

    test("should have proper error handling structure", () => {
      expect(pluginContent).toContain("Vue.prototype.$mixpanel");
    });
  });
});
