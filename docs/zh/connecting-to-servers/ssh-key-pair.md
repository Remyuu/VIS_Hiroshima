# SSH 私钥和公钥

上一节介绍了如何使用用户名和密码登录实验室服务器。本节介绍另一种更推荐的登录方式：**SSH key 登录**。

使用 SSH key 后，你的电脑会保存一个私钥，服务器会保存与之对应的公钥。登录时，SSH 会用这对密钥完成身份验证。配置成功后，你通常不需要每次输入服务器密码，也更适合配合 VS Code Remote SSH、SFTP、`scp`、`rsync` 等工具使用。

整体流程：

1. 在自己的电脑上生成一对 SSH key （公钥和私钥）；
2. 把公钥放到服务器账号的 `authorized_keys` 中；
3. 用私钥从自己的电脑登录服务器。

<figure markdown="span">
  ![keep-your-password-private](../../assets/images/connecting-to-servers/image1.png){ loading=lazy, width="60%" }
  <figcaption>keep-your-password-private</figcaption>
</figure>

## 1. 私钥和公钥是什么

SSH key pair 由两个文件组成：

| 文件 | 通常位置 | 作用 |
| --- | --- | --- |
| 私钥 | `~/.ssh/id_ed25519` | 只保存在自己的电脑上，用来证明“我是这个账号的使用者”。 |
| 公钥 | `~/.ssh/id_ed25519.pub` | 放到服务器上，用来允许对应私钥登录。 |

可以把它理解成：

- **私钥** 是只属于你自己的钥匙，不能发给别人；
- **公钥** 是可以交给服务器管理员，或放进服务器账号里的“锁孔信息”；
- 服务器只需要保存公钥，不需要知道你的私钥内容。

!!! warning "不要泄露私钥"

    不要把 `id_ed25519`、`id_ed25519_vis`、`id_rsa` 这类没有 `.pub` 后缀的文件发给任何人，也不要上传到 GitHub、Notion、Google Drive 共享链接、Slack、Teams、Line 或公开文档中。

    可以分享的是带有 `.pub` 后缀的公钥文件，例如 `id_ed25519_vis.pub`。

## 2. 先检查自己是否已经有 SSH key

在本机终端中执行：

=== "macOS / Linux"

    ```bash
    ls -al ~/.ssh
    ```

=== "Windows PowerShell"

    ```powershell
    dir $env:USERPROFILE\.ssh
    ```

如果看到下面这些文件，说明你的电脑上可能已经有 SSH key：

```text
id_ed25519
id_ed25519.pub
```

或者：

```text
id_rsa
id_rsa.pub
```

其中没有 `.pub` 后缀的是私钥，有 `.pub` 后缀的是公钥。

如果你不确定这些 key 是做什么用的，建议先不要删除。为实验室服务器重新再生成一组新的 key 吧。

## 3. 生成新的 SSH key

推荐使用 Ed25519 类型的 key。它比较新，安全性和性能都很好，命令也很简洁。

在本机终端中执行：

=== "macOS / Linux"

    ```bash
    ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_vis -C "your-name@vis-hiroshima"
    ```

=== "Windows PowerShell"

    ```powershell
    ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\id_ed25519_vis" -C "your-name@vis-hiroshima"
    ```

这里的参数含义是：

| 参数 | 含义 |
| --- | --- |
| `-t ed25519` | 生成 Ed25519 类型的密钥。 |
| `-f ~/.ssh/id_ed25519_vis` | 指定生成的私钥文件位置和文件名。 |
| `-C "your-name@vis-hiroshima"` | 给 key 添加备注，方便以后识别。 |

执行后会看到类似提示：

```text
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

这里可以设置一个 passphrase，用来给私钥再加一层保护。注意，passphrase 不是服务器密码，而是保护这把私钥本身的密码。

- 如果设置 passphrase，以后使用这把私钥时可能需要输入一次 passphrase；
- 如果直接按 Enter 留空，使用起来更方便，但本机私钥文件一定要保管好；
- 如果以后忘记 passphrase，通常无法恢复，只能重新生成 key。

对于刚开始使用服务器的同学，如果还不熟悉 SSH agent，可以先留空；等工作流稳定后，再考虑给 key 设置 passphrase。

生成完成后，本机会出现两个文件：

```text
~/.ssh/id_ed25519_vis
~/.ssh/id_ed25519_vis.pub
```

第一个是私钥，第二个是公钥。

## 4. 查看并复制公钥

把公钥加入服务器之前，需要先查看公钥内容。

=== "macOS / Linux"

    ```bash
    cat ~/.ssh/id_ed25519_vis.pub
    ```

=== "Windows PowerShell"

    ```powershell
    Get-Content "$env:USERPROFILE\.ssh\id_ed25519_vis.pub"
    ```

公钥看起来类似下面这样：

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHx5dbGOMRblFApD+C2YcA2y5LL8Bm8n/OjytGGWwCcU your-name@vis-hiroshima
```

一条公钥通常只有一行，由三部分组成：

```text
密钥类型 密钥内容 备注
```

复制公钥时，要复制完整一整行。不要只复制中间的一部分，也不要额外换行。

## 5. 把公钥加入服务器

SSH key 登录能否成功，取决于服务器端是否把你的公钥加入了自己的账号。

服务器端保存公钥的位置通常是：

```text
~/.ssh/authorized_keys
```

也就是说，对服务器上的用户 `jie-zhang` 来说，文件位置通常是：

```text
/home/jie-zhang/.ssh/authorized_keys
```

在本机执行下面的命令，把公钥追加到服务器端的 `authorized_keys`。

=== "macOS / Linux"

    ```bash
    cat ~/.ssh/id_ed25519_vis.pub | ssh jie-zhang@10.30.XXX.XXX 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && cat >> ~/.ssh/authorized_keys'
    ```

=== "Windows PowerShell"

    ```powershell
    Get-Content "$env:USERPROFILE\.ssh\id_ed25519_vis.pub" | ssh jie-zhang@10.30.XXX.XXX "mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && cat >> ~/.ssh/authorized_keys"
    ```

这里的 `10.30.XXX.XXX` 需要替换成实际服务器 IP 地址，`jie-zhang` 也要替换成你自己的服务器用户名。

执行这条命令时，服务器可能会要求你输入一次服务器密码。这是正常的，因为此时 key 还没有配置完成。

命令中做了几件事：

| 命令片段 | 作用 |
| --- | --- |
| `mkdir -p ~/.ssh` | 在服务器账号下创建 `.ssh` 目录。 |
| `chmod 700 ~/.ssh` | 让 `.ssh` 目录只有自己可以访问。 |
| `touch ~/.ssh/authorized_keys` | 如果 `authorized_keys` 不存在，就创建它。 |
| `chmod 600 ~/.ssh/authorized_keys` | 让 `authorized_keys` 只有自己可以读写。 |
| `cat >> ~/.ssh/authorized_keys` | 把本机公钥追加到服务器的 `authorized_keys`。 |

!!! note "不要反复追加同一条公钥"

    重复的公钥通常不会立刻造成登录失败，但会让 `authorized_keys` 变乱。建议确认复制的是正确公钥后再执行一次即可。

    如果已经重复添加，可以登录服务器后编辑 `~/.ssh/authorized_keys`，删掉重复行，只保留一条。

## 6. 测试 SSH key 登录

公钥加入服务器后，在本机执行：

=== "macOS / Linux"

    ```bash
    ssh -i ~/.ssh/id_ed25519_vis jie-zhang@10.30.XXX.XXX
    ```

=== "Windows PowerShell"

    ```powershell
    ssh -i "$env:USERPROFILE\.ssh\id_ed25519_vis" jie-zhang@10.30.XXX.XXX
    ```

如果可以直接登录，说明 SSH key 配置成功。

如果你设置了 passphrase，终端可能会要求输入 passphrase。这不是服务器密码，而是你给私钥设置的保护密码。也可能是 `authorized_keys` 文件权限不正确，详细请看本章的第8节。

登录成功后，可以用下面的命令确认自己在服务器上：

```bash
whoami
hostname
pwd
```

## 7. 使用 SSH config 简化命令

如果每次都输入：

```bash
ssh -i ~/.ssh/id_ed25519_vis jie-zhang@10.30.XXX.XXX
```

会比较麻烦。可以在本机创建或编辑 SSH config 文件。

=== "macOS / Linux"

    ```bash
    nano ~/.ssh/config
    ```

=== "Windows PowerShell"

    ```powershell
    notepad $env:USERPROFILE\.ssh\config
    ```

加入下面的内容：

```sshconfig
Host vis-server
    HostName 10.30.XXX.XXX
    User jie-zhang
    IdentityFile ~/.ssh/id_ed25519_vis
```

保存后，就可以直接使用：

```bash
ssh vis-server
```

这个别名也可以被其他工具使用，例如：

```bash
scp local-file.txt vis-server:~/
sftp vis-server
```

VS Code Remote SSH 也会读取这个配置文件。因此，配置好 `~/.ssh/config` 后，后续连接会方便很多。

!!! tip "Windows 路径"

    Windows 的 OpenSSH 通常可以识别 `~/.ssh/id_ed25519_vis`。如果你的环境无法识别，可以把改成完整路径，例如：

    ```sshconfig
    IdentityFile C:/Users/your-name/.ssh/id_ed25519_vis
    ```

## 8. 权限设置

SSH 对权限比较敏感。如果权限太开放，它可能会拒绝使用对应文件。

本机建议权限如下：

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519_vis
chmod 644 ~/.ssh/id_ed25519_vis.pub
chmod 600 ~/.ssh/config
```

服务器端建议权限如下：

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

如果出现下面的错误：

```text
WARNING: UNPROTECTED PRIVATE KEY FILE!
```

通常表示私钥权限太开放。可以在本机执行：

```bash
chmod 600 ~/.ssh/id_ed25519_vis
```

Windows 上一般不需要手动执行 `chmod`。如果 Windows 的 OpenSSH 提示私钥权限问题，可以先确认私钥是否放在当前用户自己的 `.ssh` 目录下。

## 9. 常见问题

### `Permission denied (publickey)`

如果出现：

```text
Permission denied (publickey).
```

说明服务器没有接受你的 SSH key。着重检查服务器端 `.ssh` 和 `authorized_keys` 权限是否正确。

可以加上 `-v` 查看更详细的调试信息：

```bash
ssh -v -i ~/.ssh/id_ed25519_vis jie-zhang@10.30.XXX.XXX
```

输出内容会很多，可以重点看是否出现类似：

```text
Offering public key: ...
Server accepts key: ...
```

### 忘记 passphrase

如果忘记私钥的 passphrase，通常无法恢复。

处理方法是生成一组新的 SSH key，然后把新的公钥加入服务器的 `authorized_keys`。如果旧 key 已经不再使用，也应该从服务器端 `authorized_keys` 中删除旧公钥。

### 私钥泄露了怎么办

如果你不小心把私钥发给别人，或者上传到了公开仓库，应立即停止使用这组 key。

建议处理流程：

1. 在服务器端 `~/.ssh/authorized_keys` 中删除对应公钥；
2. 在本机删除泄露的私钥和公钥；
3. 重新生成一组新的 SSH key；
4. 把新的公钥加入服务器；
5. 如果泄露发生在 GitHub 仓库中，还需要从 Git 历史中彻底移除，并通知相关管理员。

只删除 GitHub 当前页面上的文件通常不够，因为旧版本历史中可能仍然能看到私钥。

## 10. 推荐习惯

建议遵守下面几条习惯：

- 每台自己的电脑使用一组独立的 SSH key；
- 私钥只保存在本机，不通过聊天软件、邮件或云盘分享；
- 公钥可以交给服务器管理员；
- 不再使用某台电脑时，从服务器 `authorized_keys` 删除对应公钥。

## 参考

- [The Hong Kong University - Login to HPC Cluster Without Using Password](https://hkust-hpc-docs.readthedocs.io/latest/kb/ssh/ssh-login-to-hpc-cluster-without-usi-ImiEj9.html)
- [University of California Berkeley - SSH Keys](https://statistics.berkeley.edu/computing/ssh-keys)
- [University of Arizona - System Access](https://hpcdocs.hpc.arizona.edu/registration_and_access/system_access/)
