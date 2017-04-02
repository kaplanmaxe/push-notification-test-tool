const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('transpile-module', () => {
  return gulp.src(['./src/index.js', './src/Push.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('babel-module', () => {
  return gulp.watch(['./src/index.js', './src/Push.js'], ['transpile-module']);
});

gulp.task('default', [
  'transpile-module',
  'babel-module'
]);
