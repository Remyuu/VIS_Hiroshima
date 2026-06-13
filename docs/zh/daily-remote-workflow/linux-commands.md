# 常用 Linux 命令

本节整理在 VIS Lab 服务器上最常用的一些 Linux 命令。

<figure markdown="span">
  ![sudo rm -rf /](../../assets/images/daily-remote-workflow/gif0.gif){ loading=lazy }
  <figcaption>sudo rm -rf</figcaption>
</figure>

## 1. 确认当前所在位置

刚登录服务器时，建议先确认当前身份、服务器和目录。

| 命令 | 作用 |
| --- | --- |
| `whoami` | 登录用户名。 |
| `hostname` | 服务器主机名。 |
| `pwd` | 所在目录。 |
| `ls` | 目录下的文件。 |
| `ls -lh` | 文件大小。 |
| `ls -la` | 同时显示隐藏文件。 |
| `history` | 最近执行过的命令。 |

常见的登录后确认流程：

```bash
whoami
hostname
pwd
ls -lh
```

## 2. 切换目录

| 命令 | 作用 |
| --- | --- |
| `cd folder_name` | 进入某个目录。 |
| `cd ..` | 返回上一级目录。 |
| `cd ~` | 回到自己的 home 目录。 |
| `cd -` | 回到上一次所在的目录。 |
| `cd /absolute/path` | 进入某个绝对路径。 |

路径中如果有空格，需要用引号包起来：

```bash
cd "folder with spaces"
```

## 3. 文件和文件夹基础操作

| 命令 | 作用 |
| --- | --- |
| `mkdir folder_name` | 创建文件夹。 |
| `mkdir -p path/to/folder` | 创建多级文件夹；中间目录不存在时会一起创建。 |
| `touch file.txt` | 创建空文件，或更新文件时间戳。 |
| `cp source.txt target.txt` | 复制文件。 |
| `cp -r source_folder target_folder` | 复制文件夹。 |
| `mv old_path new_path` | 移动文件或文件夹。 |
| `mv old_name.txt new_name.txt` | 重命名文件。 |
| `rm file.txt` | 删除文件。 |
| `rm -r folder_name` | 删除文件夹。 |

!!! danger "`rm` 删除后通常不能恢复"

    `rm` 不会把文件移动到回收站。执行前至少先运行：

    ```bash
    pwd
    ls -lh
    ```

    确认自己在哪个目录、准备删除什么文件。

    特别小心下面这类命令：

    ```bash
    rm -rf folder_name
    rm -rf *
    ```

    在共享服务器上，不要在自己不理解路径含义时运行 `rm -rf`，也不要对别人的目录执行删除操作。

    <figure markdown="span">
        ![sudo rm -rf /](../../assets/images/daily-remote-workflow/image6.png){ loading=lazy }
        <figcaption>linux-directory-structure</figcaption>
    </figure>

## 4. 查看文件内容

| 命令 | 作用 |
| --- | --- |
| `cat file.txt` | 一次性输出整个文件，适合小文件。 |
| `less file.txt` | 分页查看文件，适合大文件；按 `q` 退出。 |
| `head file.txt` | 查看文件开头。 |
| `head -n 20 file.txt` | 查看文件前 20 行。 |
| `tail file.txt` | 查看文件末尾。 |
| `tail -n 50 file.txt` | 查看文件最后 50 行。 |
| `tail -f log.txt` | 实时查看日志更新。 |

训练模型时最常用的是查看日志：

```bash
tail -f train.log
```

退出 `tail -f` 时按 `Ctrl + C`。

## 5. 搜索文件和文本

查找当前目录下的 Python 文件：

```bash
find . -name "*.py"
```

查找文件名中包含 `config` 的文件：

```bash
find . -iname "*config*"
```

在当前目录下搜索文本：

```bash
grep -R "learning_rate" .
```

只在 Python 文件中搜索：

```bash
grep -R "learning_rate" --include="*.py" .
```

如果服务器安装了 `rg`，也可以使用 ripgrep，速度通常更快：

```bash
rg "learning_rate"
```

## 6. 编辑文本文件

服务器上常见的命令行文本编辑器包括 `nano`、`vim` 和 `emacs`。如果你完全不熟悉终端编辑器，建议优先使用 VS Code Remote SSH。

对新手来说，命令行里最容易上手的是 `nano`：

```bash
nano file.txt
```

在 `nano` 中：

| 操作 | 快捷键 |
| --- | --- |
| 保存 | `Ctrl + O`，然后按 Enter |
| 退出 | `Ctrl + X` |
| 取消当前操作 | `Ctrl + C` |

## 7. 查看硬盘和目录占用

查看服务器磁盘分区使用情况：

```bash
df -h
```

查看当前目录占用空间：

```bash
du -sh .
```

查看当前目录下每一项的大小：

```bash
du -sh *
```

按大小排序查看当前目录内容：

```bash
du -sh -- ./* ./.??* 2>/dev/null | sort -hr
```


## 8. 查看 CPU、内存和进程

| 命令 | 作用 |
| --- | --- |
| `lscpu` | 查看 CPU 型号和核心信息。 |
| `top` | 查看当前 CPU、内存和进程使用情况。 |
| `htop` | 更直观地查看 CPU、内存和进程；不一定每台服务器都已安装。 |
| `free -h` | 查看内存总体使用情况。 |
| `ps -u $USER` | 查看自己当前运行的进程。 |
| `ps aux` | 查看系统中的进程列表。 |

按进程名查找：

```bash
ps aux | grep python
```

查看某个进程的详细信息：

```bash
ps -fp PID
```

这里的 `PID` 需要替换成实际进程号。

终止自己启动的进程：

```bash
kill PID
```

如果普通 `kill` 无效，可以在确认进程确实属于自己且需要停止后使用：

```bash
kill -9 PID
```


## 9. 查看 GPU 使用情况

深度学习或图形计算任务通常需要使用 GPU。开始训练前，先确认 GPU 是否空闲，避免抢占其他人的资源。

查看 GPU 状态：

```bash
nvidia-smi
```

每隔 1 秒刷新一次：

```bash
watch -n 1 nvidia-smi
```

更多共享 GPU 使用规则请看 [GPU / 硬盘 / 内存使用规范](../running-experiments/resource-guidelines.md)。

## 10. 查看当前登录用户

| 命令 | 作用 |
| --- | --- |
| `who` | 查看当前登录到服务器的用户。 |
| `w` | 查看当前登录用户和他们正在运行的命令。 |
| `last` | 查看最近登录记录。 |

这些命令用于判断当前服务器是否有其他人在使用。

## 11. 压缩和解压

解压 `.zip` 文件：

```bash
unzip file.zip
```

压缩成 `.zip` 文件：

```bash
zip -r archive.zip folder_name
```

解压 `.tar.gz` 文件：

```bash
tar -xzf archive.tar.gz
```

压缩成 `.tar.gz` 文件：

```bash
tar -czf archive.tar.gz folder_name
```

查看 `.tar.gz` 文件中包含什么：

```bash
tar -tzf archive.tar.gz | head
```

## 12. 权限相关命令

查看文件权限：

```bash
ls -l file.txt
```

给脚本增加可执行权限：

```bash
chmod +x run.sh
```

修复 SSH 私钥权限：

```bash
chmod 600 ~/.ssh/id_ed25519_vis
```

修复 `.ssh` 目录和 `authorized_keys` 权限：

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

!!! warning "不要随意使用 `chmod -R 777`"

    `chmod -R 777` 会让目录下的文件对所有用户可读、可写、可执行。共享服务器上通常不应该这样做。如果遇到权限问题，先确认文件属于谁、当前目录在哪里、真正需要开放哪些权限。

## 13. 命令行常用技巧

| 命令或符号 | 作用 |
| --- | --- |
| `Ctrl + C` | 中断当前正在前台运行的命令。 |
| `Ctrl + L` | 清屏。 |
| `Tab` | 自动补全命令或路径。 |
| `↑` / `↓` | 查看上一条或下一条命令。 |
| `command > out.txt` | 把输出写入文件，覆盖原内容。 |
| `command >> out.txt` | 把输出追加到文件末尾。 |
| `command 2> err.txt` | 把错误信息写入文件。 |
| `command --help` | 查看命令帮助。 |
| `man command` | 查看命令手册；按 `q` 退出。 |

把训练输出同时显示在屏幕上并写入日志：

```bash
python train.py 2>&1 | tee train.log
```

如果想追加到已有日志：

```bash
python train.py 2>&1 | tee -a train.log
```

## 参考

- [The University of Sheffield - Quick Reference (Cheat Sheets)](https://docs.hpc.shef.ac.uk/en/latest/cheatsheets/index.html)
- [Abhishek Prakash - Linux Jargon Buster](https://itsfoss.com/sudo-rm-rf/)
- [University of Wisconsin - Basic shell commands](https://chtc.cs.wisc.edu/uw-research-computing/basic-shell-commands)
- [Abhishek Prakash - Linux Directory Structure Explained for Beginners](https://linuxhandbook.com/linux-directory-structure)