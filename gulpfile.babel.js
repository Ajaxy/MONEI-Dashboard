import gulp from 'gulp';
import gulpif from 'gulp-if';
import awspublish from 'gulp-awspublish';
import awspublishRouter from  'gulp-awspublish-router';
import invalidateCloudfront from 'gulp-invalidate-cloudfront';
import config from './config';
import _debug from 'debug';

const debug = _debug('app:gulp:config');

const routerConfig = {
  cache: {
    cacheTime: 315360000
  },
  routes: {
    'index.html': {
      cacheTime: 300,
    }
  }
};

const invalidationBatch = {
  CallerReference: new Date().toString(),
  Paths: {
    Quantity: 1,
    Items: ['/index.html']
  }
};

gulp.task('default', () => {
  debug(`Deploying to ${config.stage.toUpperCase()} stage`);
  const publisher = awspublish.create(config.S3);
  gulp.src('dist/**/*.*')
    .pipe(awspublish.gzip())
    .pipe(awspublishRouter(routerConfig))
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(gulpif(
      config.stage === 'production',
      invalidateCloudfront(invalidationBatch, config.cloudfront)
    ));
});
