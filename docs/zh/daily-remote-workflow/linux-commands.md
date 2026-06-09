---
title: What Is SSH
author: Jie-Zhang(remoooo.com)
date: 2026-06-08
last_updated: 2026-06-10
---

# 常用 Linux 命令

本节介绍研究中最常用的一些 Linux 命令，包括查看 CPU、GPU、内存、硬盘状态，基础文件操作，进程管理，压缩解压，权限管理，以及一些容易出错的地方。

下文**加粗字体**表示我自认为常用的命令。

## 1. 查看当前身份和位置

查看当前用户名

```bash
whoami
```

查看当前服务器主机名

```bash
hostname
```

查看当前所在目录

```bash
pwd
```

**查看当前目录下的文件**

```bash
ls
```

查看当前目录下每一项的大小

```bash
du -sh *
```

查看当前目录下每一项的大小（大小排序）

```bash
du -sh -- ./* ./.??* 2>/dev/null | sort -hr
```

## 2. 目录切换

进入某个目录

```bash
cd 目录名
```

返回上一级目录

```bash
cd ..
```

回到自己的 home 目录

```bash
cd ~
```

3. 文件和文件夹基础操作

创建文件夹

```bash
mkdir folder_name
```

创建空文件

```bash
touch file.txt
```

复制文件夹

```bash
cp -r source_folder target_folder
```

复制文件

```bash
cp source.txt target.txt
```

移动文件

```bash
mv old_path new_path
```

重命名文件

```bash
mv old_name.txt new_name.txt
```

删除文件

```bash
rm file.txt
```

删除文件夹

```bash
rm -r folder_name
```

强制删除文件夹

```bash
rm -rf folder_name
```

> rm -rf 非常危险 (: 
> 执行前一定要用 pwd 和 ls 确认自己在哪个目录、准备删除什么文件。

## 4. 查看文件内容

查看整个文件

```bash
cat file.txt
```

**实时查看日志文件更新**

```bash
tail -f log.txt
```

## 5. 编辑文本文件

服务器上常见的命令行文本编辑器包括 nano、vim 和 emacs 等等。如果你完全不懂，建议你直接使用VSCode。

对新手来说，推荐先使用 [nano](https://www.nano-editor.org/dist/latest/nano.html#Introduction) 。

```bash
nano file.txt
```

## 6. 查看 CPU 信息

查看 CPU 型号和核心信息

```bash
lscpu
```

查看 CPU 当前使用情况

```bash
top
```

**更加直观的 CPU 当前使用情况**

```bash
htop
```

> htop 可以看到每个 CPU 核心的使用率、内存占用和进程列表。但是不确定 Hirakiuchi-san 有没有给每一台机器安装。


## 7. 查看内存使用情况

查看内存总体情况

```bash
free -h
```
> 直接使用 htop 也可以直接看到。

## 8. 查看硬盘和目录占用

查看当前目录占用空间

```bash
du -sh .
```

## 9. 查看 GPU 使用情况

深度学习或图形计算任务通常需要使用 GPU。这个命令可以说是最重要的，在你开始训练之前，一定要确认不会抢占其他人的服务器资源。

**查看 GPU 状态最常用的命令是**

```bash
nvidia-smi
```

**如果想每隔 1 秒刷新一次**

```bash
watch -n 1 nvidia-smi
```

## 10. 查看当前登录用户

```bash
who
```

查看最近登录记录

```bash
last
```

## 11. 压缩和解压

解压 .zip 文件：

```bash
unzip file.zip
```

压缩成 .zip 文件：

```bash
zip -r archive.zip folder_name
```