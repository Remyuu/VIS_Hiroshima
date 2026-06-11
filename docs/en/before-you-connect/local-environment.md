# Local Environment

This page is a placeholder. Content will be added later.

Generally speaking, as long as your computer can use SSH and is connected to the laboratory network, you do not need to perform any additional configuration to access the VIS Lab servers. However, a comfortable environment can improve your development experience (:

Goal of this chapter:

1. Configure a terminal suitable for long-term use;
2. Understand your current network environment;
3. Know what to do when you are in the laboratory, connected through the university VPN, or using an off-campus network.

## 1. Configure a Suitable Terminal

=== "macOS"

    Although the built-in Terminal on macOS can be used directly, I personally recommend [iTerm2](https://iterm2.com/) or [Ghostty](https://ghostty.org/). The former is more mature, while the latter has a visually appealing interface and good performance. 
    
    The most commonly used package manager on macOS is [Homebrew](https://brew.sh/). You can install it directly from the terminal: 
    
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 
    ```
    
    Homebrew can be understood as an app store for programmers. After installing Homebrew, you can use the `brew` command to install software. For example: 
    
    ```bash
    brew install --cask ghostty
    brew install --cask iterm2
    ```

=== "Windows"

    On Windows, the built-in PowerShell is already powerful enough, so no other terminal is recommended here.

    You can use `winget` to install commonly used software on Windows. However, for beginners, it is more advisable to download and install the software package directly from the software’s official website.

## 2. Connect Directly to the Zone C Local Network in the Laboratory

If you are in the laboratory and are already connected to the Zone C local network, you can generally access the servers directly through the internal IP addresses.

Server addresses are usually similar to `10.30.81.XXX`. Addresses in the `10.x.x.x` range are generally private network addresses. They normally cannot be accessed directly from ordinary external networks, such as your home network, a café network, or a mobile hotspot.

To test whether a server is accessible:

```bash 
ping 10.30.XXX.XXX 
```

通常会得到如下结果：

```text
(base) PS C:\Users\user> ping 10.30.XXX.XXX

Pinging 10.30.XXX.XXX with 32 bytes of data:
Reply from 10.30.XXX.XXX: bytes=32 time<1ms TTL=64
Reply from 10.30.XXX.XXX: bytes=32 time<1ms TTL=64
Reply from 10.30.XXX.XXX: bytes=32 time<1ms TTL=64
Reply from 10.30.XXX.XXX: bytes=32 time=3ms TTL=64

Ping statistics for 10.30.XXX.XXX:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 3ms, Average = 0ms
```

If you receive replies, the server is most likely accessible.

!!! warning "A failed ping does not necessarily mean that SSH is unavailable"
    Some networks block `ping` while still allowing SSH connections. Therefore, `ping` should only be used as a preliminary check. For the actual connection test, see [Connect to Servers](../connecting-to-servers/ssh-keys.md) in the next chapter。

## 3. Access Servers Through the University VPN

Generally speaking, you cannot directly SSH into a laboratory server through the campus VPN (`vpngw.hiroshima-u.ac.jp`). This is because the university VPN and the laboratory's Zone C are not part of the same campus-wide internal network by default. Connecting to the campus VPN only places you inside HINET's SSL-VPN, namely Zone B. To access a laboratory LAN (Zone C), additional Zone C VPN authorization is required. The Information Media Center states that if your local VPN address falls within `133.41.244.2 - 133.41.247.254`, you cannot use the Zone C network.

The [VPN(SSL-VPN)サービス](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/) explicitly states that if you want to access a Zone C network, you must contact the administrator (Hirakiuchi-san) and have your IMC account registered as a VPN user for that Zone C. After registration, you can select the Zone C network you need to access through the [ネットワーク利用申請サービス](https://hinet-apply.media.hiroshima-u.ac.jp/).

![](https://www.media.hiroshima-u.ac.jp/wp-content/uploads/2021/04/zonec-vpn2.png)

Even if you do not have permission for the VIS Lab Zone C network, you can still use the campus VPN to access the university's DGX-2 computing resources. However, you must still contact the administrator (Hirakiuchi-san) to obtain a DGX-2 account. Example SSH login:

```bash
ssh user-name@dgx2.hu-sm-ai.hiroshima-u.ac.jp
```

For detailed instructions, refer to the DGX-2 manual written by [DGX-2 manual written by Chihiro Nakawatari](https://hiroshimauniv.sharepoint.com/:f:/s/Visual-teams/IgDItAZadSvkQ7sUFeK7JV3iAYh7dTPBQM_9yrcGR8eA3to?e=0zBRDM)（available only to VIS Lab members）。


## 4. Accessing servers from off campus using Tailscale

If you are at home, in a café, on a business trip, or using a mobile hotspot, you may access university server resources through Tailscale **with the approval of the administrator or professor**.

!!! warning "Do not expose servers without authorization"
    Do not expose laboratory server SSH ports to the public Internet on your own, and do not configure reverse tunnels or port forwarding without permission. The servers are shared resources, and network access methods must comply with laboratory and university security requirements.
    Do not expose laboratory server SSH ports to the public Internet on your own, and do not configure reverse tunnels or port forwarding without permission. The servers are shared resources, and network access methods must comply with laboratory and university security requirements.
    Do not expose laboratory server SSH ports to the public Internet on your own, and do not configure reverse tunnels or port forwarding without permission. The servers are shared resources, and network access methods must comply with laboratory and university security requirements.

The contents of this section are covered in the document [Tailscale Remote Access](../connecting-to-servers/tailscale.md) .