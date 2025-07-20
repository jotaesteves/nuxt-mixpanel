import { createLocalVue, mount } from "@vue/test-utils";
import VueMixpanel from "../src/vue-mixpanel.js";
import mixpanel from "mixpanel-browser";

// Mock mixpanel-browser
jest.mock("mixpanel-browser", () => ({
  init: jest.fn(),
  track: jest.fn(),
  identify: jest.fn(),
  people: {
    set: jest.fn(),
    track_charge: jest.fn(),
    increment: jest.fn(),
    append: jest.fn(),
    union: jest.fn(),
    unset: jest.fn(),
    delete_user: jest.fn(),
  },
  register: jest.fn(),
  register_once: jest.fn(),
  unregister: jest.fn(),
  get_property: jest.fn(),
  alias: jest.fn(),
  reset: jest.fn(),
  get_distinct_id: jest.fn(() => "test-distinct-id"),
  has_opted_in_tracking: jest.fn(() => true),
  has_opted_out_tracking: jest.fn(() => false),
  opt_in_tracking: jest.fn(),
  opt_out_tracking: jest.fn(),
  clear_opt_in_out_tracking: jest.fn(),
}));

describe("VueMixpanel Plugin", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    jest.clearAllMocks();
  });

  describe("Plugin Installation", () => {
    test("should install plugin with default options", () => {
      const options = {
        token: "test-token",
        config: {},
      };

      localVue.use(VueMixpanel, options);

      expect(mixpanel.init).toHaveBeenCalledWith("test-token", expect.any(Object), null);
    });

    test("should install plugin with custom name", () => {
      const options = {
        token: "test-token",
        config: {},
        name: "custom-mixpanel",
      };

      localVue.use(VueMixpanel, options);

      expect(mixpanel.init).toHaveBeenCalledWith("test-token", expect.any(Object), "custom-mixpanel");
    });

    test("should handle missing options gracefully", () => {
      expect(() => {
        localVue.use(VueMixpanel);
      }).not.toThrow();

      expect(mixpanel.init).toHaveBeenCalled();
    });

    test("should merge debug configuration", () => {
      const options = {
        token: "test-token",
        config: {
          debug: true,
        },
      };

      localVue.use(VueMixpanel, options);

      expect(mixpanel.init).toHaveBeenCalledWith(
        "test-token",
        expect.objectContaining({
          debug: true,
          loaded: expect.any(Function),
        }),
        null
      );
    });
  });

  describe("Router Integration", () => {
    test("should setup router tracking when router is provided", () => {
      const mockRouter = {
        afterEach: jest.fn(),
      };

      const options = {
        token: "test-token",
        config: {},
        router: mockRouter,
      };

      localVue.use(VueMixpanel, options);

      expect(mockRouter.afterEach).toHaveBeenCalledWith(expect.any(Function));
    });

    test("should track page views on route change", () => {
      const mockRouter = {
        afterEach: jest.fn(),
      };

      const options = {
        token: "test-token",
        config: {},
        router: mockRouter,
      };

      localVue.use(VueMixpanel, options);

      // Get the callback function passed to afterEach
      const routeCallback = mockRouter.afterEach.mock.calls[0][0];

      // Simulate route change
      const mockRoute = {
        fullPath: "/test-page",
      };

      routeCallback(mockRoute);

      expect(mixpanel.track).toHaveBeenCalledWith("Page Viewed", {
        url: "/test-page",
      });
    });

    test("should handle router errors gracefully", () => {
      const mockRouter = {
        afterEach: jest.fn(() => {
          throw new Error("Router error");
        }),
      };

      const options = {
        token: "test-token",
        config: {},
        router: mockRouter,
      };

      expect(() => {
        localVue.use(VueMixpanel, options);
      }).not.toThrow();
    });

    test("should not setup router when not provided", () => {
      const options = {
        token: "test-token",
        config: {},
      };

      localVue.use(VueMixpanel, options);

      // Should not throw and should not call any router methods
      expect(mixpanel.init).toHaveBeenCalled();
    });
  });

  describe("Component Integration", () => {
    test("should provide $mixpanel in component instances", () => {
      localVue.use(VueMixpanel, {
        token: "test-token",
      });

      const wrapper = mount(
        {
          template: "<div>Test Component</div>",
          mounted() {
            expect(this.$mixpanel).toBeDefined();
            expect(this.$mixpanel).toBe(mixpanel);
          },
        },
        { localVue }
      );

      expect(wrapper.vm.$mixpanel).toBe(mixpanel);
    });

    test("should allow tracking events from components", () => {
      localVue.use(VueMixpanel, {
        token: "test-token",
      });

      const wrapper = mount(
        {
          template: '<button @click="trackClick">Click me</button>',
          methods: {
            trackClick() {
              this.$mixpanel.track("Button Clicked", {
                button: "test-button",
              });
            },
          },
        },
        { localVue }
      );

      wrapper.find("button").trigger("click");

      expect(mixpanel.track).toHaveBeenCalledWith("Button Clicked", {
        button: "test-button",
      });
    });

    test("should allow user identification from components", () => {
      localVue.use(VueMixpanel, {
        token: "test-token",
      });

      const wrapper = mount(
        {
          template: "<div>Test Component</div>",
          mounted() {
            this.$mixpanel.identify("user-123");
            this.$mixpanel.people.set({
              $email: "test@example.com",
              $name: "Test User",
            });
          },
        },
        { localVue }
      );

      expect(mixpanel.identify).toHaveBeenCalledWith("user-123");
      expect(mixpanel.people.set).toHaveBeenCalledWith({
        $email: "test@example.com",
        $name: "Test User",
      });
    });
  });
});
