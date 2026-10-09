const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// metro-config restricts subpath exports; use the public "private/*" entry.
const exclusionListModule = require('metro-config/private/defaults/exclusionList');
const exclusionList = exclusionListModule.default || exclusionListModule;

const config = getDefaultConfig(__dirname);

// Prevent Metro's file-map crawler / watcher from traversing huge,
// non-JS directories in the project root. Without this, FallbackWatcher
// on Windows (no Watchman) tries to crawl .venv/, .git/, android/build/,
// etc. and times out with: "Failed to construct transformer: Error:
// Failed to start watch mode."
config.resolver.blockList = exclusionList([
  // Python venv (894+ files) — must NOT be watched
  /.*\.venv\/.*/,
  /\.venv\/.*/,

  // Python cache / misc
  /.*\/__pycache__\/.*/,

  // Git internals
  /.*\.git\/.*/,

  // Native build outputs
  /.*\/android\/build\/.*/,
  /.*\/android\/app\/build\/.*/,
  /.*\/ios\/build\/.*/,
  /.*\/windows\/build\/.*/,

  // Expo / web build output
  /.*\/dist\/.*/,
  /.*\/web-build\/.*/,

  // Large local-only folders that should never be bundled
  /.*\/supabase\/\.branches\/.*/,
  /.*\/supabase\/\.temp\/.*/,
  /.*\/\.expo\/.*/,
  /.*\/node_modules\/.*\/android\/.*/,
  /.*\/node_modules\/.*\/ios\/.*/,
]);

// Increase watcher timeout for Windows fallback watcher
config.watchFolders = config.watchFolders || [];
config.maxWorkers = 2;

// Fix resolution for packages with problematic exports fields (Node 24+)
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@clerk/expo': path.join(__dirname, 'node_modules/@clerk/expo'),
  '@clerk/clerk-expo': path.join(__dirname, 'node_modules/@clerk/clerk-expo'),
  'whatwg-fetch': path.join(__dirname, 'node_modules/whatwg-fetch'),
  '@supabase/supabase-js': path.join(__dirname, 'node_modules/@supabase/supabase-js'),
  '@radix-ui/react-slot': path.join(__dirname, 'node_modules/@radix-ui/react-slot'),
  'whatwg-url-minimum': path.join(__dirname, 'node_modules/whatwg-url-minimum'),
};

module.exports = config;