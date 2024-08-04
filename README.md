![Feedback to Turtle](https://github.com/ishida-daiki/github-discussions/blob/main/_resources/Thumbnail.png)

## Table of content
- [Using](#using)
- [Settings](#settings)
  - [開発環境の設定](#開発環境の設定) 
  - [パーソナルアクセストークンの作成](#パーソナルアクセストークンの作成) 
- [Build](#build)
  - [プラグインをビルドするコマンド](#プラグインをビルドするコマンド) 
  - [コードの変更を監視し、プラグインを自動的に再ビルドするコマンド](#コードの変更を監視し、プラグインを自動的に再ビルドするコマンド) 
- [Appendix](#Appendix)

## Using

<img src="https://github.com/ishida-daiki/github-discussions/blob/main/_resources/Icon.png" width="50px"> 
環境構築される前に、Plugin の挙動を確認したい方は、下記の手順よりお試しくださいご使用ください。

1. [Discussions](https://www.figma.com/community/plugin/888356646278934516/Design) ページにアクセス
2. 「Open in...」をクリック

## Settings
### 開発環境の設定
1. Use this template > Create a new repository を押下し、新しいリポジトリを作成
2. 作成したリポジトリをクローン
3. 作成したリポジトリに移動
4. 必要なパッケージをインストール
```cli
npm install
```
5. vs code を起動
```cli
code .
```
6. ルートに `.env` ファイルを作成し、下記の値を設定
```.env
例）ishida-daiki / github-discussions の場合

GITHUB_OWNER=ishida-daiki
GITHUB_REPO=github-discussions
GITHUB_ACCESS_TOKEN=#新規作成した Github のパーソナルアクセストークンを設定してください
```
> [!IMPORTANT]
> `.env` ファイルの `GITHUB_ACCESS_TOKEN` に値が設定されていないと、Github Discussions の情報取得や Github Discussion への登録ができません。
> 必ず、パーソナルアクセストークンを発行後、`.env` ファイルに設定してください。
> 
> 作成方法は [パーソナルアクセストークンの作成](#パーソナルアクセストークンの作成) をご確認ください。
6. 🎉 開発環境が整いました！実際に開発を行う際は、[Build](#build) を読んで開発を行ってください。

### パーソナルアクセストークンの作成
1. Github にログイン後、https://github.com/settings/tokens を開く
2. `Generate new token` を押下
3. 「Expiration」 を `No expiration` で設定
4. 「Select scopes」 の `repo` と `write:discussion` にチェックを入れる
5. `Generate token` を押下
6. 生成されたトークンをコピーし、`.env` ファイルの `GITHUB_ACCESS_TOKEN` に設定
設定
> [!WARNING]
> 複数の `GITHUB_ACCESS_TOKEN` を作成するのではなく、一つだけ生成し、それをチーム内で共用する方法を推奨します。

## Build
### プラグインをビルドするコマンド
```cli
npm run build
```
上記コマンドを実行すると、[`manifest.json`](https://figma.com/plugin-docs/manifest/) ファイルとプラグイン用の JavaScript バンドルを含む `build/` ディレクトリが生成されます。

### プラグインを自動的に再ビルドするコマンド
```cli
npm run watch
```
上記コマンドにより、ソースコードの変更が監視されます。更新があるとプラグインは自動的に再ビルドされます。

## Figma Plugin Publish
投稿者がわかるよう enablePrivatePluginApi を true にしていますが、このプロパティは、プライベートか組織内向けのプラグインでないと使えません。
```
// package.json

"enablePrivatePluginApi": true,
```
> [!NOTE]
> **このプラグインは組織内でのみ使用可能です！**
> プラグインには、Figma ユーザーが利用できる Public なプラグインと Private なプラグインの 2つが存在しますが、このプラグインは Private なものであり、組織内に属するメンバーのみが使用できます。
>
> <a href="https://help.figma.com/hc/ja/articles/4404239055127-%E7%B5%84%E7%B9%94%E3%81%AE%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%A8%E3%82%A6%E3%82%A3%E3%82%B8%E3%82%A7%E3%83%83%E3%83%88%E3%81%AE%E4%BF%9D%E5%AD%98" target="_blank"><img src="https://github.com/ishida-daiki/github-discussions/blob/main/_resources/Card.png" alt="組織のプラグインとウィジェットの保存" style="width: 250px; height: 61px;" width="250" height="61" /></a>


## Appendix

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins#readme)

Figmaの公式ドキュメントとコードサンプル：

- [Plugin API docs](https://figma.com/plugin-docs/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples#readme)
