const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // モードの設定
  mode: 'development',
  // モジュールバンドルを行う起点となるファイルの指定
  entry: {
    bundle: './src/index.ts'
  },
  // モジュールバンドルを行なった結果を出力するファイル名を指定
  output: {
    // __dirnameはファイルが存在するディレクトリ
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, 'dist'),
    // [name]はentryで記述した名前
    filename: '[name].js'
  },
  // import文でファイル拡張子を書かずに名前解決するための設定
  resolve: {
    extensions: ['.ts', '.js']
  },
  // 開発ようサーバーの設定
  devServer: {
    static: {
      // webpack-dev-serverの公開設定
      // eslint-disable-next-line no-undef
      directory: path.join(__dirname, './')
    },
    // サーバー起動時にブラウザを開く
    open: true
  },
  // モジュールに適用するルールの設定（ローダーの設定を行うことが多い）
  module: {
    rules: [
      {
        // 拡張子が.tsのファイルに対してTypeScriptのコンパイラを適用する
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        // SASSおよびCSSのローダー設定
        test: /\.(scss|sass|css)$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 抽出するCSSのファイル名
      filename: 'styles.css'
    })
  ]
};
