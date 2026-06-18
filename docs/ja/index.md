<p class="vis-lead">これは <a href="http://vis.hiroshima-u.ac.jp/index">広島大学ビジュアル情報学研究室</a> のメンバー向けの、サーバーとリモート実験ワークフローのガイドです。ローカル環境の準備、SSH ログイン、鍵設定、VS Code によるリモート開発、ファイル転送から、tmux での長時間実験と共有リソース利用規則までの基本的な流れをまとめています。</p>

<figure markdown="span">
  ![cover](../assets/images/cover.jpeg){ loading=lazy }
  <figcaption>PBRT-v4 spectral GPU path tracing render of the San Miguel de Allende courtyard scene. Rendered with the volpath integrator at 4096 samples per pixel on an NVIDIA RTX PRO 6000 Blackwell Max-Q GPU. Final homepage crop: 3840 x 2160. Total render time: 5 min 39 sec.</figcaption>
</figure>

## 始める前に

<div class="vis-card-grid">
  <a class="vis-card" href="before-you-connect/local-environment/">
    <span class="vis-card-label">環境準備</span>
    <strong>ローカル環境の設定</strong>
    <p>適切なターミナルを選び、SSH が利用できるか確認し、研究室 Zone C、キャンパス VPN、学外ネットワークの違いを理解します。</p>
  </a>
</div>

## サーバーへの接続

<div class="vis-card-grid">
  <a class="vis-card" href="connecting-to-servers/ssh-keys/">
    <span class="vis-card-label">初回ログイン</span>
    <strong>SSH とは何か、接続方法</strong>
    <p><code>ssh ユーザー名@サーバーアドレス</code> を使ってサーバーにログインする方法を確認します。</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/ssh-key-pair/">
    <span class="vis-card-label">推奨設定</span>
    <strong>SSH 秘密鍵と公開鍵</strong>
    <p>Ed25519 鍵を生成し、公開鍵をサーバーの <code>authorized_keys</code> に追加し、SSH config で <code>vis-server</code> のようなローカル別名を設定します。</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/off-campus-access/">
    <span class="vis-card-label">学外ネットワーク</span>
    <strong>学外からのサーバー接続</strong>
    <p>通常のキャンパス SSL-VPN と Zone C VPN の違いを確認します。</p>
  </a>
</div>

## 日常的なリモート作業

<div class="vis-card-grid">
  <a class="vis-card" href="daily-remote-workflow/linux-commands/">
    <span class="vis-card-label">端末の基本</span>
    <strong>よく使う Linux コマンド</strong>
    <p>サーバー作業や日常的な端末操作でよく使うコマンドを整理しています。</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/vscode-remote-ssh/">
    <span class="vis-card-label">リモート開発</span>
    <strong>VS Code Remote SSH</strong>
    <p>VS Code を使ってリモートサーバーへ接続し、コードを編集し、プロジェクトファイルを管理します。</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/file-transfer/">
    <span class="vis-card-label">データ転送</span>
    <strong>ファイル転送</strong>
    <p>ファイルサイズや転送シーンに応じて、VS Code、<code>scp</code>、<code>rsync</code>、<code>sftp</code>、またはグラフィカルな SFTP ツールを選びます。</p>
  </a>
</div>

## 実験の実行

<div class="vis-card-grid">
  <a class="vis-card" href="running-experiments/python-environments/">
    <span class="vis-card-label">実験環境</span>
    <strong>Python 実験環境の分離</strong>
    <p>Miniforge をインストールし、プロジェクトごとに conda 環境を分けて依存関係の衝突を避けます。</p>
  </a>
  <a class="vis-card" href="running-experiments/tmux-and-experiments/">
    <span class="vis-card-label">長時間タスク</span>
    <strong>tmux と実験の実行</strong>
    <p>長時間の実験を安全に実行します。</p>
  </a>
  <a class="vis-card" href="running-experiments/resource-guidelines/">
    <span class="vis-card-label">共有リソース</span>
    <strong>GPU / ストレージ / メモリ利用規則</strong>
    <p>トレーニングを開始する前に <code>nvidia-smi</code>、<code>free -h</code>、<code>df -h</code>、ディレクトリ使用量を確認し、サーバーリソースに不要な負荷をかけないようにします。</p>
  </a>
</div>

## トラブルシューティングとサイト情報

<div class="vis-card-grid">
  <a class="vis-card" href="troubleshooting/faq/">
    <span class="vis-card-label">Q&amp;A</span>
    <strong>FAQ</strong>
    <p>接続、権限、環境、実験実行に関するよくある問題をまとめるためのページです。</p>
  </a>
  <a class="vis-card" href="analytics/">
    <span class="vis-card-label">サイト統計</span>
    <strong>アクセス解析</strong>
    <p>アクセス数、参照元、国/地域、デバイス、ブラウザ、人気ページを含む公開アクセス解析パネルを確認します。</p>
  </a>
</div>

!!! warning "セキュリティ上の注意"

    サーバーパスワードや SSH 秘密鍵を公開しないでください。許可なく研究室サーバーのポートを公開したり、リバーストンネル、第三者のメッシュネットワークツール、大学や研究室が承認していないネットワークアクセス方法を使用したりしないでください。

<section class="vis-contributors" data-github-contributors data-repo="Remyuu/VIS_Hiroshima" data-limit="28" data-all-label="すべて見る">
  <h2>GitHub コントリビューター</h2>
  <p>コミットを通じて、この研究室向けガイドを継続的に整備している人たちです。</p>
  <div class="vis-contributor-list">
    <a class="vis-contributor-link" href="https://github.com/Remyuu/VIS_Hiroshima/graphs/contributors">すべて見る</a>
  </div>
</section>

<section class="vis-affiliations" aria-label="VIS Hiroshima affiliations">
  <div class="vis-affiliation-logos">
    <a class="vis-affiliation-logo vis-affiliation-grad" href="http://www.hiroshima-u.ac.jp/info/" aria-label="広島大学 大学院工学研究科情報工学専攻"></a>
    <a class="vis-affiliation-logo vis-affiliation-course" href="http://www.huis.hiroshima-u.ac.jp/c2/" aria-label="広島大学 工学部第二類情報工学課程"></a>
    <a class="vis-affiliation-logo vis-affiliation-engineering" href="http://www.hiroshima-u.ac.jp/eng/" aria-label="広島大学 大学院工学研究科・工学部"></a>
    <a class="vis-affiliation-logo vis-affiliation-university" href="http://www.hiroshima-u.ac.jp/index-j.html" aria-label="広島大学"></a>
  </div>
</section>
