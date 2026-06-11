# 校外访问服务器

如果你在实验室或已经接入实验室所在的 Zone C 网络，通常可以直接通过 SSH 连接服务器。

如果你在家里、宿舍、咖啡店、出差地点，或者使用手机热点，则不要默认自己可以直接访问实验室服务器。实验室服务器属于共享研究资源，校外访问方式需要符合学校和实验室的安全要求。

!!! warning "只使用经过批准的访问方式"
    从校外访问实验室服务器时，请只使用学校或实验室明确批准的连接方式。不要自行使用第三方组网工具、远程控制工具、反向隧道、端口转发，或其他会绕过正常网络管理的方式。

    P2P通信は広島大学では利用不可となっています：

    [https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/](https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/) （校内局域网访问限定）

## 1. 先判断你所在的网络

VIS Lab 服务器地址通常是 `10.XXX.XXX.XXX` 这样的内网地址。

学校 VPN 通常是 `133.XXX.XXX.XXX` 。

普通校外网络通常无法直接访问这类地址。如果你在校外需要访问实验室服务器，请联系网络管理员。

## 2. 连接成功后

获得批准的访问路径后，后续操作仍然建议使用普通 SSH 工作流：

- 在本机配置 `~/.ssh/config`；
- 使用 SSH key 登录；
- 用 VS Code Remote SSH 编辑代码；
- 长时间任务放在 `tmux` 中运行；
- 大文件传输使用 `scp`、`rsync`、图形化界面等。

相关章节：

- [SSH 是什么以及如何连接](ssh-keys.md)
- [SSH 私钥公钥](ssh-key-pair.md)
- [VS Code Remote SSH](../daily-remote-workflow/vscode-remote-ssh.md)
- [tmux 和运行实验](../running-experiments/tmux-and-experiments.md)

## 参考

- [学内ネットワークの申請－個人管理者](https://www.media.hiroshima-u.ac.jp/services/hinet/hinetapply-person/)
- [Hiroshima University - VPN(SSL-VPN)サービス](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/)
- [ネットワーク利用申請サービス](https://hinet-apply.media.hiroshima-u.ac.jp/) （校内局域网访问限定）
