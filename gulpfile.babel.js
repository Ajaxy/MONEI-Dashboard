import gulp from 'gulp';
import awspublish from 'gulp-awspublish';
import awspublishRouter from 'gulp-awspublish-router';
import config from './config';
import _debug from 'debug';

const debug = _debug('app:gulp:config');

const routerConfig = {
  routes: {
    'index.html': {
      cacheTime: 60,
      gzip: true
    },
    '.*': {
      cacheTime: 630720000,
      gzip: true
    }
  }
};

gulp.task('default', () => {
  debug(`Deploying to ${config.stage.toUpperCase()} stage`);
  const publisher = awspublish.create(config.S3);
  gulp.src('dist/**/*.*')
    .pipe(awspublishRouter(routerConfig))
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
