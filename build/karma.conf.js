import {argv} from 'yargs';
import config from '../config';
import webpackConfig from './webpack.config';
import _debug from 'debug';
const paths = config.utils_paths;

const debug = _debug('app:karma');
debug('Create configuration.');

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.js',
    {
      pattern: `./${config.dir_test}/testBundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/testBundler.js`]: ['webpack']
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true,
    stats: 'errors-only'
  },
  coverageReporter: {
    reporters: config.coverage_reporters,
    check: {
      global: {
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50,
        excludes: config.coverage_exclude
      }
    }
  }
};

if (config.globals.__COVERAGE__) {
  karmaConfig.reporters.push('coverage');
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
