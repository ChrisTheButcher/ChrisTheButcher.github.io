const gulp = require('gulp')
const webpack = require('gulp-webpack')
const sass = require('gulp-sass')
const sync = require('browser-sync')
const webpackConfig = {
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader?presets[]=es2015']
            }
        ]
    },
    output: { filename: 'app.js' }
}

gulp.task('scripts', [], ()=> gulp.src('src/js/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js')))

gulp.task('styles', ()=> gulp.src('src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))    
    .pipe(gulp.dest('dist/css')))

gulp.task('images', ()=> gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img')))

gulp.task('fonts', ()=> gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts')))

gulp.task('serve', ['styles', 'images', 'fonts'], ()=> {
    gulp.start('scripts')
    gulp.watch(['src/scss/**/*.scss'], ['styles'])
    gulp.watch(['dist/js/app.js', '*.html'], ()=> sync.reload())
    gulp.watch(['dist/css/app.css'], ()=> sync.reload('dist/css/app.css'))
    sync.init({
        server: { baseDir: "./" },
        port: 8080,
        open: false
    })
})

gulp.task('default', ['serve'])