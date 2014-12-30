var base, on_error, options, rand, rand_name;

var dev = false;
var root_dev = 'www';
var root_prod = 'dist';

var runSequence = require('run-sequence'),
    mainBowerFiles = require('main-bower-files'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    scss = require('gulp-sass'),
    bourbon = require('node-bourbon'),
    uglify = require('gulp-uglify'),
    fileInclude = require('gulp-file-include'),
    inject = require('gulp-inject'),
    injectString = require('gulp-inject-string');

var root = function() {
  if (dev) {
    return root_dev;
  } else {
    return root_prod;
  }
};

base = function(paths) {
  if (paths == null) {
    paths = '';
  }
  if (Array.isArray(paths)) {
    return paths.map(function(path) {
      if(path[0] != '!') {
        return "./" + (root()) + "/" + path;
      }
      else {
        return "!./" + (root()) + "/" + path.substring(1);
      }
    });
  } else {
    return "./" + (root()) + "/" + paths;
  }
};

var paths = {
  root: ['./app/*.*'],
  fonts: ['./app/fonts/**/*.*'],
  scss: ['./app/styles/**/*.scss'],
  scripts: ['./app/scripts/**/*.js'],
  views: ['./app/*.html'],
  views_all: ['./app/views/**/*.html'],
  images: ['./app/images/**/*.*'],
  inject_js: [ 'scripts/vendors.*.js', 'scripts/**/*.js', '!scripts/jquery.fullPage.js'],
  inject_css: ['components/**/*.css', 'styles/styles*.css']
};


options = function() {
  return {
    scss: {
      errLogToConsole: true,
      imagePath: '../images',
      outputStyle: dev ? 'expanded' : 'compressed'
    },
    server: {
      port: 9001,
      host: 'localhost',
      root: root_dev,
      livereload: true
    },
    inject: {
      ignorePath: root(),
      relative: false
    },
    mainBowerFiles: {
      base: 'bower_components'
    }
  };
};

on_error = function(error) {
  gutil.beep();
  return gutil.log(error);
};

rand = function() {
  return Math.random().toString(36).substr(2, 7);
};

rand_name = function(name) {
  var ext;
  name = name.split('.');
  ext = name.pop();
  name.push(rand());
  name.push(ext);
  name = name.join('.');
  return name;
};

gulp.task('dev', function() {
  return dev = true;
});

gulp.task('clean', function() {
  return gulp.src(base(), {
    read: false
  }).pipe(clean({
    force: true
  }));
});

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), options().mainBowerFiles).pipe(gulp.dest(base('components'))).on('error', on_error);
});

gulp.task('root', function(done) {
  return gulp.src('./app/*.*').pipe(gulp.dest(base())).pipe(connect.reload());
});

gulp.task('scss', function(done) {
  gulp.src(paths.scss).pipe(scss(options().scss)).pipe(rename(function(path) {
    if (path.basename === 'styles' && !dev) {
      path.basename += "." + (rand());
    }
    return console.log(path.basename);
  })).pipe(gulp.dest(base('styles'))).pipe(connect.reload()).on('end', done);
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts).pipe(dev ? gutil.noop() : concat(rand_name('app.js', {
    newLine: ';'
  }))).pipe(dev ? gutil.noop() : uglify()).pipe(gulp.dest(base('scripts'))).pipe(connect.reload());
});

gulp.task('vendors', function() {
  return gulp.src(base('components/**/*.js')).pipe(concat(rand_name('vendors.js', {
    newLine: ';'
  }))).pipe(uglify()).pipe(gulp.dest(base('scripts')));
});

gulp.task('clean-vendors', function() {
  return gulp.src(base('components/**/*.js', {
    read: false
  })).pipe(clean());
});

gulp.task('images', function() {
  return gulp.src(paths.images).pipe(gulp.dest(base('images'))).pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts).pipe(gulp.dest(base('fonts'))).pipe(connect.reload());
});

gulp.task('views', function() {
  return gulp.src(paths.views).pipe(fileInclude({
    prefix: '@@',
    basepath: '@file'
  })).pipe(injectString.before('</head>', '    <!-- inject:css -->\n    <!-- endinject -->\n')).pipe(injectString.before('</body>', '    <!-- inject:js -->\n    <!-- endinject -->\n'))
      .pipe(inject(gulp.src(base(paths.inject_css), {
    read: false
  }), options().inject)).pipe(inject(gulp.src(base(paths.inject_js), {
    read: false
  }), options().inject)).pipe(gulp.dest(base())).pipe(connect.reload());
});

gulp.task('build', function(callback) {
  return runSequence('clean', 'bower', ['root', 'scss', 'scripts', 'vendors', 'images', 'fonts'], 'views', callback);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.root, ['root']);
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.views_all, ['views']);
  gulp.watch(paths.images, ['images']);
  return gulp.watch(paths.fonts, ['fonts']);
});

gulp.task('server', function() {
  var opts;
  opts = options().server;
  connect.server(opts);
  return gulp.src("./" + root_dev + "/index.html").pipe(open("", {
    url: "http://" + opts.host + ":" + opts.port
  }));
});

gulp.task('default', function(callback) {
  return runSequence('build', 'clean-vendors', callback);
});

gulp.task('serve', function(callback) {
  return runSequence('dev', 'watch', 'server', callback);
});

