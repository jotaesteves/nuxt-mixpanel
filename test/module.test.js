// Mock consola before requiring the module
const mockConsola = {
  success: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock("consola", () => ({
  withScope: jest.fn(() => mockConsola),
}));

const moduleFunction = require("../src/module.js");

describe("Nuxt Mixpanel Module", () => {
  let mockNuxtContext;

  beforeEach(() => {
    mockNuxtContext = {
      addPlugin: jest.fn(),
      options: {
        mixpanel: {},
      },
    };

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe("Module Configuration", () => {
    test("should add plugin with default options", () => {
      const moduleOptions = {
        token: "test-token",
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockNuxtContext.addPlugin).toHaveBeenCalledWith({
        src: expect.stringContaining("plugin.js"),
        fileName: "nuxt-mixpanel.js",
        ssr: false,
        options: expect.objectContaining({
          token: "test-token",
          config: {},
          name: "mixpanel",
        }),
      });
    });

    test("should merge module options with nuxt config", () => {
      mockNuxtContext.options.mixpanel = {
        config: { debug: true },
      };

      const moduleOptions = {
        token: "test-token",
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockNuxtContext.addPlugin).toHaveBeenCalledWith({
        src: expect.stringContaining("plugin.js"),
        fileName: "nuxt-mixpanel.js",
        ssr: false,
        options: expect.objectContaining({
          token: "test-token",
          config: { debug: true },
        }),
      });
    });

    test("should use environment variable for token when no module token provided", () => {
      const originalEnv = process.env.MIXPANEL_TOKEN;
      process.env.MIXPANEL_TOKEN = "env-token";

      moduleFunction.call(mockNuxtContext, {});

      expect(mockNuxtContext.addPlugin).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            token: "env-token",
          }),
        })
      );

      // Restore original environment
      if (originalEnv) {
        process.env.MIXPANEL_TOKEN = originalEnv;
      } else {
        delete process.env.MIXPANEL_TOKEN;
      }
    });

    test("should prioritize module options over environment variables", () => {
      const originalEnv = process.env.MIXPANEL_TOKEN;
      process.env.MIXPANEL_TOKEN = "env-token";

      const moduleOptions = {
        token: "module-token",
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockNuxtContext.addPlugin).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            token: "module-token",
          }),
        })
      );

      // Restore original environment
      if (originalEnv) {
        process.env.MIXPANEL_TOKEN = originalEnv;
      } else {
        delete process.env.MIXPANEL_TOKEN;
      }
    });
  });

  describe("Module Disabling", () => {
    test("should skip plugin injection when disabled", () => {
      const moduleOptions = {
        token: "test-token",
        disabled: true,
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockNuxtContext.addPlugin).not.toHaveBeenCalled();
      expect(mockConsola.info).toHaveBeenCalledWith("Mixpanel module disabled, skipping plugin injection");
    });

    test("should inject plugin when not disabled", () => {
      const moduleOptions = {
        token: "test-token",
        disabled: false,
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockNuxtContext.addPlugin).toHaveBeenCalled();
    });
  });

  describe("Token Validation", () => {
    test("should warn when no token is provided", () => {
      // Clear environment token to ensure no token is available
      const originalEnv = process.env.MIXPANEL_TOKEN;
      delete process.env.MIXPANEL_TOKEN;

      const moduleOptions = {};

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockConsola.warn).toHaveBeenCalledWith("Mixpanel token not provided. Module will not work properly.");

      // Restore original environment
      if (originalEnv) {
        process.env.MIXPANEL_TOKEN = originalEnv;
      }
    });

    test("should not warn when token is provided", () => {
      const moduleOptions = {
        token: "test-token",
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockConsola.warn).not.toHaveBeenCalled();
    });

    test("should not warn when token is provided via environment", () => {
      const originalEnv = process.env.MIXPANEL_TOKEN;
      process.env.MIXPANEL_TOKEN = "env-token";

      moduleFunction.call(mockNuxtContext, {});

      expect(mockConsola.warn).not.toHaveBeenCalled();

      // Restore original environment
      if (originalEnv) {
        process.env.MIXPANEL_TOKEN = originalEnv;
      } else {
        delete process.env.MIXPANEL_TOKEN;
      }
    });
  });

  describe("Success Logging", () => {
    test("should log success message when module initializes", () => {
      const moduleOptions = {
        token: "test-token",
      };

      moduleFunction.call(mockNuxtContext, moduleOptions);

      expect(mockConsola.success).toHaveBeenCalledWith("Mixpanel module initialized");
    });
  });

  describe("Module Metadata", () => {
    test("should have meta property with package info", () => {
      expect(moduleFunction.meta).toBeDefined();
      expect(moduleFunction.meta.name).toBe("nuxt-mixpanel");
    });
  });
});
