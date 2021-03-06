const ip = require('ip')
const NODE_ENV = process.env.NODE_ENV || 'development'
const port = '8989'
module.exports = {
  ip,
  port,
  env: NODE_ENV,
  basePath: __dirname,
  srcDir: 'src',
  main: 'main',
  outDir: 'dist',
  publicPath: NODE_ENV === 'development' ? `http://${ip.address()}:${port}/` : './',
  sourcemaps: NODE_ENV === 'development',
  externals: {},
  globals: {},
  verbose: false
}
