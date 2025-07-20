// Basic test setup for nuxt-mixpanel
// This is an example of how you might test Mixpanel integration

const { createLocalVue, mount } = require("@vue/test-utils");
const VueMixpanel = require("../src/vue-mixpanel.js");

describe("Mixpanel Integration", () => {
  let localVue;
  let mockMixpanel;

  beforeEach(() => {
    localVue = createLocalVue();

    // Mock mixpanel-browser
    mockMixpanel = {
      init: jest.fn(),
      track: jest.fn(),
      identify: jest.fn(),
      people: {
        set: jest.fn(),
        track_charge: jest.fn(),
      },
    };

    // Mock the mixpanel-browser module
    jest.mock("mixpanel-browser", () => mockMixpanel);
  });

  test("should initialize Mixpanel with correct options", () => {
    const options = {
      token: "test-token",
      config: { debug: true },
    };

    localVue.use(VueMixpanel.default, options);

    expect(mockMixpanel.init).toHaveBeenCalledWith("test-token", expect.objectContaining({ debug: true }), null);
  });

  test("should track events correctly", () => {
    localVue.use(VueMixpanel.default, { token: "test-token" });

    const wrapper = mount(
      {
        template: "<div></div>",
        mounted() {
          this.$mixpanel.track("Test Event", { prop: "value" });
        },
      },
      { localVue }
    );

    expect(mockMixpanel.track).toHaveBeenCalledWith("Test Event", {
      prop: "value",
    });
  });

  test("should identify users correctly", () => {
    localVue.use(VueMixpanel.default, { token: "test-token" });

    const wrapper = mount(
      {
        template: "<div></div>",
        mounted() {
          this.$mixpanel.identify("user-123");
        },
      },
      { localVue }
    );

    expect(mockMixpanel.identify).toHaveBeenCalledWith("user-123");
  });
});

// Export for use in other test files
module.exports = {
  mockMixpanel,
  createMixpanelMock: () => mockMixpanel,
};
