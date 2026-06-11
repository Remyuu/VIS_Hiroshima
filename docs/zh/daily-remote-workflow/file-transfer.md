# 文件传输

本节介绍如何在自己的电脑和实验室服务器之间传输文件。

如果只是修改代码、配置文件、少量文本日志，可以直接用 VS Code Remote SSH。  
如果要传输数据集、模型权重、实验结果、大量图片或大型压缩包，建议使用 `scp`、`rsync`、`sftp` 等专门工具。

## 1. 先确认 SSH 可以连接

文件传输通常也是通过 SSH 完成的。因此，在传文件之前，先确认本机可以正常连接服务器：

```bash
ssh vis-server
```

如果你还没有配置 `vis-server` 这个别名，请先阅读 [SSH 私钥公钥](../connecting-to-servers/ssh-key-pair.md) 中的 `~/.ssh/config` 部分。

配置好以后，同一个别名可以同时用于：

```bash
ssh vis-server
scp local-file.txt vis-server:~/
rsync -av local-folder/ vis-server:~/local-folder/
sftp vis-server
```

## 2. 该用哪种方式

可以先按下面的表选择工具：

| 场景 | 推荐方式 |
| --- | --- |
| 传一个小文件 | `scp` |
| 传一个小文件夹 | `scp -r` 或 `rsync -av` |
| 反复同步代码或实验结果 | `rsync -av --progress` |
| 大目录、中断后继续传 | `rsync` |
| 想浏览远程目录再选择文件 | `sftp` 或图形 SFTP 客户端 |
| 大量小文件 | 先打包压缩，再传输 |
| 数据集、模型权重、大型结果 | 优先 `rsync`，不要用 VS Code 拖拽 |

简单理解：

* `scp` 最直接，适合一次性复制；
* `rsync` 最推荐，适合同步目录和继续未完成的传输；
* `sftp` 更像一个交互式文件管理器，适合边看目录边传。

!!! warning "先确认方向"

    文件传输最常见的错误不是命令写错，而是方向搞反。

    执行前先问自己：我是要从本机传到服务器，还是从服务器下载到本机？

## 3. 路径的写法

传输命令里通常会同时出现本机路径和服务器路径。

本机当前目录可以写成：

```text
./
```

服务器路径通常写成：

```text
vis-server:/home/jie-zhang/projects/
```

如果使用 home 目录，可以简写成：

```text
vis-server:~/projects/
```

其中 `vis-server:` 前面是 SSH config 中的主机别名，冒号后面是服务器上的路径。

例如：

```bash
scp result.txt vis-server:~/projects/
```

表示把本机当前目录下的 `result.txt` 复制到服务器的 `~/projects/` 目录。

Windows PowerShell 中也可以使用类似写法。本机当前目录可以写成 `.\`，完整路径可能类似：

```powershell
scp .\result.txt vis-server:~/projects/
```

## 4. 使用 scp 复制文件

`scp` 适合传一个文件或一个不大的文件夹。

### 本机传到服务器

```bash
scp local-file.txt vis-server:~/projects/
```

例子：

```bash
scp config.yaml vis-server:~/projects/my-experiment/
```

### 服务器下载到本机

```bash
scp vis-server:~/projects/my-experiment/result.txt ./
```

最后的 `./` 表示下载到本机当前目录。

### 复制文件夹

复制文件夹需要加 `-r`：

```bash
scp -r local-folder vis-server:~/projects/
```

从服务器下载文件夹：

```bash
scp -r vis-server:~/projects/my-experiment/results ./
```

`scp` 的优点是简单。缺点是如果传输中断，通常需要重新传；如果目录很大，也不方便只传变化的文件。

## 5. 使用 rsync 同步目录

`rsync` 是更推荐的日常传输工具。它会比较源目录和目标目录，只传输新增或变化的部分。对于大目录、重复同步、中断后继续传输，通常比 `scp` 更合适。

macOS 和 Linux 通常可以直接使用 `rsync`。Windows PowerShell 默认一般没有 `rsync`，可以使用 WSL、Git Bash、Cygwin，或者改用 `scp`、`sftp`、WinSCP 等工具。

### 本机同步到服务器

```bash
rsync -av --progress local-folder/ vis-server:~/projects/local-folder/
```

### 服务器同步到本机

```bash
rsync -av --progress vis-server:~/projects/my-experiment/results/ ./results/
```

常用参数含义：

| 参数 | 含义 |
| --- | --- |
| `-a` | archive 模式，递归复制并尽量保留时间、权限等信息。 |
| `-v` | 显示详细信息。 |
| `--progress` | 显示传输进度。 |
| `--partial` | 保留未完成的部分文件，方便下次继续。 |
| `--dry-run` | 预演，不真正复制或删除文件。 |

比较稳妥的写法是：

```bash
rsync -av --progress --partial local-folder/ vis-server:~/projects/local-folder/
```

### 注意末尾的斜杠

`rsync` 中源目录末尾有没有 `/` 很重要。

```bash
rsync -av local-folder/ vis-server:~/projects/local-folder/
```

表示复制 `local-folder` 里面的内容。

```bash
rsync -av local-folder vis-server:~/projects/
```

表示把整个 `local-folder` 文件夹复制到 `~/projects/` 下面。

如果不确定自己写得对不对，先加 `--dry-run`：

```bash
rsync -av --dry-run local-folder/ vis-server:~/projects/local-folder/
```

确认输出符合预期后，再去掉 `--dry-run`。

!!! danger "谨慎使用 --delete"

    `rsync --delete` 会删除目标目录中源目录没有的文件。这个参数很有用，但也很危险。

    如果方向写反，可能会把目标目录中的重要文件删掉。刚开始使用时，不建议使用 `--delete`。

## 6. 使用 sftp 交互式传输

`sftp` 适合你不太确定文件在哪，想进入一个交互式界面边看边传。

连接服务器：

```bash
sftp vis-server
```

进入后会看到：

```text
sftp>
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `pwd` | 查看服务器当前目录。 |
| `lpwd` | 查看本机当前目录。 |
| `ls` | 查看服务器目录内容。 |
| `lls` | 查看本机目录内容。 |
| `cd path` | 切换服务器目录。 |
| `lcd path` | 切换本机目录。 |
| `put file.txt` | 从本机上传文件到服务器。 |
| `get file.txt` | 从服务器下载文件到本机。 |
| `put -r folder` | 上传文件夹。 |
| `get -r folder` | 下载文件夹。 |
| `bye` | 退出。 |

例子：

```text
sftp> cd projects/my-experiment
sftp> lcd Downloads
sftp> put config.yaml
sftp> get result.txt
sftp> bye
```

## 7. 图形界面工具

如果你不想每次都写命令，也可以使用支持 SFTP 的图形工具。

常见选择：

| 系统 | 工具 |
| --- | --- |
| Windows | WinSCP、FileZilla、MobaXterm |
| macOS | Cyberduck、FileZilla |
| Linux | FileZilla |

连接时一般填写：

| 项目 | 示例 |
| --- | --- |
| 协议 | SFTP |
| 主机 | `10.30.XXX.XXX` 或 SSH config 中的主机名 |
| 用户名 | `jie-zhang` |
| 端口 | `22` |
| 私钥 | `~/.ssh/id_ed25519_vis` |

图形工具适合浏览目录和少量文件操作。但如果要同步大目录，命令行 `rsync` 通常更清晰、更可重复。

## 8. 大量小文件先打包

大量小文件传输通常会很慢，因为每个文件都需要单独处理元数据。比如几万张图片、很多日志碎片、小型缓存文件，直接传目录可能很耗时。

更推荐先在源端打包，再传一个压缩文件。

### 在服务器上打包

```bash
tar -czf results.tar.gz results/
```

下载到本机：

```bash
scp vis-server:~/projects/my-experiment/results.tar.gz ./
```

### 在本机打包后上传

```bash
tar -czf dataset-small.tar.gz dataset-small/
scp dataset-small.tar.gz vis-server:~/datasets/
```

### 解压

```bash
tar -xzf results.tar.gz
```

!!! note "压缩也会消耗资源"

    在服务器上压缩大型目录会占用 CPU 和硬盘 I/O。共享服务器上不要反复压缩特别大的目录，最好先确认目录大小，并避开其他同学正在重度使用服务器的时间。

查看目录大小：

```bash
du -sh results/
```

## 9. 排除不需要传的文件

同步项目时，很多文件其实不需要传，比如 Python 缓存、Git 目录、临时日志、模型 checkpoint、wandb 输出等。

可以用 `--exclude` 排除：

```bash
rsync -av --progress \
  --exclude ".git/" \
  --exclude "__pycache__/" \
  --exclude "*.pyc" \
  local-folder/ vis-server:~/projects/local-folder/
```

如果排除规则很多，可以写到一个文件里，例如 `rsync-exclude.txt`：

```text
.git/
__pycache__/
*.pyc
wandb/
runs/
checkpoints/
```

然后执行：

```bash
rsync -av --progress --exclude-from rsync-exclude.txt local-folder/ vis-server:~/projects/local-folder/
```

## 10. 校外传输

如果你在实验室网络内，通常可以直接连接 `10.30.XXX.XXX` 这类内网地址。

如果你在家里、宿舍、咖啡店或手机热点下，通常不能直接访问实验室服务器。需要先使用实验室允许的远程访问方式，例如经管理员同意后的 Tailscale、学校 VPN 或中继电脑。

只要 `ssh vis-server` 可以正常连接，`scp`、`rsync`、`sftp` 通常也可以用同一个 `vis-server`。

不要私自把服务器 SSH 端口暴露到公网，也不要未经允许配置反向隧道。

## 11. 传完后检查

传输完成后，建议确认文件是否真的到了目标位置。

查看文件大小：

```bash
ls -lh file.tar.gz
```

查看目录大小：

```bash
du -sh results/
```

对于很重要的大文件，可以比较 checksum。

在服务器上：

```bash
sha256sum results.tar.gz
```

在本机上：

```bash
sha256sum results.tar.gz
```

如果两边输出的 hash 一样，说明文件内容一致。

!!! note "macOS 用户"

    macOS 默认可能没有 `sha256sum`，可以使用：

    ```bash
    shasum -a 256 results.tar.gz
    ```

!!! note "Windows PowerShell 用户"

    Windows PowerShell 可以使用：

    ```powershell
    Get-FileHash .\results.tar.gz -Algorithm SHA256
    ```

## 12. 常见问题

### scp 或 rsync 提示 Permission denied

先测试普通 SSH：

```bash
ssh vis-server
```

如果 SSH 也失败，说明问题在 SSH key、用户名、服务器地址或网络连接上。先回到 SSH 章节排查。

### No such file or directory

通常是路径写错了。可以分别确认本机和服务器路径。

本机：

```bash
pwd
ls
```

服务器：

```bash
ssh vis-server
pwd
ls
```

### 传输中断

如果用 `scp` 中断，通常需要重新传。

如果是大文件或大目录，建议改用 `rsync`：

```bash
rsync -av --progress --partial local-folder/ vis-server:~/projects/local-folder/
```

再次执行同一条命令时，`rsync` 会尽量只传还没完成或变化过的部分。

### 传输速度很慢

常见原因包括：

* 网络本身较慢；
* 目录里有大量小文件；
* 服务器硬盘正在忙；
* 同时有很多人在使用服务器；
* 通过校外网络或中继访问时带宽有限。

可以尝试：

* 大量小文件先打包；
* 用 `rsync` 代替 `scp`；
* 避开服务器繁忙时间；
* 只传必要文件，排除缓存和中间结果。

### Windows 文本文件到服务器后运行报错

Windows 和 Linux 的换行符不同。有时 Windows 创建的脚本上传到 Linux 后，会出现类似：

```text
bad interpreter: No such file or directory
```

或：

```text
^M: command not found
```

可以在服务器上转换：

```bash
dos2unix script.sh
```

如果没有 `dos2unix`，也可以在 VS Code 右下角把行尾从 `CRLF` 改成 `LF` 后重新保存。

## 13. 推荐工作流

日常可以这样做：

1. 小文件临时复制：用 `scp`；
2. 项目目录同步：用 `rsync -av --progress`；
3. 大目录或反复同步：用 `rsync --partial`，必要时先 `--dry-run`；
4. 大量小文件：先 `tar` 打包，再传输；
5. 想手动浏览目录：用 `sftp` 或图形 SFTP 工具；
6. 传完后用 `ls -lh`、`du -sh` 或 checksum 检查。

比较推荐的一句话总结是：

> 小文件用 scp，目录同步用 rsync，边看边传用 sftp，大量小文件先打包。

## 参考

* [University of Sheffield HPC: Transferring files](https://docs.hpc.shef.ac.uk/en/latest/hpc/transferring-files.html)
* [Stanford Sherlock: Data transfer](https://www.sherlock.stanford.edu/docs/storage/data-transfer/)
* [UC Davis HPC: Data Transfer](https://docs.hpc.ucdavis.edu/data-transfer/)
* [Stony Brook Research Computing: File Transfer with rsync, scp, sftp](https://rci.stonybrook.edu/HPC/docs/storage/transfer-cli)
* [Princeton Research Computing: Data Transfer](https://researchcomputing.princeton.edu/support/knowledge-base/data-transfer)
* [京都大学 KUDPC: SSH によるファイル転送](https://web.kudpc.kyoto-u.ac.jp/manual/ja/login/transfer)
* [Science Tokyo TSUBAME4.0 FAQ: About file transfer](https://www.t4.cii.isct.ac.jp/docs/faq.en/general/)
