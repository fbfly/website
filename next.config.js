const withImages = require('next-images')
const compose = require('next-compose')

const imagesConfig = {
  target: 'serverless',
  devIndicators: {
    autoPrerender: false,
  },
}

const fontsConfig = {}

module.exports = compose([
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
