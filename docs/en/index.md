<p class="vis-lead">This is a server and remote experiment workflow guide for <a href="http://vis.hiroshima-u.ac.jp/index">VIS Hiroshima lab</a> members. It covers the basic path from preparing your local computer, SSH login, key setup, VS Code remote development, and file transfer to long-running experiments with tmux and shared-resource guidelines.</p>

## Before You Connect

<div class="vis-card-grid">
  <a class="vis-card" href="before-you-connect/local-environment/">
    <span class="vis-card-label">Prepare Environment</span>
    <strong>Local Environment</strong>
    <p>Choose a suitable terminal, confirm that SSH is available, and understand the difference between the lab Zone C network, campus VPN, and off-campus networks.</p>
  </a>
</div>

## Connect to Servers

<div class="vis-card-grid">
  <a class="vis-card" href="connecting-to-servers/ssh-keys/">
    <span class="vis-card-label">First Login</span>
    <strong>SSH and Server Login</strong>
    <p>Learn how to log in to a server with <code>ssh username@server-address</code>.</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/ssh-key-pair/">
    <span class="vis-card-label">Recommended Setup</span>
    <strong>SSH Private and Public Keys</strong>
    <p>Generate an Ed25519 key, add the public key to the server's <code>authorized_keys</code>, and set local aliases such as <code>vis-server</code> in SSH config.</p>
  </a>
  <a class="vis-card" href="connecting-to-servers/off-campus-access/">
    <span class="vis-card-label">Off-campus Network</span>
    <strong>Off-campus Access</strong>
    <p>Understand the difference between the regular campus SSL-VPN and Zone C VPN.</p>
  </a>
</div>

## Daily Remote Work

<div class="vis-card-grid">
  <a class="vis-card" href="daily-remote-workflow/linux-commands/">
    <span class="vis-card-label">Terminal Basics</span>
    <strong>Common Linux Commands</strong>
    <p>Collects common commands for server jobs and everyday terminal work.</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/vscode-remote-ssh/">
    <span class="vis-card-label">Remote Development</span>
    <strong>VS Code Remote SSH</strong>
    <p>Use VS Code to connect to a remote server, edit code, and manage project files.</p>
  </a>
  <a class="vis-card" href="daily-remote-workflow/file-transfer/">
    <span class="vis-card-label">Data Transfer</span>
    <strong>File Transfer</strong>
    <p>Choose VS Code, <code>scp</code>, <code>rsync</code>, <code>sftp</code>, or a graphical SFTP tool based on file size and transfer scenario.</p>
  </a>
</div>

## Running Experiments

<div class="vis-card-grid">
  <a class="vis-card" href="running-experiments/tmux-and-experiments/">
    <span class="vis-card-label">Long-running Tasks</span>
    <strong>tmux and Running Experiments</strong>
    <p>Run long experiments safely.</p>
  </a>
  <a class="vis-card" href="running-experiments/resource-guidelines/">
    <span class="vis-card-label">Shared Resources</span>
    <strong>GPU / Storage / Memory Guidelines</strong>
    <p>Before starting training, check <code>nvidia-smi</code>, <code>free -h</code>, <code>df -h</code>, and directory usage to avoid putting unnecessary pressure on server resources.</p>
  </a>
</div>

## Troubleshooting and Site Information

<div class="vis-card-grid">
  <a class="vis-card" href="troubleshooting/faq/">
    <span class="vis-card-label">Q&amp;A</span>
    <strong>FAQ</strong>
    <p>This page is for collecting common issues with connections, permissions, environments, and experiment runs; it is currently a placeholder.</p>
  </a>
  <a class="vis-card" href="analytics/">
    <span class="vis-card-label">Site Analytics</span>
    <strong>Analytics</strong>
    <p>View the public analytics dashboard, including visits, referrers, countries/regions, devices, browsers, and popular pages.</p>
  </a>
</div>

!!! warning "Security Reminder"

    Do not disclose server passwords or SSH private keys. Do not expose lab server ports, configure reverse tunnels, use third-party mesh networking tools, or bypass network access methods approved by the university and lab without permission.

<section class="vis-contributors" data-github-contributors data-repo="Remyuu/VIS_Hiroshima" data-limit="28" data-all-label="View all">
  <h2>GitHub contributors</h2>
  <p>People whose commits keep this guide useful for the lab.</p>
  <div class="vis-contributor-list">
    <a class="vis-contributor-link" href="https://github.com/Remyuu/VIS_Hiroshima/graphs/contributors">View all</a>
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
