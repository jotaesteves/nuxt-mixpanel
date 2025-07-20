// Jest setup file

// Mock console methods to reduce test noise
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock mixpanel-browser globally
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

// Mock consola
jest.mock("consola", () => ({
  withScope: jest.fn(() => ({
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  })),
}));

// Global test utilities
global.testUtils = {
  createMockRouter: () => ({
    afterEach: jest.fn(),
  }),
  createMockContext: (overrides = {}) => ({
    app: {
      router: global.testUtils.createMockRouter(),
    },
    store: null,
    $config: {},
    ...overrides,
  }),
};
