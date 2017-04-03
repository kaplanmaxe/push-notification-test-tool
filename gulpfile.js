const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');

gulp.task('build', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  return gulp.watch(['./src/**/*.js'], ['lint', 'build']);
});

gulp.task('default', [
  'lint',
  'build',
  'watch'
]);
