const path = require('path')
const webpack = require('webpack')
const { env, basePath, externals, main,
  publicPath, globals, outDir, srcDir,
  sourcemaps } = require('../project.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const inProject = path.resolve.bind(path, basePath)
const inProjectSrc = (file) => inProject(srcDir, file)
// 各类非 js 直接引用（import require）静态资源，依赖相对路径加载问题，都可以用 ~ 语法完美解决；
const resolve = dir => path.join(__dirname, '..', dir)
const __DEV__ = env === 'development'
const __TEST__ = env === 'test'
const __PROD__ = env === 'production'
const extensions = ['*', '.js', '.vue', '.scss', '.css', '.json', '.jpg', '.jpeg', '.png']

const config = {
  // mode: 'development',
  mode: env,
  entry: {
    normalize: [
      inProjectSrc('normalize')
    ],
    main: [
      inProjectSrc(main)
    ]
  },
  output: {
    path: inProject(outDir),
    filename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    publicPath
  },
  // Remove size waring
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devtool: sourcemaps ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: []
  },
  resolve: {
    modules: [
      inProjectSrc(srcDir),
      'node_modules'
    ],
    alias: {
      '@': resolve(srcDir),
      api: resolve(`${srcDir}/api`),
      pages: resolve(`${srcDir}/views`)
    },
    extensions
  },
  externals,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
      __DEV__,
      __TEST__,
      __PROD__,
      ...globals
    }),
    new VueLoaderPlugin()
  ]
}
// handle .vue
config.module.rules.push({
  test: /\.vue$/i,
  use: [
    {
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'happypack/loader?id=happyBabel'
        }
      }
    }
  ]
})
// handle .js
config.module.rules.push({
  test: /\.js|jsx$/i,
  exclude: /node_modules/,
  loader: 'happypack/loader?id=happyBabel'
})

const babelLoader = {
  loader: 'babel-loader',
  options: {
    comments: false,
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-transform-runtime',
      [
        'import', {
          'libraryName': 'ant-design-vue',
          'libraryDirectory': 'es',
          'style': 'css'
        }
      ] // `style: true` 会加载 less 文件
    ],
    presets: [
      ['@babel/preset-env', {
        modules: false,
        loose: true,
        // useBuiltIns: "usage",
        targets: {
          ie: 9,
          browsers: [
            'last 5 versions',
            'safari >= 7',
            'not ie < 9'
          ]
        }
      }]
    ]
  }
}
// js happypack
config.plugins.push(
  new HappyPack({
    id: 'happyBabel',
    cache: __DEV__,
    loaders: [babelLoader],
    // 共享进程池
    threadPool: happyThreadPool,
    verbose: false
  })
)
// css
config.module.rules.push({
  test: /\.(sa|sc|c)ss$/,
  use: [
    'vue-style-loader',
    // 只能在production中运用MiniCssExtractPlugin.loader
    {
      loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: sourcemaps
      }
    }
  ]
})
// file
config.module.rules.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 8192,
    name: 'images/[name]-[hash].[ext]'
  }
})
// font and svg
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]
  config.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name]-[hash].[ext]',
      limit: 10000,
      mimetype
    }
  })
})
// template
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true
  }
}))
// Bundle Splitting
config.optimization = {
  splitChunks: {
    cacheGroups: {
      // 抽离第三方插件
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        enforce: true,
        chunks: 'all'
      },
      // 其他同步加载公共包
      commons: {
        chunks: 'all',
        minChunks: 2,
        name: 'commons',
        priority: 80
      }
    }
  }
}
// moment 去除语言包，减少体积
config.plugins.push(
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
)
// 碰到错误warning但是不停止编译
config.plugins.push(
  new webpack.NoEmitOnErrorsPlugin()
)
// hot server
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}
// production
if (__PROD__) {
  config.optimization.minimizer = [
    // mini js
    new TerserPlugin({
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        module: false,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false
      }
    }),
    // mini css
    new OptimizeCSSAssetsPlugin({})
  ]
  // separate css
  config.plugins.push(new MiniCssExtractPlugin({
    filename: __DEV__ ? 'css/[name].css' : 'css/[name].[contenthash].css',
    chunkFilename: __DEV__ ? 'css/[id].css' : 'css/[id].[hash].css'
  }))
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
  )
}
module.exports = config
