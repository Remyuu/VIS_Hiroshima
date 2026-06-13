# 校外访问服务器

如果你在实验室内，并且已经接入实验室所在的 Zone C 网络，通常可以直接通过 SSH 连接服务器。

如果你在家里、咖啡店，或者使用手机热点，一般不能直接访问实验室服务器。VIS Lab 的服务器属于实验室内的共享研究资源，校外访问方式必须符合学校和实验室的安全要求。

!!! warning "只使用经过批准的访问方式"

    从校外访问实验室服务器时，请只使用学校或实验室明确批准的连接方式。不要自行使用第三方组网工具、远程控制工具、反向隧道、端口转发，或其他会绕过正常网络管理的方式。

    广岛大学对 P2P 通信有限制。相关说明可参考 [Hiroshima University - P2P通信の制限について](https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/)（校内网络访问限定）。

## 1. 先判断你所在的网络

VIS Lab 服务器地址通常是 `10.30.XXX.XXX` 这样的内网地址。这类地址只能在实验室网络或被授权的 Zone C VPN 环境中访问，不能从普通校外网络直接访问。

可以先按下面的方式判断当前环境：

| 当前环境 | 是否能 SSH 到 VIS Server | 下一步 |
| --- | --- | --- |
| 实验室内 Zone C  WI-FI 网络 | :white_check_mark: | 直接按 [SSH 是什么以及如何连接](ssh-keys.md) 操作。 |
| 已获得 VIS Lab Zone C VPN 授权并正确选择 Zone C | :white_check_mark: | 使用服务器内网 IP 地址进行 SSH 连接。 |
| 已连接广岛大学普通 SSL-VPN | :interrobang: | 普通 VPN 不等于已经进入 VIS Lab 的 Zone C。 |
| 校外网络，例如家里、咖啡店、手机热点 | :x: | 先确认是否有学校或实验室批准的访问路径。 |

## 2. 普通校园 VPN 和 Zone C VPN 的区别

广岛大学的 VPN 服务用于从校外连接到校内网络。连接服务器主机名通常是：

```text
vpngw.hiroshima-u.ac.jp
```

登录时使用自己的 IMC 账户和广岛大学密码。

但是，**连接校园 VPN 不一定意能访问 VIS Lab 的 Zone C 服务器**。根据广岛大学信息媒体教育研究中心的说明，SSL-VPN 的 Zone C 通信是一个可选功能：只有在 Zone 管理者和 VPN 用户都完成必要设置后，用户才可以和指定 Zone C 中的设备通信。

广岛大学 FAQ 中提到，如果连接 VPN 后看到的 IPv4 地址落在 `133.41.244.2 - 133.41.247.254` 范围内，通常表示你没有使用 Zone C VPN 功能，而是普通 VPN 状态。使用 Zone C VPN 时，访问源地址会变成对应 Zone C 分配的外部 IP 地址。

!!! note "Zone C VPN 仍然需要指定服务器 IP"

    即使已经启用 Zone C VPN，VPN 客户端分配到的网络也不等于服务器所在的 `10.30.XXX.XXX` 内网本身。连接服务器时，仍然需要明确使用服务器的 IP 地址或主机名。

## 3. 校外访问 VIS Lab 服务器的推荐流程

从校外访问实验室服务器时，建议按下面顺序处理：

1. 先确认自己确实需要访问 VIS Lab 服务器，而不是 DGX-2 或其他校内计算资源。
2. 向 Hirakiuchi-san 联系：需要访问 VIS Lab Zone C 。
3. 被登记后，登录 [广岛大学的网络利用申请服务（校内网络访问限定）](https://hinet-apply.media.hiroshima-u.ac.jp) ，选择需要连接的 Zone C。
4. 连接 VPN 后，再使用普通 SSH 工作流连接服务器。

SSH 命令仍然是：

```bash
ssh 用户名@服务器地址
```

例如：

```bash
ssh jie-zhang@10.30.XXX.XXX
```

如果已经配置好 SSH config，也可以使用：

```bash
ssh vis-server
```

## 4. 连接不上时先看什么

如果校外连接失败，可以按错误信息判断大致方向。

### `Connection timed out`

通常表示你的电脑到服务器没有网络路径。常见原因包括：

- 只连接了普通 SSL-VPN，但没有 VIS Lab Zone C 权限；
- 没有在 VPN 设置中选择正确的 Zone C；

### `Permission denied`

已经能连到服务器，问题出现在权限错误。请回到下面两章检查：

- [SSH 是什么以及如何连接](ssh-keys.md)
- [SSH 私钥和公钥](ssh-key-pair.md)

## 5. 获得批准的访问路径后

一旦网络路径确认可用，后续操作仍然建议使用普通 SSH 工作流：

- 在本机配置 `~/.ssh/config`；
- 使用 SSH key 登录；
- 用 VS Code Remote SSH 编辑代码；
- 长时间任务放在 `tmux` 中运行；
- 大文件传输使用 `scp`、`rsync` 或图形化 SFTP 工具。

相关章节：

- [SSH 是什么以及如何连接](ssh-keys.md)
- [SSH 私钥和公钥](ssh-key-pair.md)
- [VS Code Remote SSH](../daily-remote-workflow/vscode-remote-ssh.md)
- [文件传输](../daily-remote-workflow/file-transfer.md)
- [tmux 和运行实验](../running-experiments/tmux-and-experiments.md)

## 6. 联系管理员时请准备的信息

如果你需要 Hirakiuchi-san 或其他同学帮忙排查，请尽量提供下面的信息：

- 你所在的位置或网络环境：实验室、校外、普通 VPN、Zone C VPN；
- 你要连接的服务器名称或 IP 地址；
- 你运行的完整命令；
- 终端显示的完整错误信息；
- 你使用的操作系统：macOS、Windows、Linux；
- 是否已经能通过普通 SSH 登录，还是只有 VS Code Remote SSH 失败。

不要发送自己的服务器密码或 SSH 私钥。

## 参考

- [Hiroshima University - VPN(SSL-VPN)サービス](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/)
- [Hiroshima University - VPN接続されていることを確認する方法はありますか？](https://help.media.hiroshima-u.ac.jp/?action=faq&cat=12&id=123&artlang=ja)
- [Hiroshima University - 学内ネットワークの申請－個人管理者](https://www.media.hiroshima-u.ac.jp/services/hinet/hinetapply-person/)
- [Hiroshima University - ネットワーク利用申請サービス](https://hinet-apply.media.hiroshima-u.ac.jp/)（校内网络访问限定）
