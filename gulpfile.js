/**
* plugin
*/
const gulp = require('gulp');                // gulp v4
const plumber = require('gulp-plumber');     // 監視をストップしない
const notify = require('gulp-notify');       // エラー通知を表示
const sass = require('gulp-sass');           // Sassのコンパイル
const postcss = require("gulp-postcss");     // postCSS
const autoprefixer = require("autoprefixer");
const ejs = require('gulp-ejs');             // ejs
const rename = require('gulp-rename');       // ejsをhtmlnリネーム
const imagemin = require('gulp-imagemin');   // 画像ファイルの最適化
const browserSync = require("browser-sync"); // 自動リロード

/**
* path
*/
const SRC = "src/",
      PUBLIC = 'public',
      BASE_PATH = '/',
      DEST = PUBLIC + BASE_PATH;

/**
* task
*/

// sass
gulp.task('sass', function() {
  // scssファイルの更新があった場合の処理
  return (
    gulp
      // style.scssファイルを取得
      .src(SRC + 'scss/**/*.scss')
      .pipe(
        // 監視をストップしない
        plumber({
          // エラー通知を表示
          errorHandler: notify.onError("Error: <%= error.message %>")
        })
      )
      // Sassのコンパイルを実行
      .pipe(
        sass({
          // 出力時のコードを整形
          outputStyle: 'compressed'
        })
        // Sassのコンパイルエラーを表示
        // (これがないと自動的に止まってしまう)
        .on('error', sass.logError)
      )
      .pipe(
        postcss([
          autoprefixer({
            cascade: false
          })
        ])
      )
      // 保存
      .pipe(gulp.dest(DEST + 'assets/css/'))
      // 自動リロード
      .pipe(browserSync.stream())
    );
  //});
});


//ejs
gulp.task( 'ejs', function () {
  return (
    gulp
      .src(
        [SRC + "ejs/**/*.ejs", '!' + SRC + "ejs/**/_*.ejs"]
      )
      .pipe(
        // 監視をストップしない
        plumber({
          // エラー通知を表示
          errorHandler: notify.onError("Error: <%= error.message %>")
        })
      )
      .pipe(ejs())
      // ejsをhtmlにリネーム
      .pipe(rename({extname: '.html'}))
      // 保存
      .pipe(gulp.dest(PUBLIC))
      // 自動リロード
      .pipe(browserSync.stream())
  );
});


// 画像圧縮
gulp.task('imagemin', function() {
  return (
    gulp
      // 画像のマッチパターン
      .src(SRC + 'images/**/*')
      // 画像の最適化処理
      .pipe(imagemin())
      // 最適化済みの画像を書き出すディレクトリ
      .pipe(gulp.dest(DEST + 'assets/images/'))
  );
});


// lib
gulp.task('lib', function() {
  return (
    gulp
      // マッチパターン
      .src(SRC + 'lib/**/*')
      .pipe(gulp.dest(DEST + 'assets/lib/'))
  );
});


// js
gulp.task('js', function() {
  return (
    gulp
      // マッチパターン
      .src(SRC + 'js/*')
      .pipe(gulp.dest(DEST + 'assets/js/'))
  );
});



// BrowserSyncの設定
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      proxy: "localhost:3000",
      baseDir: PUBLIC,
    },
    // BrowserSyncの通知を無効化
    notify: false
  });
});


/**
* watch
*/
gulp.task('watch', function () {
  // ejsファイルの更新を監視
  gulp.watch(SRC + 'ejs/**/*.ejs', gulp.parallel('ejs'));
  // scssファイルの更新を監視
  gulp.watch(SRC + 'scss/**/*.scss', gulp.parallel('sass'));
  // 画像ファイルの更新を監視
  gulp.watch(SRC + 'images/**/*', gulp.parallel('imagemin'));
  // libディレクトリの更新を監視
  gulp.watch(SRC + 'lib/**/*', gulp.parallel('lib'));
  // jsディレクトリの更新を監視
  gulp.watch(SRC + 'js/*', gulp.parallel('js'));
});


/**
* default
*/
gulp.task('default',
  gulp.parallel(
    'sass',
    'ejs',
    'js',
    'imagemin',
    'lib',
    'browser-sync',
    'watch'
  )
);
