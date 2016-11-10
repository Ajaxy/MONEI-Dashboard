import gulp from 'gulp';
import gulpif from 'gulp-if';
import awspublish from 'gulp-awspublish';
import invalidateCloudfront from 'gulp-invalidate-cloudfront';
import config from './config';
import _debug from 'debug';

const debug = _debug('app:gulp:config');

const headers = {
  'Cache-Control': 'max-age=315360000, no-transform, public'
};

const invalidationBatch = {
  CallerReference: new Date().toString(),
  Paths: {
    Quantity: 1,
    Items: ['/*']
  }
};

gulp.task('default', () => {
  debug(`Deploying to ${config.stage.toUpperCase()} stage`);
  const publisher = awspublish.create(config.S3);
  gulp.src('dist/**/*.*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(gulpif(
      config.stage === 'production',
      invalidateCloudfront(invalidationBatch, config.cloudfront)
    ));
});
