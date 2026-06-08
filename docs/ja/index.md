<section class="vis-hero">
  <p class="vis-kicker">VIS Lab Computing Guide</p>
  <h1>VIS Hiroshima ドキュメント</h1>
  <p>大学のサーバーや計算環境を利用する VIS Lab メンバー向けの実践的なメモです。</p>
</section>

このドキュメントは、[VIS Hiroshima 実験室](http://vis.hiroshima-u.ac.jp/index) のメンバーがローカル環境を準備し、研究室サーバーへ接続し、リモートで実験を進めるための基本的な流れをまとめたものです。

<div class="vis-card-grid">
  <a class="vis-card" href="before-you-connect/local-environment/">
    <span class="vis-card-label">はじめに</span>
    <strong>ローカル環境の設定</strong>
    <p>研究室サーバーへ接続する前に必要なツールを準備します。</p>
  </a>
</div>

<div class="vis-card-grid">
  <a class="vis-card" href="connecting-to-servers/ssh-keys/">
    <span class="vis-card-label">サーバーへの接続</span>
    <strong>SSH とは何か、接続方法</strong>
    <p>SSH を理解し、研究室ネットワークからサーバーへ接続します。</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/ssh-key-pair/">
    <span class="vis-card-label">サーバーへの接続</span>
    <strong>SSH 公開鍵と秘密鍵</strong>
    <p>SSH の公開鍵と秘密鍵がサーバーログイン認証で果たす役割を確認します。</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/tailscale/">
    <span class="vis-card-label">サーバーへの接続</span>
    <strong>Tailscale によるリモート接続</strong>
    <p>研究室ネットワーク外から、Tailscale を通じて利用可能なサーバー資源へアクセスします。</p>
  </a>
</div>

<div class="vis-card-grid">
  <a class="vis-card" href="daily-remote-workflow/linux-commands/">
    <span class="vis-card-label">日常作業</span>
    <strong>よく使う Linux コマンド</strong>
    <p>サーバー作業や日常的な端末操作で使うコマンドを確認します。</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/vscode-remote-ssh/">
    <span class="vis-card-label">日常作業</span>
    <strong>VS Code Remote SSH</strong>
    <p>VS Code からリモートサーバーへ接続し、コード編集やプロジェクトファイル管理を行います。</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/file-transfer/">
    <span class="vis-card-label">日常作業</span>
    <strong>ファイル転送</strong>
    <p>ローカル環境とサーバーの間で、コード、データセット、実験結果を転送します。</p>
  </a>
</div>

<div class="vis-card-grid">
  <a class="vis-card" href="running-experiments/tmux-and-experiments/">
    <span class="vis-card-label">実験</span>
    <strong>tmux と実験の実行</strong>
    <p>長時間の実験を安全に実行し、リソース利用規則を確認します。</p>
  </a>
  <a class="vis-card" href="running-experiments/resource-guidelines/">
    <span class="vis-card-label">実験</span>
    <strong>GPU / ストレージ / メモリ利用規則</strong>
    <p>共有サーバー資源の利用ルールを確認し、他のメンバーへの影響を避けます。</p>
  </a>
</div>

<div class="vis-card-grid">
  <a class="vis-card" href="troubleshooting/faq/">
    <span class="vis-card-label">トラブルシューティング</span>
    <strong>FAQ</strong>
    <p>接続、権限、環境、実験実行でよくある問題への対応を確認します。</p>
  </a>
</div>

<section class="vis-meta">
  <p><a href="http://vis.hiroshima-u.ac.jp/">VIS Lab</a> の <a href="https://remoooo.com">remo</a> によって管理されています。</p>
</section>
