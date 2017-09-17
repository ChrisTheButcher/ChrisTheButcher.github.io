const gulp = require('gulp')
const webpack = require('gulp-webpack')
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer');
const sync = require('browser-sync');
const cp = require('child_process');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

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
    resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        }
      },
    output: { filename: 'app.js' }
}

gulp.task('scripts', [], ()=> gulp.src('_src/js/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('assets/js')))

gulp.task('styles', ()=> gulp.src('_src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))    
    .pipe(prefix(['last 2 versions'], { cascade: true }))    
    .pipe(gulp.dest('assets/css')))

gulp.task('serve', ['styles', 'jekyll:build'], ()=> {
    gulp.start(['scripts'])

    sync.init({
        server: { baseDir: "_site" },
        port: 8080,
        open: false
    })
})




gulp.task('jekyll:build', done => {
    sync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll:rebuild', ['jekyll:build'], ()=> sync.reload());


gulp.task('watch', ['serve'], ()=> {
    gulp.watch('_src/scss/**/*.scss', ['styles']);
    gulp.watch(['*.html', '_layouts/*', '_includes/*', '_posts/*', '_pages/*', '_drafts/*', 'assets/**/*'], ['jekyll:rebuild']);
});

gulp.task('default', ['watch'])





