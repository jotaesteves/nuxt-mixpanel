#!/usr/bin/env node

// Simple test runner to verify core functionality without Jest complexity
console.log("🧪 Running basic unit tests...\n");

// Test 1: Vue plugin structure
console.log("Test 1: Vue plugin structure");
try {
  const VueMixpanel = require("./src/vue-mixpanel.js").default;

  if (VueMixpanel && typeof VueMixpanel.install === "function") {
    console.log("✅ VueMixpanel has install method");
  } else {
    console.log("❌ VueMixpanel missing install method");
  }
} catch (error) {
  console.log("❌ VueMixpanel import failed:", error.message);
}

// Test 2: Module structure
console.log("\nTest 2: Module structure");
try {
  const moduleFunction = require("./src/module.js");

  if (typeof moduleFunction === "function") {
    console.log("✅ Module exports a function");
  } else {
    console.log("❌ Module does not export a function");
  }

  if (moduleFunction.meta && moduleFunction.meta.name) {
    console.log("✅ Module has meta information");
  } else {
    console.log("❌ Module missing meta information");
  }
} catch (error) {
  console.log("❌ Module import failed:", error.message);
}

// Test 3: Plugin structure
console.log("\nTest 3: Plugin structure");
try {
  const fs = require("fs");
  const pluginContent = fs.readFileSync("./src/plugin.js", "utf8");

  const checks = [
    { name: "exports default function", test: pluginContent.includes("export default function") },
    { name: "imports Vue", test: pluginContent.includes("import Vue from 'vue'") },
    { name: "imports VueMixpanel", test: pluginContent.includes("import VueMixpanel from './vue-mixpanel.js'") },
    { name: "has router logic", test: pluginContent.includes("shouldUseRouter") },
    { name: "handles injection", test: pluginContent.includes("inject('mixpanel'") },
  ];

  checks.forEach((check) => {
    console.log(check.test ? `✅ Plugin ${check.name}` : `❌ Plugin missing ${check.name}`);
  });
} catch (error) {
  console.log("❌ Plugin check failed:", error.message);
}

// Test 4: Configuration robustness
console.log("\nTest 4: Configuration handling");
try {
  const VueMixpanel = require("./src/vue-mixpanel.js").default;

  // Mock Vue for testing
  const mockVue = {
    prototype: {},
  };

  // Mock mixpanel
  const mockMixpanel = {
    init: (token, config, name) => {
      console.log(`✅ Mixpanel.init called with token: ${token}, config:`, JSON.stringify(config), `name: ${name}`);
      return true;
    },
  };

  // Test with minimal options
  console.log("  Testing with minimal options...");
  try {
    // This should not throw the "Cannot read properties of undefined" error anymore
    VueMixpanel.install(mockVue, { token: "test-token" });
    console.log("✅ Minimal options handled correctly");
  } catch (error) {
    console.log("❌ Minimal options failed:", error.message);
  }

  // Test with full options
  console.log("  Testing with full options...");
  try {
    VueMixpanel.install(mockVue, {
      token: "test-token",
      config: { debug: true },
      name: "custom-name",
    });
    console.log("✅ Full options handled correctly");
  } catch (error) {
    console.log("❌ Full options failed:", error.message);
  }
} catch (error) {
  console.log("❌ Configuration test failed:", error.message);
}

console.log("\n🏁 Basic tests completed!");
