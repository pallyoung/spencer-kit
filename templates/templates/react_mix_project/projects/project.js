module.exports = function (env) {
    /**
     * react paths
     */
    var reactjsPaths = [
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js'
    ];
    var reactminjsPaths = [
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js'
    ];

    function jsPath(path) {
        return 'js/' + path;
    }
    /**
     * shimjs paths
     */
    var shimjsPaths = [
        'node_modules/es5-shim/es5-shim.js',
        'node_modules/es5-shim/es5-sham.js',
        'node_modules/es6-shim/es6-shim.js')
        'node_modules/es6-shim/es6-sham.js',
        'node_modules/es7-shim/es7-shim.js',
    ];
    return {
        /*
        * whether should use compass to complie scss
        * default is true,you can change the value false if you don't want to use compass.
        */
        compass:true,
        /*
        * if compass is true,it will use this dir as its compile dir
        */
        scssDIR:'',
        /**
         * all the js will use gulp-concat to join.
         */
        commonJS: {
            /**
             * react js
             */
            react: env == 'dev' ? reactjsPaths : reactminjsPaths,
            /**
             * shim js,you can commet it if you don't need shim js.
             */
            shim:shimjsPaths
        },
         /**
         * use webpack to package js
         */
        webpackEntry:{
            index:'./js/views/pc/pages/Index',
        },
        /**
         * html pages
         */
        pages: [
            {
                title: 'hello world',
                template: 'templates.html',
                output: 'index.html',
                js: ['shim.js','react.js','index.js'],
                css: ['index.css'],
                prerender:true
            },
        ]
    }
}