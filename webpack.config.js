const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin') // * Not supported since webpack 5

module.exports = (env) => ({
  mode: env.NODE_ENV || 'development',
  entry: './src/index.js', // From v5, this is default
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'), // Output build directory name. From v5, this is default
    publicPath: '/', // The bundled files will be available in the browser under this path. Eg. A request to a chunk will look like /1.chunk.js. In our case('/'), it's relative to HTML page
  },
  plugins: [
    new CleanWebpackPlugin(), // Remove HTML file and re-create on each build
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    // * Not supported since webpack 5
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async',
    // }), // Load bundle scripts asynchronously
  ],
  devServer: {
    // host: '0.0.0.0', // Uncomment this, If you want your server to be accessible externally(Mobile etc.)
    port: 3000, // Port number to listen for requests
    open: true, // To open the browser after server had been started
    static: {
      directory: path.join(__dirname, './public'), // where to serve content(static files) from,
      publicPath: '/', // Tell the server at which URL to serve static.directory content. For example to serve a file from /public/assets/manifest.json at /static/manifest.json, this value should be '/static/'
    },
    // inline: true, // Inject scripts into the bundle to show live reloading and build messages in the browser console. Webpack removed this in v5.
    hot: true, // Enables HMR
    historyApiFallback: true, // In case 404 responses, root(index.html) file will be served,
  },
  devtool: env.NODE_ENV === 'production' ? false : 'source-map', // How source codes are mapped/shown in the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|png|svg|jpg|gif|woff|woff2|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
})
