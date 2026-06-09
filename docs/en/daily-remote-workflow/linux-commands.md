---
title: What Is SSH
author: Jie-Zhang(remoooo.com)
date: 2026-06-08
last_updated: 2026-06-10
---

# Common Linux Commands

This section introduces some of the Linux commands most commonly used in research environments, including checking CPU, GPU, memory, and disk usage; performing basic file operations; managing processes; compressing and extracting files; handling permissions; and avoiding common mistakes.

Commands shown in **bold** are the ones that I personally use most often.

## 1. Check Your Current Identity and Location

Check the current username

```bash
whoami
```

Check the hostname of the current server

```bash
hostname
```

Check the current working directory

```bash
pwd
```

**List files in the current directory**

```bash
ls
```

Show the size of each item in the current directory

```bash
du -sh *
```

Show the size of each item in the current directory (sorted by size)

```bash
du -sh -- ./* ./.??* 2>/dev/null | sort -hr
```

## 2. Navigate Directories

Enter a directory

```bash
cd directory_name
```

Move to the parent directory

```bash
cd ..
```

Return to your home directory

```bash
cd ~
```

## 3. Basic File and Directory Operations

Create a directory

```bash
mkdir folder_name
```

Create an empty file

```bash
touch file.txt
```

Copy a directory

```bash
cp -r source_folder target_folder
```

Copy a file

```bash
cp source.txt target.txt
```

Move a file

```bash
mv old_path new_path
```

Rename a file

```bash
mv old_name.txt new_name.txt
```

Delete a file

```bash
rm file.txt
```

Delete a directory

```bash
rm -r folder_name
```

Force-delete a directory

```bash
rm -rf folder_name
```

> `rm -rf` is extremely dangerous (:
>
> Before running it, always use `pwd` and `ls` to confirm which directory you are in and what files you are about to delete.

## 4. View File Contents

Display the entire contents of a file

```bash
cat file.txt
```

**Monitor updates to a log file in real time**

```bash
tail -f log.txt
```

## 5. Edit Text Files

Common command-line text editors on Linux servers include Nano, Vim, and Emacs. If you are completely unfamiliar with terminal-based editors, I recommend using VS Code directly.

For beginners, I recommend starting with Nano.

```bash
nano file.txt
```

## 6. View CPU Information

Show CPU model and core information

```bash
lscpu
```

Show current CPU usage

```bash
top
```

**A more intuitive view of CPU usage**

```bash
htop
```

> `htop` displays the utilization of each CPU core, memory usage, and a list of running processes. However, I am not sure whether Hirakiuchi-san has installed it on every machine.

## 7. Check Memory Usage

Show overall memory usage

```bash
free -h
```

> You can also view memory usage directly in `htop`.

## 8. Check Disk and Directory Usage

Show the disk usage of the current directory

```bash
du -sh .
```

## 9. Monitor GPU Usage

Deep learning and graphics computing workloads typically require GPUs. This is arguably the most important command in this guide. Before starting a training job, always make sure you are not occupying GPU resources that someone else is using.

**The most commonly used command for checking GPU status is**

```bash
nvidia-smi
```

**To refresh the output every second**

```bash
watch -n 1 nvidia-smi
```

## 10. View Currently Logged-in Users

```bash
who
```

Show recent login history

```bash
last
```

## 11. Compress and Extract Files

Extract a `.zip` file:

```bash
unzip file.zip
```

Create a `.zip` archive:

```bash
zip -r archive.zip folder_name
```
