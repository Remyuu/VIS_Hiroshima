# tmux 和运行实验

本节介绍如何用 `tmux` 在服务器上运行长时间实验。

`tmux` 的作用不是让程序变快，而是让服务器上的终端会话不依赖你的 SSH 窗口。即使网络断开、笔记本睡眠、VS Code Remote SSH 断开，tmux 里的程序仍然可以继续运行。之后你重新登录服务器，就可以回到同一个会话。

## 1. 为什么需要 tmux

如果你直接在普通 SSH 终端里运行：

```bash
python train.py
```

一旦 SSH 断开或终端窗口关闭，程序可能会跟着结束。对于训练模型、长时间预处理、下载数据、解压文件等任务，如果中断就会浪费几个小时甚至几天。

使用 `tmux` 后，程序运行在服务器端的 tmux 会话里。你可以先离开，之后再回来查看。

## 2. 运行前先检查

进入服务器后，不要立刻启动训练。先确认自己在哪台机器、哪个目录：

```bash
whoami
hostname
pwd
```

查看 GPU：

```bash
nvidia-smi
```

查看当前登录用户：

```bash
who
```

查看当前目录占用：

```bash
du -sh .
```

这几个检查是标准流程，可以避免很多常见的事故：连错服务器、抢占别人 GPU、把输出写进错误目录或已经很满的目录。

## 3. 最小 tmux 命令

先检查服务器是否安装了 `tmux`：

```bash
tmux -V
```

> 相信网络管理员，他肯定会提前安装好的 ：）

创建一个名为 `exp1` 的会话：

```bash
tmux new -s exp1
```

进入 tmux 后，底部通常会出现状态栏。此时就可以运行实验：

```bash
python train.py
```

暂时离开 tmux，但让程序继续运行：

```text
Ctrl + B，然后按 D
```

注意：不是同时按三个键。先按 `Ctrl + B`，松开后再按 `D`。

查看已有 tmux 会话：

```bash
tmux ls
```

重新进入会话：

```bash
tmux attach -t exp1
```

实验结束后，在 tmux 里输入：

```bash
exit
```

即可关闭不再需要的会话。

## 4. 推荐的实验启动方式

不建议只运行：

```bash
python train.py
```

这样虽然能跑，但之后不方便回看日志。更推荐每次实验都保存输出。

先创建日志目录：

```bash
mkdir -p logs
```

如果需要 conda 环境，先激活：

```bash
conda activate your-env-name
```

运行实验并保存日志：

```bash
python train.py 2>&1 | tee logs/exp1.log
```

如果同一个实验会跑多次，可以把时间写进日志名：

```bash
python train.py 2>&1 | tee "logs/exp1_$(date +%Y%m%d_%H%M%S).log"
```

`tee` 的作用是：终端里能看到输出，同时也把输出写进日志文件。

## 5. 查看实验运行状态

重新登录服务器后，先看 tmux 会话：

```bash
tmux ls
```

进入会话：

```bash
tmux attach -t exp1
```

如果只想看日志：

```bash
tail -f logs/exp1.log
```

查看自己的进程：

```bash
ps -u "$USER" -o pid,ppid,etime,cmd
```

## 6. 停止实验

最推荐的停止方式是回到 tmux 会话，然后按：

```text
Ctrl + C
```

如果程序没有响应，可以查自己的进程：

```bash
ps -u "$USER" -o pid,ppid,cmd | grep python
```

找到对应 PID 后，先尝试：

```bash
kill PID
```

例如：

```bash
kill 123456
```

如果仍然无法停止，最后再考虑：

```bash
kill -9 PID
```

!!! warning "不要乱 kill"

    只停止自己的进程。`kill -9` 是强制终止，程序可能来不及保存 checkpoint、日志或临时文件。优先使用 `Ctrl + C` 或普通 `kill`。

## 7. 多实验命名规范

如果同时有多个实验，建议给 tmux 会话起清楚的名字：

```bash
tmux new -s mnist_lr1e-3
tmux new -s nerf_room1
tmux new -s preprocess_data
```

查看会话：

```bash
tmux ls
```

进入指定会话：

```bash
tmux attach -t nerf_room1
```

不要全部叫 `test`、`exp`、`new`。过几天之后你会忘记它们分别在跑什么。

## 8. nohup 可以用吗

`nohup` 也可以让程序在退出终端后继续运行，例如：

```bash
nohup python train.py > logs/exp1.log 2>&1 &
```

和 `tmux` 不同之处在于，它不能回到原来的终端界面。比较适合那种“跑完就行”的命令。

但对新手来说，`tmux` 更直观：你可以回到原来的终端会话，继续看输出和操作。建议刚开始优先使用 `tmux`，等你明确知道自己需要什么时，再考虑 `nohup`。

## 参考

* [Yale Center for Research Computing: tmux](https://docs.ycrc.yale.edu/clusters-at-yale/guides/tmux/)
* [USC Center for Advanced Research Computing: Using Tmux](https://www.carc.usc.edu/user-guides/hpc-systems/software/tmux)
* [University of Utah CHPC: tmux](https://www.chpc.utah.edu/documentation/software/tmux.php)
* [UC Davis HPC: Accessing Clusters](https://docs.hpc.ucdavis.edu/general/access/)
* [Northern Arizona University ARC: Terminal Multiplexers](https://in.nau.edu/arc/terminal-multiplexers/)
* [University of Florida RC: Persistent Sessions](https://docs.rc.ufl.edu/access/persistent_sessions/)
* [京都産業大学: DGX A100 利用ガイド](https://www.cse.kyoto-su.ac.jp/~oomoto/lecture/program/tips/HPC/)
