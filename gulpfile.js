'use strict';

const gulp = require('gulp');
const glob = require('glob');
const del = require('del');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssNthChildFix = require('postcss-nth-child-fix');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const cssDeclarationSorter = require('css-declaration-sorter');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminZopfli = require('imagemin-zopfli');
const imageminPngquant = require('imagemin-pngquant');
const webp = require('gulp-webp');
const sassLint = require('gulp-sass-lint');
const php2html = require('gulp-php2html');
const prettify = require('gulp-html-prettify');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const svgSprite = require('gulp-svg-sprite');


const config = {
    scss: {
        input: './app/scss/main.scss',
        output: './dist/css',
        watch: './app/scss/**/*.scss',
        options: {
            precision: 5,
            sourceComments: true,
            outputStyle: 'nested'
        },
        linter: {
            input: [
                './app/scss/**/*.scss',
                '!./app/scss/lib/**/*.scss'
            ],
            config: {
                options: {
                    'merge-default-rules': false
                },
                rules: {
                    "attribute-quotes": [1, {"include": true}],
                    "border-zero": [1, {"convention": 'none'}],
                    "class-name-format": [2, {"convention": 'hyphenatedbem', "allow-leading-underscore": true}],
                    "clean-import-paths": [1, {"leading-underscore": false, "filename-extension": false}],
                    "declarations-before-nesting": 2,
                    "empty-line-between-blocks": [1, {"include": true, "allow-single-line-rulesets": false}],
                    "force-attribute-nesting": 1,
                    "force-element-nesting": 1,
                    "function-name-format": [1, {
                        "convention": 'hyphenatedlowercase',
                        "allow-leading-underscore": false
                    }],
                    "indentation": [1, {"size": 4}],
                    "leading-zero": [1, {"include": true}],
                    "mixin-name-format": [1, {"convention": 'hyphenatedlowercase', "allow-leading-underscore": false}],
                    "no-color-keywords": 1,
                    "no-debug": 1,
                    "no-duplicate-properties": 1,
                    "no-empty-rulesets": 1,
                    "no-ids": 1,
                    "no-invalid-hex": 1,
                    "no-mergeable-selectors": 1,
                    "no-misspelled-properties": 1,
                    "no-transition-all": 1,
                    "one-declaration-per-line": 1,
                    "placeholder-in-extend": 1,
                    "single-line-per-selector": 1,
                    "space-after-colon": [1, {"include": true}],
                    "space-after-comma": [1, {"include": true}],
                    "space-around-operator": [1, {"include": true}],
                    "space-before-bang": [1, {"include": true}],
                    "space-before-brace": [1, {"include": true}],
                    "space-before-colon": [1, {"include": false}],
                    "url-quotes": 1,
                    "variable-name-format": [1, {
                        "convention": 'hyphenatedlowercase',
                        "allow-leading-underscore": false
                    }],
                    "zero-unit": [1, {"include": false}]
                }
            }
        }
    },
    js: {
        input: [
            './app/js/lib/countUp.js',
            './app/js/categories.js',
            './app/js/find-sections.js',
            './app/js/menu.js',
            './app/js/product-add.js',
            './app/js/search.js',
            './app/js/tabs.js',
            './app/js/cart.js',
            './app/js/main.js'
        ],
        output: './dist/js',
        outputName: 'all.js',
        outputNameMinified: 'all.min.js',
        eslint: {
            input: [
                './app/js/*.js',
                './app/js/**/*.js',
                '!./app/js/lib/**/*.js'
            ]
        }
    },
    cssnano: {
        cssDeclarationSorter: {
            order: 'concentric-css'
        },
        discardComments: {
            removeAll: true
        }
    },
    images: {
        input: './app/images/**/*.{png,jpg,gif,jpeg}',
        inputWebp: './app/images/**/*.png',
        output: './dist/images/',
        faviconFiles: [
            'app/images/favicons/browserconfig.xml',
            'app/images/favicons/favicon.ico',
            'app/images/favicons/manifest.json',
            'app/images/favicons/safari-pinned-tab.svg'
        ],
        faviconFilesOutput: './dist/images/favicons/',
        pluginsConfig: [
            // jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            // // jpg lossy
            // imageminMozjpeg({
            //     quality: 80,
            //     progressive: true
            // }),
            // png lossless
            imagemin.optipng({
                optimizationLevel: 5
            }),
            // png lossless - but very slow sometimes
            // imageminZopfli({
            //     more: false
            // })
            // png lossy, very good quality
            // imageminPngquant({
            //     speed: 1,
            //     quality: 98,
            //     strip: true
            // })
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            imagemin.gifsicle({
                interlaced: true
            })
        ]
    },
    fonts: {
        input: './app/fonts/**/*.{woff,woff2,otf,eot,ttf,svg}',
        output: './dist/fonts'
    },
    movies: {
        input: './app/movies/**/*.{mp4,avi,webm}',
        output: './dist/movies/'
    },
    html: {
        input: './app/index*.php',
        watch: [
            './app/*.php',
            './app/**/*.php'
        ],
        output: './dist/',
        outputFiles: './dist/index*.html',
        prettify: {
            indent_char: ' ',
            indent_size: 4
        }
    }
};

/*
    HTML
 */

gulp.task('html-build', ['html-clean'], () => {
    return gulp.src(config.html.input)
        .pipe(php2html())
        .pipe(prettify(config.html.prettify))
        .pipe(gulp.dest(config.html.output));
});

gulp.task('html-clean', () => {
    return del('./dist/*.html');
});

/*
    SCSS
*/

gulp.task('scss-lint', () => {
    return gulp.src(config.scss.linter.input)
        .pipe(sassLint(config.scss.linter.config))
        .pipe(sassLint.format());

});

gulp.task('css-compile', ['scss-lint'], () => {
    return gulp.src(config.scss.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            postcssFlexbugsFixes,
            postcssNthChildFix,
            cssDeclarationSorter(config.cssnano.cssDeclarationSorter)
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.scss.output));
});

gulp.task('css-build', ['css-compile'], () => {
    return gulp.src(config.scss.output + '/main.css')
        .pipe(cssnano(config.cssnano))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(config.scss.output));
});


/*
    JS
 */

gulp.task('js-lint', () => {
    return gulp.src(config.js.eslint.input)
        .pipe(eslint({config: './eslintrc.json'}))
        .pipe(eslint.format());
});

gulp.task('js-build', ['js-lint'], () => {
    return gulp.src(config.js.input)
        .pipe(sourcemaps.init())
        .pipe(concat(config.js.outputName))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.js.output));
});

gulp.task('js-minify', ['js-build'], function(){
    return gulp.src(config.js.output + '/' + config.js.outputName)
        .pipe(uglify().on('error', function(e){
            console.log(e.message);
        }))
        .pipe(concat(config.js.outputNameMinified))
        .pipe(gulp.dest(config.js.output))
});

/*
    Images
*/

gulp.task('images-clean', () => {
    return del(config.images.output);
});

gulp.task('images-minify', () => {
    return gulp.src(config.images.input)
        .pipe(newer(config.images.output))
        .pipe(imagemin(config.images.pluginsConfig, {
            verbose: true
        }))
        .pipe(gulp.dest(config.images.output));
});

gulp.task('images-webp', () => {
    return gulp.src(config.images.inputWebp)
        .pipe(webp({
            lossless: true
        }))
        .pipe(gulp.dest(config.images.output));
});

gulp.task('favicon-files', () => {
    return gulp.src(config.images.faviconFiles)
        .pipe(newer(config.images.faviconFilesOutput))
        .pipe(gulp.dest(config.images.faviconFilesOutput));
});

gulp.task('svg-sprites', ()=> {
    glob('./app/images/svg/sprite-*', null, function (er, dirs) {
        if (er) {
            console.log(er);
            return;
        }
        dirs.forEach(function (dir) {
            const spriteName = dir
                .split('/')
                .pop()
                .replace('sprite-', '');
            gulp.src(dir + '/**/*.svg')
                .pipe(svgSprite(makeSvgSpriteOptions(spriteName)))
                .pipe(gulp.dest(config.images.output + '/svg'))
        });
    });
});

function makeSvgSpriteOptions(name) {
    return {
        mode: {
            symbol: {
                dest: '.',
                sprite: name + '.svg'
            }
        },
        shape: {
            id: {
                separator: '-'
            },
            transform: ['svgo']
        }
    }
}

/*
    Fonts
 */

gulp.task('font-files', () => {
    return gulp.src(config.fonts.input)
        .pipe(gulp.dest(config.fonts.output));
});

/*
    Movies
 */

gulp.task('movie-files', () => {
    return gulp.src(config.movies.input)
        .pipe(gulp.dest(config.movies.output));
});

/*
    Main tasks
*/

gulp.task('build', () => {
    runSequence(
        'images-clean',
        [
            'font-files',
            'movie-files',
            'favicon-files',
            'images-minify',
            'css-build',
            'html-build',
            'js-minify'
        ]
    )
});

gulp.task('watch', ['build'], () => {
    gulp.watch(config.scss.watch, ['css-build']);
    gulp.watch(config.images.input, ['images-minify']);
    gulp.watch(config.images.faviconFiles, ['favicon-files']);
    gulp.watch(config.movies.input, ['movie-files']);
    gulp.watch(config.fonts.input, ['font-files']);
    gulp.watch(config.html.watch, ['html-build']);
    gulp.watch(config.js.input, ['js-minify']);
});


