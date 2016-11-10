/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path';
import _debug from 'debug';
import {argv} from 'yargs';
import ip from 'ip';
import dotenv from 'dotenv';
const pkg = require('../package.json');

const localip = ip.address();
const debug = _debug('app:config');

debug('Loading .env config.');
dotenv.config();

debug('Creating default configuration.');

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',
  stage: process.env.STAGE || 'development',
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: localip, // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules: true,
  compiler_devtool: 'eval',
  compiler_devtool_filename_tempalte: '/[resource-path]',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: [
    'babel-polyfill',
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'moment',
    'redux-form',
    'redux-thunk',
    'reselect',
    'scroll-behavior',
    'store',
    'validatorjs',
    'auth0-lock',
    'axios',
    'classnames',
    'react-codemirror',
    'codemirror',
    'react-dropzone',
    'aws-sdk',
    'papaparse',
    'humanize-string',
    'react-frame-component',
    'pluralize',
    'codemirror',
    'moment',
    'react-router-redux-params',
    'loadjs',
    'aws-mqtt-client',
    'react-input-mask',
    'card-validator',
    'liquid.js',
    'browser-filesaver',
    'html2canvas'
  ],

  aws_services: [
    's3'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    {type: 'text-summary'},
    {type: 'lcov', dir: 'coverage'}
  ],
  coverage_exclude: []
};

/************************************************
 -------------------------------------------------

 All Internal Configuration Below
 Edit at Your Own Risk

 -------------------------------------------------
 ************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc

config.globals = {
  'process.env': {
    NODE_ENV: config.env
  },
  NODE_ENV: config.env,
  __STAGE__: config.stage,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __DEBUG__: config.env === 'development' && !argv.no_debug,
  __COVERAGE__: !argv.watch && config.env === 'test',
  __BASENAME__: process.env.BASENAME || '',
  __VERSION__: pkg.version,
  APP_CONFIG: {
    auth0: {
      baseURL: 'https://monei.auth0.com/api/v2/',
      clientID: 'G4f0Hdd0KjxeMmxh978kb7UcLjjJpffn',
      clientDomain: 'monei.auth0.com'
    }
  }
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    );
  });

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve;
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args]);

config.utils_paths = {
  base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments').default;
const envOverrides = environments[config.env];
if (envOverrides) {
  debug('Found environment overrides, applying to default configuration.');
  Object.assign(config, envOverrides(config));
} else {
  debug('No environment overrides found, defaults will be used.');
}

// ========================================================
// Stages Configuration
// ========================================================
debug(`Looking for stage overrides for STAGE "${config.stage}".`);
const stages = require('./stages').default;
const stageOverrides = stages[config.stage];
if (stageOverrides) {
  debug('Found stage overrides, applying to default configuration.');
  Object.assign(config, stageOverrides(config));
} else {
  debug('No stage overrides found, defaults will be used.');
}

export default config;
