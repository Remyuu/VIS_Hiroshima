---
title: What Is SSH
author: Jie-Zhang(remoooo.com)
date: 2026-06-08
last_updated: 2026-06-08
---

# Common Linux Commands

This section introduces some of the Linux commands most commonly used in research environments, including checking CPU, GPU, memory, and disk usage; performing basic file operations; managing processes; compressing and extracting files; handling permissions; and avoiding common mistakes.

Commands shown in **bold** are the ones that I personally use most often.

## 1. Check Your Current Identity and Location

Check the current username

```
whoami
```

Check the hostname of the current server

```
hostname
```

Check the current working directory

```
pwd
```

**List files in the current directory**

```
ls
```

Show the size of each item in the current directory

```
du -sh *
```

Show the size of each item in the current directory (sorted by size)

```
du -sh -- ./* ./.??* 2>/dev/null | sort -hr
```

## 2. Navigate Directories

Enter a directory

```
cd directory_name
```

Move to the parent directory

```
cd ..
```

Return to your home directory

```
cd ~
```

## 3. Basic File and Directory Operations

Create a directory

```
mkdir folder_name
```

Create an empty file

```
touch file.txt
```

Copy a directory

```
cp -r source_folder target_folder
```

Copy a file

```
cp source.txt target.txt
```

Move a file

```
mv old_path new_path
```

Rename a file

```
mv old_name.txt new_name.txt
```

Delete a file

```
rm file.txt
```

Delete a directory

```
rm -r folder_name
```

Force-delete a directory

```
rm -rf folder_name
```

> `rm -rf` is extremely dangerous (:
>
> Before running it, always use `pwd` and `ls` to confirm which directory you are in and what files you are about to delete.

## 4. View File Contents

Display the entire contents of a file

```
cat file.txt
```

**Monitor updates to a log file in real time**

```
tail -f log.txt
```

## 5. Edit Text Files

Common command-line text editors on Linux servers include Nano, Vim, and Emacs. If you are completely unfamiliar with terminal-based editors, I recommend using VS Code directly.

For beginners, I recommend starting with Nano.

```
nano file.txt
```

## 6. View CPU Information

Show CPU model and core information

```
lscpu
```

Show current CPU usage

```
top
```

**A more intuitive view of CPU usage**

```
htop
```

> `htop` displays the utilization of each CPU core, memory usage, and a list of running processes. However, I am not sure whether Hirakiuchi-san has installed it on every machine.

## 7. Check Memory Usage

Show overall memory usage

```
free -h
```

> You can also view memory usage directly in `htop`.

## 8. Check Disk and Directory Usage

Show the disk usage of the current directory

```
du -sh .
```

## 9. Monitor GPU Usage

Deep learning and graphics computing workloads typically require GPUs. This is arguably the most important command in this guide. Before starting a training job, always make sure you are not occupying GPU resources that someone else is using.

**The most commonly used command for checking GPU status is**

```
nvidia-smi
```

**To refresh the output every second**

```
watch -n 1 nvidia-smi
```

## 10. View Currently Logged-in Users

```
who
```

Show recent login history

```
last
```

## 11. Compress and Extract Files

Extract a `.zip` file:

```
unzip file.zip
```

Create a `.zip` archive:

```
zip -r archive.zip folder_name
```
