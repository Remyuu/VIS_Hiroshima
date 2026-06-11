# SSH 是什么

我们首先需要了解、使用 SSH 协议，并依靠 UNIX 命令行界面来进行操作 VIS Hiroshima 实验室的 Ubuntu 服务器。

因此，开始使用服务器前，你至少需要掌握两部分内容：

1. 如何使用 SSH 连接服务器；
2. 如何使用基本的 Linux/UNIX 命令。

## 1. SSH 的基本概念

SSH 的全称是 **Secure Shell**，是一组用于远程访问计算机的网络协议。它可以在两台计算机之间建立经过加密的安全连接。

实验室的 Ubuntu 服务器称为服务器端，SSH 负责在你的电脑和实验室服务器之间建立连接。建立连接后，你可以在自己的电脑上查看服务器中的文件、创建编辑运行代码、使用服务器端的 GPU 资源、下载实验结果等等。

虽然你是在自己的电脑上输入命令，但这些命令实际上会在远程服务器上执行。SSH 会对通信内容进行加密，包括用户名、密码、命令和传输的数据。与不加密的远程连接方式相比，SSH 更适合用于服务器管理和研究环境。

## 2. 是否需要安装 SSH 软件

根据电脑使用的操作系统，你可能需要安装 SSH 客户端，也可能可以直接使用系统预装的工具。

=== "macOS"

    苹果 Mac 电脑通常已经预装了命令行版本的 SSH 工具，不需要另外安装。我们推荐使用Ghostty或者系统自带的Terminal。

    在终端中输入：

    ```bash
    ssh
    ```

    如果屏幕上显示 SSH 的使用说明，就说明 SSH 已经可以正常使用。

=== "Windows"

    Windows 通常已经预装 OpenSSH 客户端，推荐使用PowerShell。打开 PowerShell 后，输入：

    ```powershell
    ssh
    ```

    如果显示 SSH 的命令说明，就表示 SSH 客户端已经安装完成。

    如果系统提示找不到 `ssh` 命令，可以在 Windows 的“可选功能”中确认是否已经安装 **OpenSSH Client**。

## 3. 连接服务器前需要准备什么

在连接实验室服务器之前，你需要得到 **Hirakiuchi-san 分配给你的用户名、实验室服务器的 IP 地址或主机名以及对应的账号密码**。

服务器账号通常由 Hirakiuchi-san 或服务器管理员提供。不要使用其他同学的账号，也不要把自己的账号和密码交给别人使用。

Hirakiuchi-san 会给你提供例如以下信息：

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

此时输入 Hirakiuchi-san 提供的服务器密码，然后按 Enter 键。

> **注意：输入密码时屏幕不会显示任何内容**
>
> 在输入密码时，屏幕上不会出现密码字符，这是常见的命令行输入密码的保护性设计。因此，直接正常输入密码并按 Enter 即可。
>
> 如果担心输入错误，可以按：
>
> ```text
> Ctrl + C
> ```
>
> 取消当前连接，然后重新执行 SSH 命令。

## 6. 登录成功后的画面

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

从此时开始，你输入的命令会在实验室服务器上执行，而不是在自己的电脑上执行。

例如，输入 `pwd` 可以查看当前所在目录。

输入 `ls` 可以查看当前目录中的文件。

输入 `whoami` 可以确认当前登录的用户名。

输入 `hostname` 可以查看当前服务器的主机名。

输入 `nvidia-smi` 可以查看当前的 GPU 使用情况。

## 7. 如何退出服务器

直接在命令行输入 `exit` 然后按 Enter 键就可以退出当前 SSH 会话。

直接关闭终端窗口通常也会断开连接，但建议养成使用 `exit` 正常退出的习惯。

**需要注意的是，如果你直接在普通 SSH 窗口中运行一个长时间程序，退出 SSH 后，程序有可能一起终止。长时间运行的实验应该使用 `tmux` 等任务管理系统。**

## 8. 常见连接错误

### Connection timed out

如果出现：

```text
ssh: connect to host 10.30.XXX.XXX port 22: Connection timed out
```

表示你的电脑无法连接到服务器。一般是没有连接实验室网络、当前在家里或其他校外网络、IP 地址输入错误等等。

首先确认自己的电脑是否连接到实验室网络。如果在校外，需要使用学校 VPN、Tailscale 或其他经过许可的远程访问方式。我推荐使用 Tailscale 远程访问，我会在后文介绍。

### Permission denied

如果出现：

```text
Permission denied, please try again.
```

通常表示用户名或密码不正确。如果你忘记密码，直接联系 Hirakiuchi-san 吧。

### Could not resolve hostname

如果出现：

```text
ssh: Could not resolve hostname ...
```

通常表示服务器地址写错了。如果使用 IP 地址，请检查是否遗漏数字或小数点。

## 9. 基本安全注意事项

服务器账号代表你本人在服务器上的身份。所有通过该账号进行的操作都可能被记录，因此需要妥善保管。

请遵守以下原则：

* 不要把密码告诉其他人；
* 不要把密码保存在公开文档中；
* 不要在不理解命令含义时使用 `sudo` 。虽然你无法在服务器上使用，因为 Hirakiuchi-san 并没有给你这个权限。

后续可以进一步配置 SSH 密钥登录。使用 SSH key 后，不需要每次输入服务器密码，并且通常比只使用密码更加安全，我也会在后文介绍。

## 10. 本节需要掌握的内容

完成本节后，你应该能够：

* 解释 SSH 的基本作用；
* 知道本地计算机和远程服务器的区别；
* 在 macOS 或 Windows 上打开终端；
* 使用下面的命令连接实验室服务器：

```bash
ssh 用户名@服务器地址
```

* 理解输入密码时屏幕不显示字符是正常现象；
* 判断自己是否已经成功进入 Ubuntu 服务器；
* 使用 `exit` 正常退出服务器；
* 根据常见错误信息进行基本排查。

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
