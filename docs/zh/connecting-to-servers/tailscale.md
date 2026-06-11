# 使用 Tailscale 远程连接

> https://tailscale.com/

!!! warning " ⚠️ 不要私自暴露服务器"
    不要私自把实验室服务器的 SSH 端口暴露到公网，也不要未经允许配置反向隧道或端口转发。服务器是共享资源，网络访问方式应遵守实验室和学校的安全要求。

    不要私自把实验室服务器的 SSH 端口暴露到公网，也不要未经允许配置反向隧道或端口转发。服务器是共享资源，网络访问方式应遵守实验室和学校的安全要求。

    不要私自把实验室服务器的 SSH 端口暴露到公网，也不要未经允许配置反向隧道或端口转发。服务器是共享资源，网络访问方式应遵守实验室和学校的安全要求。

如果你在实验室或学校网络内，通常可以直接通过 SSH 连接服务器。

但是，如果你在家里、宿舍、咖啡店或其他校外网络中，可能无法直接访问实验室服务器。

Tailscale 可以用于在校外安全地访问实验室允许访问的服务器资源。你可以把它理解为一个虚拟专用网络：你的电脑和实验室服务器加入同一个 Tailscale 网络后，即使你不在实验室，也可以像在一个内部网络中一样访问服务器。

但是需要注意，实验室服务器目前还没有统一管理的 tailnet ，我们不能直接在服务器上部署 tailscale 。

我们需要额外一台位于学校实验室的电脑作为中继跳板，结构如下：

```text
电脑A：在校外、咖啡店或其他校外网络中
    ↓ Tailscale
电脑B：Zone C 位于学校实验室的中继电脑
    ↓ 实验室统一管理的 Subnet Router
实验室服务器：10.30.81.XXX
```

> 注：Tailscale 官方安装页覆盖 Linux、macOS、Windows、iOS、Android、Apple TV、Chromebook 等平台。

本文只会讲解电脑A与电脑B之间如何使用 Tailscale 连接。当然，你也可以使用如 [RustDesk](https://rustdesk.com/)、[AnyDesk](https://anydesk.com/) 等远程操控软件实现类似的效果。一个更常见的方案是 Tailscale 和 RustDesk 结合一起用。

Tailscale 可以让多台设备像在同一个内网，安全访问 NAS、SSH、RDP、数据库、Web 服务等。比远程桌面软件更稳定，更适合用来访问 SSH 。

**我们需要在电脑A与电脑B都安装 Tailscale 。这样就可以在家用 SSH 访问位于实验室（Zone C）的电脑B，再使用电脑B的终端去连接实验室服务器。**

> 底层逻辑是，Tailscale 用同一个账号或同一个组织 SSO 登录。登录后设备会进同一个 tailnet。

## 安装 Tailscale

=== "macOS"

    macOS 用户推荐安装 Tailscale 官方 Standalone 版本。

    通过 Homebrew 安装： 
    
    ```bash
    brew install --cask tailscale 
    ```

    首次启动时，系统可能要求添加 VPN 配置，请选择允许。

=== "Windows"

    从 Tailscale 官网下载安装 Windows 客户端。
    安装完成后，系统托盘会出现 Tailscale 图标。

=== "Linux"

    在 Ubuntu、Debian、CentOS、Fedora、Rocky Linux、Raspberry Pi OS 等系统上，可以使用官方安装脚本：

    ```bash
    curl -fsSL https://tailscale.com/install.sh | sh
    sudo tailscale up
    ```

    命令会输出一个登录链接。打开链接并完成认证后，服务器会加入 tailnet。


## 连接

连接方式优先用设备名，例如 ssh user@hostname，不行就用 tailscale ip 查到的 100.x.y.z 地址。和上一章的步骤一致。