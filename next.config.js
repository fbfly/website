const withImages = require('next-images')
const withStyles = require('@webdeb/next-styles')
const compose = require('next-compose')

const imagesConfig = {
  target: 'serverless',
  devIndicators: {
    autoPrerender: false,
  },
}

const sassConfig = {
  sass: true,
  sassLoaderOptions: {
    sassOptions: {
      includePaths: ['styles'],
    },
  },
}

const fontsConfig = {}

module.exports = compose([
  [withStyles, sassConfig],
  [withImages, imagesConfig],
  {
    webpack: config => {
      config.module.rules.push({
        test: /\.(woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      })
      return config
    },
  },
])
