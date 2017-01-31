const babel = require('gulp-babel');
const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpUtil = require('gulp-util');
const connect = require('connect');
const http = require('http');
const concat = require('gulp-concat');
const del = require('del');
const templateCache = require('gulp-angular-templatecache');

const jsDestination = 'blocks-editor-demo/js';
const cssDestination = 'blocks-editor-demo/css';
const fontDestination = 'blocks-editor-demo/fonts';

// build javascript files
gulp.task('js', ['libs', 'angular-templates', 'app'], function() {
  return gulp.src([
    jsDestination + '/libs.js',
    jsDestination + '/templates.js',
    jsDestination + '/app.js'
  ]).pipe(concat('all.min.js')).pipe(gulp.dest(jsDestination));
});

// delete cruft
gulp.task('clean', ['js'], function(){
  return del([
    jsDestination + '/libs.js',
    jsDestination + '/templates.js',
    jsDestination + '/app.js'
  ]);
});

// concat libs
gulp.task('libs', function(){
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/lodash/lodash.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-messages/angular-messages.js',
    'node_modules/restangular/dist/restangular.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/angular-debounce/angular-debounce.js',
    'node_modules/angular-ui-mask/dist/mask.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/angulartics/dist/angulartics.min.js',
    'node_modules/medium-editor/dist/js/medium-editor.min.js',
    'node_modules/file-saver/FileSaver.js',
    'node_modules/angular-local-storage/dist/angular-local-storage.min.js'
  ]).pipe(concat('libs.js')).pipe(gulp.dest(jsDestination));
});

// create angular templates
gulp.task('angular-templates', function(){
  return gulp.src('src/partials/**/*.html')
  .pipe(templateCache({
    root: '/partials/',
    standalone: true
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest(jsDestination));
});

// get angular app
gulp.task('app', function(){
  return gulp.src([
    'src/js/**/*.js'
  ]).pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('app.js'))
  .pipe(gulp.dest(jsDestination));
});

// build fonts
gulp.task('fonts', function () {
  return gulp.src([
    'src/fonts/**/*.ttf'
  ])
  .pipe(gulp.dest(fontDestination));
});

// build styles
gulp.task('css', function () {
  return gulp.src([
    'node_modules/medium-editor/dist/css/medium-editor.css',
    'node_modules/medium-editor/dist/css/themes/beagle.css',
    'src/css/**/*.css'
  ])
    .pipe(sass.sync()
      .on('error', sass.logError)
      .on('error', function () {
        gulpUtil.beep();
      })
    )
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(cssDestination));
});

// serve app
gulp.task('serve', function () {
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('./blocks-editor-demo'));

  http.createServer(app).listen(4001);
});

gulp.task('default', ['build', 'serve'],
  function () {
    gulp.watch(['src/css/**/*'], ['css']);
    gulp.watch(['src/partials/**/*'], ['js']);
    gulp.watch(['src/js/**/*'], ['js']);
  });

gulp.task('build', ['js', 'clean', 'css', 'fonts'], function () {
  return gulp.src([
    ''
  ]);
});
