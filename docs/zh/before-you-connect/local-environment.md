---
title: 配置本机环境
author: Jie-Zhang(remoooo.com)
date: 2026-06-08
last_updated: 2026-06-08
---

# 配置本机环境

一般而言，只要你的电脑能够使用 SSH ，并且处于实验室网络内，你不需要做任何额外的配置来访问 VIS Lab 的服务器。但是一个舒适的环境可以改善你的开发体验（：

本章目标：

1. 配置一个适合长期使用的终端；
2. 理解自己当前的网络环境；
3. 知道在实验室、校园 VPN 和校外网络下分别应该怎么处理。

## 1. 配置合适的终端

=== "macOS"

    虽然 macOS 自带终端 Terminal 可以直接使用，但是我个人推荐使用 [iTerms2](https://iterm2.com/) 或者是 [Ghostty](https://ghostty.org/) 。前者较为成熟，后者界面美观性能好。

    macOS 上最常用的包管理器是 [Homebrew](https://brew.sh/) 。你可以直接在终端下载：

    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    
    Homebrew 可以理解为程序员使用的应用商店。安装 Homebrew 后，可以使用 `brew` 命令安装软件。例如：

    ```bash
    brew install --cask ghostty
    brew install --cask iterm2
    ```

=== "Windows"

    在 Windows 上，自带的 Powershell 已经足够强大了，因此不在此推荐其他终端。

    Windows 上可以使用 `winget` 安装常用软件。但对于初学者而言，直接去软件官网安装下载包更为推荐。

## 2. 在实验室直接连接 Zone C 的局域网

如果你在实验室内，并且已经连接到 Zone C 的局域网，一般可以直接访问服务器的内网地址。

服务器地址通常类似 `10.30.81.XXX` 。这类 10.x.x.x 地址通常是内网地址。它们一般不能从家里、咖啡店、手机热点等普通外部网络直接访问。

测试是否能访问某台服务器： 

```bash 
ping 10.30.81.206 
```

通常会得到如下结果：

```
(base) PS C:\Users\user> ping 10.30.81.206

Pinging 10.30.81.206 with 32 bytes of data:
Reply from 10.30.81.206: bytes=32 time<1ms TTL=64
Reply from 10.30.81.206: bytes=32 time<1ms TTL=64
Reply from 10.30.81.206: bytes=32 time<1ms TTL=64
Reply from 10.30.81.206: bytes=32 time=3ms TTL=64

Ping statistics for 10.30.81.206:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 3ms, Average = 0ms
```

如果可以收到回复，说明网络层面大概率可以访问该服务器。

!!! warning "ping 不通不一定代表 SSH 不通"
    有些网络会禁止 `ping`，但仍然允许 SSH。因此 `ping` 只能作为初步检查。正式连接测试请看下一章的 [SSH 连接方法](../connecting-to-servers/ssh-keys.md)。


## 3. 通过校园网 VPN 访问服务器

一般来说，你没有办法通过校园网 VPN （`vpngw.hiroshima-u.ac.jp`） 直接 SSH 到实验室的服务器。因为学校 VPN 和实验室所在的 Zone C 默认不是一个“全校内网平面网络”。连接校园网 VPN 知识进入了 HINET 的 SSL-VPN ，即 Zone B 。若要访问某个实验室局域网，即 Zone C ，需要额外的 Zone C VPN 授权。[Information Media Center](https://help.media.hiroshima-u.ac.jp/?action=faq&cat=12&id=123&artlang=ja) 里面提到，如果你的本机 VPN 地址落在 `133.41.244.2 - 133.41.247.254` 之间，则表示你无法使用 Zone C 网络。

[VPN(SSL-VPN)サービス](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/) 里面明确提到，如果想要访问 Zone C 网络，需要你与管理员（Hirakiuchi-san）取得联系，将用户的 IMC 账户登记为该 Zone C 的 VPN 用户，然后被登记用户在 [ネットワーク利用申請サービス](https://hinet-apply.media.hiroshima-u.ac.jp/) 中选择你需要进入的 Zone C 网络。

![](https://www.media.hiroshima-u.ac.jp/wp-content/uploads/2021/04/zonec-vpn2.png)

即使你没有 VIS Lab Zone C 的权限，你也可以通过校园网 VPN 使用校内的服务器计算资源 DGX-2 。但依旧需要询问管理员（Hirakiuchi-san）获取 DGX-2 的账户。DGX2 的 SSH 登录示例：

```bash
ssh user-name@dgx2.hu-sm-ai.hiroshima-u.ac.jp
```

详细的使用手册可以查看[仲渡千宙编写的 DGX-2 手册](https://hiroshimauniv.sharepoint.com/:f:/s/Visual-teams/IgDItAZadSvkQ7sUFeK7JV3iAYh7dTPBQM_9yrcGR8eA3to?e=0zBRDM)（仅限Vis Lab成员查看）。


## 4. 在校外使用 tailscale 访问服务器（推荐）

如果你在家里、宿舍、咖啡店、出差地点，或者使用手机热点，我推荐使用 tailscale 访问学校服务器资源。

!!! warning "不要私自暴露服务器"
    不要私自把实验室服务器的 SSH 端口暴露到公网，也不要未经允许配置反向隧道或端口转发。服务器是共享资源，网络访问方式应遵守实验室和学校的安全要求。

关于本章节的内容，我放在了 [使用 Tailscale 远程连接](../connecting-to-servers/tailscale.md) 中。