const fs = require('fs')

module.exports = api => {
  api.extendPackage({
    scripts: {
      start: 'node dist/backend/index.js',
      dev: 'export NODE_ENV=development && tsc --watch -p backend --preserveWatchOutput & nodemon dist/backend/index.js',
      build: 'export NODE_ENV=production && tsc -p backend && vue-cli-service build'
    },
    prettier: {
      printWidth: 140,
      semi: false,
      singleQuote: true,
      arrowParens: 'avoid',
      plugins: ['./node_modules/prettier-plugin-jsdoc/dist/index.js']
    },
    dependencies: {
      '@heroicons/vue': '^1.0.6',
      cors: '^2.8.5',
      'cross-fetch': '^3.1.5',
      'date-fns': '^2.28.0',
      dotenv: '^16.0.1',
      express: '^4.18.1'
    },
    devDependencies: {
      '@types/cors': '^2.8.12',
      '@types/dotenv': '^8.2.0',
      '@types/express': '^4.17.13',
      'prettier-plugin-jsdoc': '^0.3.38',
      nodemon: '^2.0.18'
    }
  })

  api.render('./template')

  api.onCreateComplete(() => fs.existsSync('README.md') && fs.unlinkSync(api.resolve('README.md')))

  api.exitLog(`To spin up the backend (which doesn't do anything yet), run \`yarn dev\``)
}
