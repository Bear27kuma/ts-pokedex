# TS Pokédex
TypeScriptで作るポケモン図鑑

## Overview
TypeScript + Tailwind.css + Daisy UI + Sass を利用したシンプルなポケモン図鑑。
[PokéAPI](https://pokeapi.co/) を使用してポケモンの情報取得し、表示される。
各世代ごとに表示させるボタン付き。

## スクリーンショット

![Screenshot01](https://user-images.githubusercontent.com/39920490/169633399-779dfbc9-bb9b-4e09-8249-cac06df107dc.png)
![Screenshot02](https://user-images.githubusercontent.com/39920490/169633425-e0f95f79-617f-4c08-aaa2-68e3e25dcdf6.png)


## 開発環境

Docker Desktop for mac 4.8.1

| 言語・フレームワーク・パッケージ名                 | バージョン     | 
| -------------------------------------------- | -------------- | 
| node | 16.15.0 | 
| typeScript | 4.6.4 | 
| jquery | 3.6.0 |
| sass  | 1.15.0 | 
| tailwind CSS | 3.0.24 | 
| daisy ui | 2.15.0 |

## 開発環境構築

Docker Desktopのインストールが前提になります。

インストールページはこちらから → [Docker Desktop](https://www.docker.com/get-started/)


本リポジトリをgit clone後、以下のコマンドで進めてください。
```
# プロジェクトフォルダに移動する
$ cd ts-pokedex

# Dockerをビルドする
$ docker compose build

# Dockerを立ち上げる
$ docker compose up -d

# nodeコンテナに入る
$ docker compose exec node bash

# npmコマンドでプロジェクトを起動する
$ npm run start
```

上記の手順後、[http://localhost:8080](http://localhost:8080)にアクセスするとページが開きます。

## npmコマンド一覧

```
# webpack-serverを起動して、変更を検知する
$ npm run start

# Sassの変更を検知してコンパイルする
$ npm run watch

# 本番用にビルドを行う
$ npm run build

# ESLintとPrettierを実行し、コードの静的検証とフォーマットを行う
$ npm run lint-fix
```


## Webpackによるコンパイルとバンドル
本プロジェクトではWebpackによるコンパイルとバンドルの設定を導入しています。
バージョン情報などは以下

Webpack 5.72.1

Docker Desktop for mac 4.8.1

| パッケージ名                 | バージョン     | 
| -------------------------------------------- | -------------- | 
| webpack-cli | 4.9.2 | 
| webpack-dev-server | 4.9.0 | 
| ts-loader | 9.3.0 |
| css-loader  | 6.7.1 | 
| sass-loader | 12.6.0 | 

Webpackを使用したコンパイルとバンドルの流れは以下になります。

![compile_bundle](https://user-images.githubusercontent.com/39920490/169736949-e25168cf-1b26-4dd9-abe5-2cb499feefb9.png)

## ESLintとPrettierによるCI環境
ESLintによるコードの静的検証とPrettierによるコードフォーマットを`git commit`した際に行うよう、huskyとlint-stagedを導入

| パッケージ名                 | バージョン     | 
| -------------------------------------------- | -------------- | 
| eslint | 8.15.0 | 
| eslint-config-prettier | 8.5.0 | 
| prettier | 2.6.2 |
| husky  | 4.3.8 | 
| lint-staged | 12.4.1 | 

`git commit`後の流れは以下の通りです。

![pre-commit](https://user-images.githubusercontent.com/39920490/169633486-85c6a538-a46a-43de-bd90-434775dc6857.png)
