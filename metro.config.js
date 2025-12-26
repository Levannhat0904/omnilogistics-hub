// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add resolver to handle nativewind/jsx-dev-runtime if not installed
// Path aliases are handled by babel-plugin-module-resolver in babel.config.js
const defaultResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Ignore nativewind/jsx-dev-runtime if not installed
  if (moduleName === 'nativewind/jsx-dev-runtime') {
    return {
      type: 'empty',
    };
  }
  
  // Use default resolver for other modules
  if (defaultResolver) {
    return defaultResolver(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

