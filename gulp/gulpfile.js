import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/',
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/',
  },
};

export function html() {
  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());
}

export function styles() {
  return gulp
    .src('src/scss/index.scss')

    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))

    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      })
    )

    .pipe(gulp.dest(paths.styles.dest))

    .pipe(cleanCSS({ compatibility: 'ie8' }))

    .pipe(rename({ suffix: '.min' }))

    .pipe(gulp.dest(paths.styles.dest))

    .pipe(bs.stream());
}
export function server() {
  bs.init({
    server: {
      baseDir: './dist',
    },
    port: 3000,
    notify: false,
  });
}

export function watch() {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
}
export default gulp.series(
  gulp.parallel(html, styles),
  gulp.parallel(server, watch)
);
