# nri4-api-solo


## 使用するデータ
[Disney API](https://disneyapi.dev/)を使用し、ディズニーキャラクターのデータを参考にし作成した


## DB初期設定
1. `api_solo`データベースを作成する
   1. `echo "CREATE DATABASE api_solo;" | psql -d postgres`コマンドで作成
   2. `psql -d api_solo`でデータベースが存在するか確認
2. ルート配下に`.env.local`ファイルを作成
   1. `DB_USER`, `DB_PASSWORD`, `DB_NAME`を設定する



## 工夫点
- README.mdを読めば誰でもできるように丁寧に書いた
- createdatなどの自動付与

## 聞きたいこと
-  migrateをもう一度実行したい時はどうすればいいか、DBを削除するのか
-  自動formatterが効かない。prettier
