const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('build', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', () => {
  return gulp.src(['./src/**/*.js']).pipe(eslint()).pipe(eslint.format());
});

gulp.task('watch', () => {
  return gulp.watch(['./src/**/*.js'], ['lint', 'build']);
});

gulp.task('default', [
  'lint',
  'build',
  'watch'
]);
