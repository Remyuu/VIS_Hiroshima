# tmux and Running Experiments

This page explains how to use `tmux` to run long experiments on the server.

`tmux` does not make your program faster. Its job is to keep the terminal session on the server independent from your SSH window. Even if the network disconnects, your laptop sleeps, or VS Code Remote SSH drops, programs inside tmux can keep running. Later, you can log in again and return to the same session.

## 1. Why You Need tmux

If you run this directly in a normal SSH terminal:

```bash
python train.py
```

then once SSH disconnects or the terminal window closes, the program may stop too. For model training, long preprocessing, data downloads, file extraction, and similar tasks, an interruption can waste hours or even days.

With `tmux`, the program runs inside a tmux session on the server. You can leave first, then come back later to check it.

## 2. Check Before Running

After entering the server, do not start training immediately. First confirm which machine and directory you are in:

```bash
whoami
hostname
pwd
```

Check GPU:

```bash
nvidia-smi
```

Check logged-in users:

```bash
who
```

Check current directory size:

```bash
du -sh .
```

These checks are a standard routine. They help avoid many common mistakes: connecting to the wrong server, taking someone else's GPU, writing output into the wrong directory, or writing into a directory that is already too full.

## 3. Minimal tmux Commands

First check whether `tmux` is installed:

```bash
tmux -V
```

> Trust the network administrator. It is probably already installed :)

Create a session named `exp1`:

```bash
tmux new -s exp1
```

After entering tmux, you will usually see a status bar at the bottom. Now you can run your experiment:

```bash
python train.py
```

Detach from tmux for now, while letting the program keep running:

```text
Ctrl + B, then press D
```

Note: do not press all three keys at the same time. Press `Ctrl + B` first, release it, then press `D`.

List existing tmux sessions:

```bash
tmux ls
```

Return to the session:

```bash
tmux attach -t exp1
```

After the experiment is finished, type this inside tmux:

```bash
exit
```

This closes the session when you no longer need it.

## 4. Recommended Way to Start an Experiment

I do not recommend only running:

```bash
python train.py
```

It works, but it is inconvenient to check the log later. It is better to save output for every experiment.

Create a log directory first:

```bash
mkdir -p logs
```

If you need a conda environment, activate it first:

```bash
conda activate your-env-name
```

Run the experiment and save the log:

```bash
python train.py 2>&1 | tee logs/exp1.log
```

If the same experiment may run multiple times, put the time in the log name:

```bash
python train.py 2>&1 | tee "logs/exp1_$(date +%Y%m%d_%H%M%S).log"
```

`tee` lets you see output in the terminal while also writing it into a log file.

## 5. Check Experiment Status

After logging back in to the server, first check tmux sessions:

```bash
tmux ls
```

Enter the session:

```bash
tmux attach -t exp1
```

If you only want to watch the log:

```bash
tail -f logs/exp1.log
```

Check your own processes:

```bash
ps -u "$USER" -o pid,ppid,etime,cmd
```

## 6. Stop an Experiment

The recommended way is to return to the tmux session, then press:

```text
Ctrl + C
```

If the program does not respond, check your own processes:

```bash
ps -u "$USER" -o pid,ppid,cmd | grep python
```

After finding the matching PID, first try:

```bash
kill PID
```

For example:

```bash
kill 123456
```

If it still cannot stop, only then consider:

```bash
kill -9 PID
```

!!! warning "Do not kill randomly"

    Only stop your own processes. `kill -9` forcefully terminates a program, so it may not have time to save checkpoints, logs, or temporary files. Prefer `Ctrl + C` or normal `kill`.

## 7. Naming Multiple Experiments

If you run several experiments at the same time, give tmux sessions clear names:

```bash
tmux new -s mnist_lr1e-3
tmux new -s nerf_room1
tmux new -s preprocess_data
```

List sessions:

```bash
tmux ls
```

Enter a specific session:

```bash
tmux attach -t nerf_room1
```

Do not name everything `test`, `exp`, or `new`. After a few days, you will forget what each one is running.

## 8. Can I Use nohup?

`nohup` can also keep a program running after you leave the terminal, for example:

```bash
nohup python train.py > logs/exp1.log 2>&1 &
```

The difference from `tmux` is that you cannot return to the original terminal interface. It is more suitable for commands that you just want to run until they finish.

For beginners, `tmux` is more intuitive: you can return to the original terminal session and keep watching output or typing commands. I recommend starting with `tmux`, then considering `nohup` once you clearly know what you need.

## References

- [Yale Center for Research Computing: tmux](https://docs.ycrc.yale.edu/clusters-at-yale/guides/tmux/)
- [USC Center for Advanced Research Computing: Using Tmux](https://www.carc.usc.edu/user-guides/hpc-systems/software/tmux)
- [University of Utah CHPC: tmux](https://www.chpc.utah.edu/documentation/software/tmux.php)
- [UC Davis HPC: Accessing Clusters](https://docs.hpc.ucdavis.edu/general/access/)
- [Northern Arizona University ARC: Terminal Multiplexers](https://in.nau.edu/arc/terminal-multiplexers/)
- [University of Florida RC: Persistent Sessions](https://docs.rc.ufl.edu/access/persistent_sessions/)
- [Kyoto Sangyo University: DGX A100 User Guide](https://www.cse.kyoto-su.ac.jp/~oomoto/lecture/program/tips/HPC/)
