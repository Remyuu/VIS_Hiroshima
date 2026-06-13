# Off-campus Access

If you are in the lab and already connected to the lab's Zone C network, you can usually connect to the servers directly through SSH.

If you are at home, at a cafe, or using a mobile hotspot, you usually cannot access lab servers directly. VIS Lab servers are shared inside the lab, so off-campus access must follow both university and lab security rules.

!!! warning "Use only approved access methods"

    When connecting to lab servers from off campus, use only connection methods approved by the university or the lab. Do not set up third-party networking tools, remote-control tools, reverse tunnels, port forwarding, or other methods that bypass normal network management.

    Hiroshima University restricts P2P communication. For details, see [Hiroshima University - P2P communication restrictions](https://www.media.hiroshima-u.ac.jp/services/secuinfo/disable_port/) (campus network only).

## 1. Check Your Current Network First

VIS Lab server addresses usually look like `10.30.XXX.XXX`. These are private network addresses. They can only be accessed from the lab network or an authorized Zone C VPN environment, not directly from a normal off-campus network.

You can roughly check your situation like this:

| Current environment | Can SSH to VIS Server? | Next step |
| --- | --- | --- |
| Zone C Wi-Fi network inside the lab | :white_check_mark: | Follow [SSH and Server Login](ssh-keys.md) directly. |
| VIS Lab Zone C VPN authorized and the correct Zone C selected | :white_check_mark: | SSH to the server's internal IP address. |
| Connected to normal Hiroshima University SSL-VPN | :interrobang: | Normal VPN does not mean you are inside VIS Lab Zone C. |
| Off-campus network, such as home, cafe, or mobile hotspot | :x: | First confirm whether you have a university- or lab-approved access path. |

## 2. Normal University VPN vs. Zone C VPN

Hiroshima University's VPN service lets you connect to the campus network from off campus. The VPN server hostname is usually:

```text
vpngw.hiroshima-u.ac.jp
```

You log in with your IMC account and Hiroshima University password.

However, **connecting to the university VPN does not necessarily mean you can access VIS Lab's Zone C servers**. According to Hiroshima University's Information Media Center, SSL-VPN communication to Zone C is an optional feature. Users can communicate with devices in a specific Zone C only after both the Zone administrator and the VPN user finish the required settings.

The Hiroshima University FAQ says that if the IPv4 address you see after connecting to VPN is in the range `133.41.244.2 - 133.41.247.254`, it usually means you are using the normal VPN, not the Zone C VPN feature. When using Zone C VPN, the source address becomes the external IP address assigned to that Zone C.

!!! note "Zone C VPN still needs a specific server IP"

    Even if Zone C VPN is enabled, the network assigned to the VPN client is not the same as the server's `10.30.XXX.XXX` internal network itself. When connecting to a server, you still need to use the server IP address or hostname explicitly.

## 3. Recommended Flow for Off-campus Access

When accessing lab servers from off campus, I recommend this order:

1. First confirm that you really need VIS Lab servers, not DGX-2 or another campus computing resource.
2. Contact Hirakiuchi-san and explain that you need access to VIS Lab Zone C.
3. After you are registered, log in to [Hiroshima University's Network Application Service](https://hinet-apply.media.hiroshima-u.ac.jp) (campus network only) and select the Zone C you need.
4. After connecting to the VPN, use the normal SSH workflow to connect to the server.

The SSH command is still:

```bash
ssh username@server-address
```

For example:

```bash
ssh jie-zhang@10.30.XXX.XXX
```

If you already set up SSH config, you can also use:

```bash
ssh vis-server
```

## 4. What to Check When Connection Fails

If off-campus connection fails, first look at the error message.

### `Connection timed out`

This usually means there is no network path from your computer to the server. Common reasons include:

- You are connected only to normal SSL-VPN, without VIS Lab Zone C permission;
- You did not select the correct Zone C in the VPN settings.

### `Permission denied`

This means you can already reach the server, but authentication failed. Go back to these two pages and check:

- [SSH and Server Login](ssh-keys.md)
- [SSH Public and Private Keys](ssh-key-pair.md)

## 5. After You Have an Approved Access Path

Once the network path is confirmed, you should still use the normal SSH workflow:

- Configure `~/.ssh/config` on your own computer;
- Use SSH key login;
- Edit code with VS Code Remote SSH;
- Run long tasks inside `tmux`;
- Transfer large files with `scp`, `rsync`, or a graphical SFTP tool.

Related pages:

- [SSH and Server Login](ssh-keys.md)
- [SSH Public and Private Keys](ssh-key-pair.md)
- [VS Code Remote SSH](../daily-remote-workflow/vscode-remote-ssh.md)
- [File Transfer](../daily-remote-workflow/file-transfer.md)
- [tmux and Running Experiments](../running-experiments/tmux-and-experiments.md)

## 6. What to Prepare Before Contacting the Administrator

If you need Hirakiuchi-san or another lab member to help debug the problem, please prepare:

- Your current location or network environment: lab, off campus, normal VPN, or Zone C VPN;
- The server name or IP address you want to connect to;
- The full command you ran;
- The full error message shown in the terminal;
- Your operating system: macOS, Windows, or Linux;
- Whether normal SSH login works, or only VS Code Remote SSH fails.

Do not send your server password or SSH private key.

## References

- [Hiroshima University - VPN (SSL-VPN) Service](https://www.media.hiroshima-u.ac.jp/services/hinet/vpngw/)
- [Hiroshima University - How can I check whether I am connected to VPN?](https://help.media.hiroshima-u.ac.jp/?action=faq&cat=12&id=123&artlang=ja)
- [Hiroshima University - Campus Network Application for Individual Administrators](https://www.media.hiroshima-u.ac.jp/services/hinet/hinetapply-person/)
- [Hiroshima University - Network Application Service](https://hinet-apply.media.hiroshima-u.ac.jp/) (campus network only)
