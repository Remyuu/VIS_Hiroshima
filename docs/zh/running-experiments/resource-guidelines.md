# GPU / 硬盘 / 内存使用规范

实验室服务器是共享资源。一个人的程序不仅会占用 GPU，也会占用 CPU、内存、硬盘空间和硬盘 I/O。

本章的命令基本上都可以在 [常用 Linux 命令](../daily-remote-workflow/linux-commands.md) 中找到。

## 1. 运行前检查清单

每次启动训练或长时间任务前，先执行：

```bash
whoami
hostname
pwd
```

确认自己在哪个账号、哪台服务器、哪个目录。

查看 GPU：

```bash
nvidia-smi
```

查看当前登录用户：

```bash
who
```

查看系统内存：

```bash
free -h
```

查看当前目录大小：

```bash
du -sh .
```

查看硬盘总体使用情况：

```bash
df -h
```

**如果这些命令显示服务器已经很忙，就不要马上启动新的重任务。先确认是否会影响别人。**

## 2. GPU 使用规范

GPU 是最容易被注意到的资源，也是最容易发生冲突的资源。训练前必须先看：

```bash
nvidia-smi
```

重点看 `GPU-Util` 和 `Memory-Usage` 。

如果某张 GPU 已经有其他同学的进程，不要直接抢占。即使 `GPU-Util` 暂时是 0%，也可能只是数据加载、验证、保存 checkpoint 或等待下一轮训练。

如果服务器有多张 GPU，可以指定自己使用哪张。例如只使用 0 号 GPU：

```bash
CUDA_VISIBLE_DEVICES=0 python train.py
```

只使用 1 号 GPU：

```bash
CUDA_VISIBLE_DEVICES=1 python train.py
```

!!! warning "不要一上来就多卡"

    多 GPU 不会自动让所有程序变快。很多代码需要专门写 DataParallel、DistributedDataParallel 或其他多 GPU 逻辑。

    建议先用一张 GPU 跑通小实验，确认显存、速度和日志都正常，再考虑多 GPU。

## 3. CPU 和系统内存

GPU 训练也会占用 CPU 和系统内存。

查看内存：

```bash
free -h
```

我比较喜欢使用 `htop`：

```bash
htop
```

查看自己账号下的进程：

```bash
ps -u "$USER" -o pid,%cpu,%mem,rss,etime,cmd --sort=-%mem | head
```

![CPU ps](../../assets/images/running-experiments/image0.png){ loading=lazy }

使用 PyTorch、TensorFlow 等框架时，注意不要随便把 `num_workers` 开得很大。比如一上来设置：

```python
num_workers=32
```

可能会占用大量 CPU 和内存。建议从 `2`、`4`、`8` 开始调整，观察速度和内存占用后再改。

## 4. 硬盘空间

训练输出、checkpoint、数据集等都容易占满硬盘。硬盘写满后，轻则实验失败，重则影响其他用户。

查看文件系统总体空间：

```bash
df -h
```

查看当前目录大小：

```bash
du -sh .
```

查看当前目录下各项大小，并按大小排序：

```bash
du -sh -- ./* ./.??* 2>/dev/null | sort -hr
```

查找当前目录下大于 1GB 的文件：

```bash
find . -type f -size +1G -exec ls -lh {} \;
```

常见需要定期清理过期的 checkpoint 、临时文件等等。

不要在不确定目录的情况下使用：

```bash
rm -rf *
```

## 5. 大量小文件

大量小文件会拖慢文件系统。比如把几十万张图片、日志碎片或中间结果全部放在同一个目录里，读取、删除、备份和同步都会变慢。

更好的做法是按类别、日期或编号分目录。你会发现几乎所有大型数据集都会这样分类。

例如，不建议：

```text
outputs/
  000000.png
  000001.png
  ...
  999999.png
```

更建议：

```text
outputs/
  000/
    000000.png
    000001.png
  001/
    001000.png
    001001.png
```

## 6. 硬盘 I/O

硬盘 I/O 指读写硬盘的压力。即使 GPU 没满，如果有人在大量解压、复制、删除或读取小文件，服务器也可能变慢。

如果要做大规模压缩、解压或复制，尽量避开其他同学正在训练的时间。操作前先确认数据大小：

```bash
du -sh dataset/
```

如果只是把大量小文件从本机传到服务器，建议先打包再传输。相关方法见 [文件传输](../daily-remote-workflow/file-transfer.md)。

## 7. 实验结束后

实验结束后，不要只关掉本机电脑。建议做几件事：

查看 tmux 会话：

```bash
tmux ls
```

确认不需要的会话已经退出：

```bash
exit
```

查看自己是否还有进程：

```bash
ps -u "$USER" -o pid,%cpu,%mem,etime,cmd
```

查看 GPU 是否释放：

```bash
nvidia-smi
```

推荐重要结果传回本机或其他经过允许的长期存储位置。不要把服务器硬盘当成唯一备份。

## 8. 推荐习惯

建议养成每次训练前看 `nvidia-smi` 的习惯。并且每次启动实验前确认 `pwd`。

每个实验保存日志，不然白跑。

大量小文件分目录或打包。

重要结果不要只放在服务器上。

## 参考

* [UVA Research Computing: GPU Best Practices](https://www.rc.virginia.edu/userinfo/hpc/gpu-best-practices/)
* [Johns Hopkins ARCH: GPU Utilization](https://docs.arch.jhu.edu/en/latest/2_Common_Tasks/GPU_Computing.html)
* [Virginia Tech ARC: Acceptable Use Policy](https://www.docs.arc.vt.edu/usage/01-acceptable-use-policy.html)
* [University of Glasgow MARS: HPC Etiquette](https://mars.ice.gla.ac.uk/policies/hpc-etiquette/)
* [University of Arizona HPC: Standard Practices](https://hpcdocs.hpc.arizona.edu/policies/standard_practices/)
* [Sheffield HPC: GPU Computing](https://docs.hpc.shef.ac.uk/en/latest/parallel/GPUComputing.html)
* [TSUBAME4.0 FAQ](https://www.t4.cii.isct.ac.jp/docs/faq.ja/general/)
