# 学外からのサーバー接続

研究室内、または研究室の Zone C ネットワークに接続している場合は、通常 SSH でサーバーへ直接接続できます。

自宅、寮、カフェ、出張先、モバイル回線などを利用している場合は、研究室サーバーへ直接アクセスできると考えないでください。研究室サーバーは共有の研究資源であり、学外からのアクセス方法は大学および研究室のセキュリティ要件に従う必要があります。

!!! warning "承認済みの接続方法のみを使用してください"
    学外から研究室サーバーへ接続する場合は、大学または研究室が明示的に承認した接続方法のみを使用してください。第三者のネットワーク構築ツール、遠隔操作ツール、リバーストンネル、ポート転送、または通常のネットワーク管理を回避するその他の方法を自己判断で使用しないでください。

    P2P通信は広島大学では利用不可となっています：

    [https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/](https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/) （学内 LAN からのアクセス限定）

## 1. 現在のネットワークを確認する

VIS Lab のサーバーアドレスは、通常 `10.XXX.XXX.XXX` のようなプライベートアドレスです。

大学 VPN は通常 `133.XXX.XXX.XXX` を使用します。

一般的な学外ネットワークからは、この種類のアドレスへ直接アクセスできないことがほとんどです。学外から研究室サーバーへアクセスする必要がある場合は、ネットワーク管理者に連絡してください。

## 2. 接続が承認された後

承認済みの接続経路を利用できるようになった後も、基本的には通常の SSH ワークフローを使います。

- ローカル端末で `~/.ssh/config` を設定する；
- SSH key 認証を利用する；
- コード編集には VS Code Remote SSH を使う；
- 長時間の処理は `tmux` 内で実行する；
- 大きなファイルの転送には `scp`、`rsync`、グラフィカルインターフェースなどを使う。

関連章：

- [SSH とは何か、接続方法](ssh-keys.md)
- [SSH 公開鍵と秘密鍵](ssh-key-pair.md)
- [VS Code Remote SSH](../daily-remote-workflow/vscode-remote-ssh.md)
- [tmux と実験の実行](../running-experiments/tmux-and-experiments.md)

## 参考

- [学内ネットワークの申請－個人管理者](https://www.media.hiroshima-u.ac.jp/services/hinet/hinetapply-person/)
- [Hiroshima University - VPN(SSL-VPN)サービス](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/)
- [ネットワーク利用申請サービス](https://hinet-apply.media.hiroshima-u.ac.jp/) （学内 LAN からのアクセス限定）
