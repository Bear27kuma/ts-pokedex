const path = require('path');
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
      directory: path.join(__dirname, 'dist')
    },
    // サーバー起動時にブラウザを開く
    open: true
  },
  // モジュールに適用するルールの設定（ローダーの設定を行うことが多い）
  module: {
    rules: [
      {
        // 拡張子が.tsのファイルに対してTypeScriptのコンパイラを適用する
        loader: 'ts-loader',
        test: /\.ts$/
      }
    ]
  },
  // ファイル監視設定
  watch: true,
  watchOptions: {
    // ビルドから200ms経過後に監視開始
    aggregateTimeout: 200,
    // 1000msごとに変更点がないかチェック
    poll: 1000
  }
};
