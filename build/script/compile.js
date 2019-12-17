const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const logger = require('../logger')
const webpackConfig = require('../webpack.config')
const project = require('../../project.config')
const webpackCompiler = wpConfig => {
  return new Promise((reslove, reject) => {
    webpack(wpConfig).run((err, res) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }
      const jsonStats = res.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      }
      if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      reslove(res)
    })
  })
}
const compiler = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info('Target application environment: ' + chalk.bold(project.env)))
  .then(() => webpackCompiler(webpackConfig))
  .then(res => {
    logger.info(`Copying static assets from ./public to ./${project.outDir}.`)
    fs.copySync(
      path.resolve(project.basePath, 'public'),
      path.resolve(project.basePath, project.outDir)
    )
    return res
  })
  .then((res) => {
    if (project.verbose) {
      logger.log(res.toString({
        colors: true,
        chunks: false,
      }))
    }
    logger.success(`Compiler finished successfully! See ./${project.outDir}.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))
compiler()
