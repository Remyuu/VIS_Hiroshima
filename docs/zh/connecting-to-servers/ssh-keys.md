# SSH 是什么以及如何连接

在使用 VIS Hiroshima 实验室的 Ubuntu 服务器前，需要先学会两件事：

1. 如何通过 SSH 连接到服务器；
2. 如何使用基本的 Linux/UNIX 命令。

本节先介绍 SSH 的作用，并完成一次最基本的服务器登录。后续章节会继续介绍 SSH 密钥、VS Code Remote SSH、文件传输和长期实验运行。

![SSH-remoooo](../../assets/images/connecting-to-servers/image0.png){ loading=lazy }

## 1. SSH 的基本概念

SSH 的全称是 **Secure Shell**，是一组用于远程访问计算机的网络协议。它可以在你的电脑和远程服务器之间建立经过加密的连接。

实验室的 Ubuntu 服务器称为服务器端，SSH 负责在你的电脑和服务器端之间建立连接。建立连接后，你可以在自己的电脑上查看服务器中的文件、创建编辑运行代码、使用服务器端的 GPU 资源、下载实验结果等等。

登录服务器后，虽然你是在自己的电脑上输入命令，但这些命令实际会在远程服务器上执行。SSH 会加密通信内容，包括用户名、密码、命令和传输的数据，因此很适合研究和服务器管理场景。

## 2. 是否需要安装 SSH 软件

根据电脑使用的操作系统，你可能已经有可用的 SSH 客户端。

=== "macOS"

    Mac 通常已经预装命令行版 SSH 工具，不需要额外安装。推荐使用 Ghostty、iTerm2 或系统自带的 Terminal。

    打开终端后输入：

    ```bash
    ssh -V
    ```

    如果屏幕上显示 SSH 的使用说明，就说明 SSH 已经可以正常使用。

=== "Windows"

    Windows 通常已经预装 OpenSSH 客户端。推荐使用 PowerShell。

    打开 PowerShell 后输入：

    ```powershell
    ssh -V
    ```

    如果显示 SSH 的命令说明，就表示 SSH 客户端已经安装完成。

    如果系统提示找不到 `ssh` 命令，可以在 Windows 的“可选功能”中确认是否已经安装 **OpenSSH Client**。

## 3. 连接服务器前需要准备什么

在连接实验室服务器之前，你需要得到 **Hirakiuchi-san 分配给你的用户名、实验室服务器的 IP 地址或主机名以及对应的账号密码**。

服务器账号通常由 Hirakiuchi-san 或其他服务器管理员提供。

Hirakiuchi-san 可能会给你类似下面的信息：

```text
Blackwell:10.30.XXX.XXX
アカウント名：jie-zhang
パスワード：今日の日付（8桁の数字）
```

这里的 `10.30.XXX.XXX` 是服务器在实验室内部网络中的 IP 地址。

## 4. 在实验室网络内连接服务器

如果你的电脑已经连接到实验室的有线网络或无线网络，就可以尝试直接使用 SSH 连接服务器。

SSH 命令的基本格式是：

```bash
ssh 用户名@服务器地址
```

例如：

```bash
ssh jie-zhang@10.30.XXX.XXX
```

第一次连接某台服务器时，SSH 可能会显示类似下面的信息：

```text
The authenticity of host '10.30.XXX.XXX' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

这表示你的电脑以前没有连接过这台服务器，因此还没有保存服务器的身份信息。直接输入 `yes` 然后按 Enter 键。

确认后，服务器信息会被记录到本地的 `known_hosts` 文件中。以后再次连接同一台服务器时，通常不会重复出现这个提示。

## 5. 输入密码

执行 SSH 命令后，终端会要求输入密码：

```text
jie-zhang@10.30.XXX.XXX's password:
```

此时输入 Hirakiuchi-san 提供的服务器密码，然后按 Enter。

> **注意：输入密码时屏幕不会显示任何内容**
>
> 在命令行中输入密码时，屏幕上不会出现星号、圆点或密码字符。这是正常的安全设计。
>
> 直接正常输入密码并按 Enter 即可。如果担心输入错误，可以按 `Ctrl + C` 取消当前连接，然后重新执行 SSH 命令。

## 6. 登录成功后如何确认

下面展示一次完整的 SSH 登录过程：

```text
user@DESKTOP-TRQ9UD0 C:\Users\user>ssh jie-zhang@10.30.XXX.XXX
jie-zhang@10.30.XXX.XXX's password:
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-85-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of 2026年  6月  7日 日曜日 22:47:44 JST

  System load:           2.31
  Usage of /:            11.4% of 13.97TB
  Memory usage:          13%
  Swap usage:            1%
  Temperature:           47.0 C
  Processes:             618
  Users logged in:       4
  IPv4 address for eno1: 10.30.XXX.XXX
  IPv6 address for eno1: 2001:2f8:xxx:xxx::xxxx

Expanded Security Maintenance for Applicationsが無効化されています。

112のアップデートはすぐに適用されます。
これらの更新の63は、標準のセキュリティ更新です。

Last login: Sun Jun  7 20:40:49 2026 from 2001:2f8:1c1:c39::480d
```

从此刻开始，你输入的命令会在实验室服务器上执行，而不是在自己的电脑上执行。

例如，输入 `pwd` 可以查看当前所在目录。

输入 `ls` 可以查看当前目录中的文件。

输入 `whoami` 可以确认当前登录的用户名。

输入 `hostname` 可以查看当前服务器的主机名。

输入 `nvidia-smi` 可以查看当前的 GPU 使用情况。

## 7. 如何退出服务器

直接在命令行输入 `exit` 然后按 Enter 就可以退出当前 SSH 会话。

直接关闭终端窗口通常也会断开连接，但建议养成使用 `exit` 正常退出的习惯。

如果你在普通 SSH 窗口中直接运行一个长时间程序，断开 SSH 后，程序有可能一起终止。长时间运行的实验应该使用 `tmux`。相关内容请看 [tmux 和运行实验](../running-experiments/tmux-and-experiments.md)。

## 8. 常见连接错误

### `Connection timed out`

如果出现：

```text
ssh: connect to host 10.30.XXX.XXX port 22: Connection timed out
```

表示你的电脑无法连接到服务器。一般是没有连接实验室网络、当前在家里或其他校外网络、IP 地址输入错误等等。

先确认自己是否在实验室网络内。如果在校外，请看 [校外访问服务器](off-campus-access.md)。


### `Permission denied, please try again.`

如果出现：

```text
Permission denied, please try again.
```

通常表示用户名或密码不正确。如果你忘记密码，直接联系 Hirakiuchi-san 吧。

### `Could not resolve hostname`

如果出现：

```text
ssh: Could not resolve hostname ...
```

通常表示服务器地址写错了。如果使用 IP 地址，请检查是否遗漏数字或小数点。

## 9. 基本安全注意事项

请遵守以下原则：

- 不要把密码告诉其他人；
- 不要把密码公开；
- 不要在不理解命令含义时 `sudo`。虽然你无法在服务器上使用，因为 Hirakiuchi-san 并没有给你这个权限。：）

后续可以进一步配置 SSH 密钥登录。使用 SSH key 后，通常不需要每次输入服务器密码，也更适合长期使用。具体步骤请看 [SSH 私钥公钥](ssh-key-pair.md)。

## 10. 本节需要掌握的内容

完成本节后，你应该能够：

- 解释 SSH 的基本作用；
- 知道本地计算机和远程服务器的区别；
- 在 macOS 或 Windows 上打开终端；
- 使用 `ssh 用户名@服务器地址` 连接实验室服务器；
- 理解输入密码时屏幕不显示字符是正常现象；
- 判断自己是否已经成功进入 Ubuntu 服务器；
- 使用 `exit` 正常退出服务器；
- 根据常见错误信息进行基本排查。

最基本的完整操作流程如下：

```bash
ssh jie-zhang@10.30.XXX.XXX
```

输入密码并登录成功后：

```bash
whoami
hostname
pwd
ls
```

完成操作后退出：

```bash
exit
```

## 参考

- [Princeton University - Connect by SSH](https://researchcomputing.princeton.edu/support/knowledge-base/connect-ssh)
- [Florida State University - Using SSH](https://docs.rcc.fsu.edu/ssh/)
- [University of Michigan - Get Connected](https://documentation.its.umich.edu/node/5093)