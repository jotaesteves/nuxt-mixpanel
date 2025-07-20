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

describe("Integration Tests", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    jest.clearAllMocks();

    // Reset mixpanel.init to default mock implementation
    mixpanel.init.mockImplementation(() => {});
  });

  describe("Complete Workflow", () => {
    test("should track user journey from registration to purchase", async () => {
      // Install plugin
      localVue.use(VueMixpanel, {
        token: "test-token",
        config: { debug: true },
      });

      // Create a mock e-commerce component
      const ECommerceApp = {
        template: `
          <div>
            <button @click="register" data-test="register">Register</button>
            <button @click="login" data-test="login">Login</button>
            <button @click="addToCart" data-test="add-cart">Add to Cart</button>
            <button @click="purchase" data-test="purchase">Purchase</button>
          </div>
        `,
        data() {
          return {
            user: null,
            cart: [],
          };
        },
        methods: {
          register() {
            this.user = { id: "user-123", email: "test@example.com" };

            // Track registration
            this.$mixpanel.track("User Registered", {
              method: "email",
              timestamp: new Date().toISOString(),
            });

            // Identify user
            this.$mixpanel.identify(this.user.id);
            this.$mixpanel.people.set({
              $email: this.user.email,
              $created: new Date().toISOString(),
            });
          },

          login() {
            this.$mixpanel.track("User Login", {
              method: "email",
            });
          },

          addToCart() {
            const item = { id: "product-123", name: "Test Product", price: 29.99 };
            this.cart.push(item);

            this.$mixpanel.track("Product Added to Cart", {
              product_id: item.id,
              product_name: item.name,
              price: item.price,
              cart_size: this.cart.length,
            });
          },

          purchase() {
            const total = this.cart.reduce((sum, item) => sum + item.price, 0);

            this.$mixpanel.track("Purchase Completed", {
              total_amount: total,
              item_count: this.cart.length,
              currency: "USD",
            });

            // Track revenue
            this.$mixpanel.people.track_charge(total, {
              currency: "USD",
            });
          },
        },
      };

      const wrapper = mount(ECommerceApp, { localVue });

      // Simulate user journey
      await wrapper.find('[data-test="register"]').trigger("click");
      await wrapper.find('[data-test="login"]').trigger("click");
      await wrapper.find('[data-test="add-cart"]').trigger("click");
      await wrapper.find('[data-test="purchase"]').trigger("click");

      // Verify tracking calls
      expect(mixpanel.track).toHaveBeenCalledWith("User Registered", {
        method: "email",
        timestamp: expect.any(String),
      });

      expect(mixpanel.identify).toHaveBeenCalledWith("user-123");

      expect(mixpanel.people.set).toHaveBeenCalledWith({
        $email: "test@example.com",
        $created: expect.any(String),
      });

      expect(mixpanel.track).toHaveBeenCalledWith("User Login", {
        method: "email",
      });

      expect(mixpanel.track).toHaveBeenCalledWith("Product Added to Cart", {
        product_id: "product-123",
        product_name: "Test Product",
        price: 29.99,
        cart_size: 1,
      });

      expect(mixpanel.track).toHaveBeenCalledWith("Purchase Completed", {
        total_amount: 29.99,
        item_count: 1,
        currency: "USD",
      });

      expect(mixpanel.people.track_charge).toHaveBeenCalledWith(29.99, {
        currency: "USD",
      });
    });

    test("should handle SPA routing correctly", () => {
      const mockRouter = {
        afterEach: jest.fn(),
      };

      localVue.use(VueMixpanel, {
        token: "test-token",
        router: mockRouter,
      });

      // Get the router callback
      const routeCallback = mockRouter.afterEach.mock.calls[0][0];

      // Simulate multiple route changes
      const routes = [
        { fullPath: "/home" },
        { fullPath: "/products" },
        { fullPath: "/products/123" },
        { fullPath: "/cart" },
        { fullPath: "/checkout" },
      ];

      routes.forEach((route) => {
        routeCallback(route);
      });

      // Verify page view tracking
      expect(mixpanel.track).toHaveBeenCalledTimes(routes.length);

      routes.forEach((route) => {
        expect(mixpanel.track).toHaveBeenCalledWith("Page Viewed", {
          url: route.fullPath,
        });
      });
    });

    test("should work without router", () => {
      localVue.use(VueMixpanel, {
        token: "test-token",
        // No router provided
      });

      mount(
        {
          template: "<div>Test</div>",
          mounted() {
            this.$mixpanel.track("Component Mounted");
          },
        },
        { localVue }
      );

      expect(mixpanel.track).toHaveBeenCalledWith("Component Mounted");
    });
  });

  describe("Error Handling", () => {
    test("should handle mixpanel initialization errors gracefully", () => {
      mixpanel.init.mockImplementation(() => {
        throw new Error("Mixpanel init failed");
      });

      expect(() => {
        localVue.use(VueMixpanel, {
          token: "test-token",
        });
      }).not.toThrow();

      // Reset the mock for subsequent tests
      mixpanel.init.mockImplementation(() => {});
    });

    test("should handle tracking errors gracefully", () => {
      const freshLocalVue = createLocalVue();

      freshLocalVue.use(VueMixpanel, {
        token: "test-token",
      });

      mixpanel.track.mockImplementation(() => {
        throw new Error("Tracking failed");
      });

      const wrapper = mount(
        {
          template: '<button @click="track">Track</button>',
          methods: {
            track() {
              try {
                this.$mixpanel.track("Test Event");
              } catch (error) {
                // Should handle error gracefully
              }
            },
          },
        },
        { localVue: freshLocalVue }
      );

      expect(() => {
        wrapper.find("button").trigger("click");
      }).not.toThrow();

      // Reset the mock for subsequent tests
      mixpanel.track.mockImplementation(() => {});
    });
  });

  describe("Configuration Variations", () => {
    test("should work with minimal configuration", () => {
      localVue.use(VueMixpanel, {
        token: "test-token",
      });

      expect(mixpanel.init).toHaveBeenCalledWith("test-token", expect.any(Object), null);
    });

    test("should work with full configuration", () => {
      const fullConfig = {
        token: "test-token",
        config: {
          debug: true,
          track_pageview: false,
          persistence: "localStorage",
          api_host: "api-eu.mixpanel.com",
        },
        name: "custom-instance",
        router: { afterEach: jest.fn() },
      };

      localVue.use(VueMixpanel, fullConfig);

      expect(mixpanel.init).toHaveBeenCalledWith(
        "test-token",
        expect.objectContaining({
          debug: true,
          track_pageview: false,
          persistence: "localStorage",
          api_host: "api-eu.mixpanel.com",
        }),
        "custom-instance"
      );
    });
  });
});
