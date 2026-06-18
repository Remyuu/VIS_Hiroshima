<p class="vis-lead">这是面向 <a href="http://vis.hiroshima-u.ac.jp/index">广岛大学的视觉信息学研究室（ビジュアル情報学研究室）</a> 成员的服务器与远程实验工作指南。这里整理了从本机准备、SSH 登录、密钥配置、VS Code 远程开发、文件传输，到 tmux 长时间实验和共享资源使用规范的基本流程。</p>

<figure markdown="span">
  ![cover](../assets/images/cover.jpeg){ loading=lazy }
  <figcaption>PBRT-v4 spectral GPU path tracing render of the San Miguel de Allende courtyard scene. Rendered with the volpath integrator at 4096 samples per pixel on an NVIDIA RTX PRO 6000 Blackwell Max-Q GPU. Final homepage crop: 3840 x 2160. Total render time: 5 min 39 sec.</figcaption>
</figure>

## 开始之前

<div class="vis-card-grid">
  <a class="vis-card" href="before-you-connect/local-environment/">
    <span class="vis-card-label">准备环境</span>
    <strong>配置本机环境</strong>
    <p>选择合适的终端，确认 SSH 是否可用，并理解实验室 Zone C、校园 VPN 和校外网络之间的区别。</p>
  </a>
</div>

## 连接服务器

<div class="vis-card-grid">
  <a class="vis-card" href="connecting-to-servers/ssh-keys/">
    <span class="vis-card-label">首次登录</span>
    <strong>SSH 是什么以及如何连接</strong>
    <p>了解并使用 <code>ssh 用户名@服务器地址</code> 登录服务器。</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/ssh-key-pair/">
    <span class="vis-card-label">推荐配置</span>
    <strong>SSH 私钥和公钥</strong>
    <p>生成 Ed25519 密钥，把公钥加入服务器的 <code>authorized_keys</code>，并通过 SSH config 配置 <code>vis-server</code> 这类本机别名。</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/off-campus-access/">
    <span class="vis-card-label">校外网络</span>
    <strong>校外访问服务器</strong>
    <p>区分普通校园 SSL-VPN 和 Zone C VPN。</p>
  </a>
</div>

## 日常远程工作

<div class="vis-card-grid">
  <a class="vis-card" href="daily-remote-workflow/linux-commands/">
    <span class="vis-card-label">终端基础</span>
    <strong>常用 Linux 命令</strong>
    <p>整理服务器作业和日常终端操作中常见的命令。</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/vscode-remote-ssh/">
    <span class="vis-card-label">远程开发</span>
    <strong>VS Code Remote SSH</strong>
    <p>使用 VS Code 连接远程服务器，编辑代码并管理项目文件。</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/file-transfer/">
    <span class="vis-card-label">数据传输</span>
    <strong>文件传输</strong>
    <p>根据文件大小和传输场景选择 VS Code、<code>scp</code>、<code>rsync</code>、<code>sftp</code> 或图形化 SFTP 工具。</p>
  </a>
</div>

## 运行实验

<div class="vis-card-grid">
  <a class="vis-card" href="running-experiments/python-environments/">
    <span class="vis-card-label">实验环境</span>
    <strong>Python 实验环境隔离</strong>
    <p>安装 Miniforge，为每个项目创建独立 conda 环境，避免依赖冲突并便于复现实验。</p>
  </a>
  <a class="vis-card" href="running-experiments/tmux-and-experiments/">
    <span class="vis-card-label">长时间任务</span>
    <strong>tmux 和运行实验</strong>
    <p>安全地运行长时间实验。</p>
  </a>
  <a class="vis-card" href="running-experiments/resource-guidelines/">
    <span class="vis-card-label">共享资源</span>
    <strong>GPU / 硬盘 / 内存使用规范</strong>
    <p>启动训练前检查 <code>nvidia-smi</code>、<code>free -h</code>、<code>df -h</code> 和目录占用，避免占用过多共享资源。</p>
  </a>
</div>

## 排查与站点信息

<div class="vis-card-grid">
  <a class="vis-card" href="troubleshooting/faq/">
    <span class="vis-card-label">Q&A</span>
    <strong>常见问题</strong>
    <p>用于汇总连接、权限、环境和实验运行中的常见问题。</p>
  </a>
  <a class="vis-card" href="analytics/">
    <span class="vis-card-label">站点统计</span>
    <strong>访问统计</strong>
    <p>查看公开访问统计面板，包括访问量、来源、国家/地区、设备、浏览器和热门页面。</p>
  </a>
</div>

!!! warning "安全提醒"

    不要公开服务器密码或 SSH 私钥。不要未经允许暴露实验室服务器端口、配置反向隧道、使用第三方组网工具，或绕过学校和实验室批准的网络访问方式。

<section class="vis-contributors" data-github-contributors data-repo="Remyuu/VIS_Hiroshima" data-limit="28" data-all-label="查看全部">
  <h2>GitHub 贡献者</h2>
  <p>通过提交持续维护这份实验室使用指南的人。</p>
  <div class="vis-contributor-list">
    <a class="vis-contributor-link" href="https://github.com/Remyuu/VIS_Hiroshima/graphs/contributors">查看全部</a>
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
