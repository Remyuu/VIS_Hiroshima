# Off-campus Access

If you are in the lab or already connected to the lab's Zone C network, you can usually connect to servers directly through SSH.

If you are at home, in a dorm, in a cafe, traveling, or using a mobile hotspot, do not assume that you can directly access lab servers. Lab servers are shared research resources, and off-campus access methods must comply with university and lab security requirements.

!!! warning "Use only approved access methods"
    When connecting to lab servers from off campus, use only connection methods explicitly approved by the university or the lab. Do not set up third-party networking tools, remote-control tools, reverse tunnels, port forwarding, or other methods that bypass normal network management.

    P2P communication is not available at Hiroshima University:

    [https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/](https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/) (campus LAN access only)

## 1. Check Your Network First

VIS Lab server addresses are usually private addresses such as `10.XXX.XXX.XXX`.

The university VPN usually uses `133.XXX.XXX.XXX`.

Ordinary off-campus networks usually cannot directly access these addresses. If you need to access lab servers from off campus, please contact the network administrator.

## 2. After Access Is Approved

After you have an approved access path, continue to use the normal SSH workflow:

- Configure `~/.ssh/config` on your computer;
- Use SSH key authentication;
- Use VS Code Remote SSH for code editing;
- Run long tasks inside `tmux`;
- Transfer large files with `scp`, `rsync`, or a graphical interface.

Related chapters:

- [SSH and Server Login](ssh-keys.md)
- [SSH Public and Private Keys](ssh-key-pair.md)
- [VS Code Remote SSH](../daily-remote-workflow/vscode-remote-ssh.md)
- [tmux and Running Experiments](../running-experiments/tmux-and-experiments.md)

## 6. References

- [学内ネットワークの申請－個人管理者](https://www.media.hiroshima-u.ac.jp/services/hinet/hinetapply-person/)
- [VPN(SSL-VPN)サービス](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/)
- [ネットワーク利用申請サービス](https://hinet-apply.media.hiroshima-u.ac.jp/) (campus LAN access only)
