---
title: What Is SSH
author: Jie-Zhang(remoooo.com)
date: 2026-06-07
last_updated: 2026-06-07
---

# What Is SSH

Before using the VIS Hiroshima Lab Ubuntu servers, you first need to understand and use the SSH protocol, and work through a UNIX command-line interface.

Therefore, before getting started with the servers, you should at least learn two things:

1. How to connect to a server using SSH;
2. How to use basic Linux/UNIX commands.

## 1. Basic Concepts of SSH

SSH stands for **Secure Shell**, a set of network protocols used for remotely accessing computers. It establishes an encrypted and secure connection between two computers.

The lab's Ubuntu machine acts as the server. SSH is responsible for creating a connection between your computer and the lab server. Once connected, you can browse files on the server, create and edit code, run programs, use GPU resources, download experiment results, and more.

Although you type commands on your own computer, those commands are actually executed on the remote server. SSH encrypts all communication, including usernames, passwords, commands, and transferred data. Compared to unencrypted remote access methods, SSH is much more suitable for server administration and research environments.

## 2. Do You Need to Install SSH Software?

Depending on your operating system, you may need to install an SSH client, or you may already have one preinstalled.

### macOS

Apple Mac computers usually come with a command-line SSH client preinstalled, so no additional installation is required. We recommend using Ghostty or the built-in Terminal application.

In the terminal, enter:

```bash
ssh
```

If SSH usage information appears on the screen, SSH is already available and working correctly.

### Windows 11

Windows 11 usually comes with the OpenSSH client preinstalled. We recommend using PowerShell. After opening PowerShell, enter:

```powershell
ssh
```

If SSH command help information is displayed, the SSH client is already installed.

If the system reports that the `ssh` command cannot be found, check Windows Optional Features and verify that **OpenSSH Client** is installed.

## 3. What You Need Before Connecting to the Server

Before connecting to a lab server, you need to obtain **the username assigned by Hirakiuchi-san, the server IP address or hostname, and the corresponding password**.

Server accounts are usually provided by Hirakiuchi-san or the server administrator. Do not use another student's account, and do not share your own account credentials with others.

Hirakiuchi-san may provide information similar to the following:

```text
Blackwell:10.30.81.206
Account Name: jie-zhang
Password: Today's date (8-digit number)
```

Here, `10.30.81.206` is the server's IP address within the laboratory network.

## 4. Connecting to the Server from Within the Lab Network

If your computer is connected to the laboratory's wired or wireless network, you can attempt to connect directly via SSH.

The basic SSH command format is:

```bash
ssh username@server-address
```

For example:

```bash
ssh jie-zhang@10.30.81.206
```

When connecting to a server for the first time, SSH may display a message similar to:

```text
The authenticity of host '10.30.81.206' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

This means your computer has never connected to this server before and does not yet have its identity information stored. Simply type `yes` and press Enter.

After confirmation, the server information will be stored in the local `known_hosts` file. Future connections to the same server will usually not display this warning again.

## 5. Entering the Password

After running the SSH command, the terminal will prompt you for a password:

```text
jie-zhang@10.30.81.206's password:
```

Enter the server password provided by Hirakiuchi-san and press Enter.

> **Important: Nothing will appear on the screen while typing the password**
>
> When entering a password, no characters will be displayed. This is a standard security feature of command-line interfaces.
>
> Simply type the password normally and press Enter.
>
> If you think you entered it incorrectly, press:
>
> ```text
> Ctrl + C
> ```
>
> to cancel the connection, then run the SSH command again.

## 6. What a Successful Login Looks Like

The following example shows a complete SSH login session:

```text
user@DESKTOP-TRQ9UD0 C:\Users\user>ssh jie-zhang@10.30.81.206
jie-zhang@10.30.81.206's password:
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-85-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Sun Jun 7 22:47:44 JST 2026

  System load:           2.31
  Usage of /:            11.4% of 13.97TB
  Memory usage:          13%
  Swap usage:            1%
  Temperature:           47.0 C
  Processes:             618
  Users logged in:       4
  IPv4 address for eno1: 10.30.81.206
  IPv6 address for eno1: 2001:2f8:1c1:c39::3e70

Expanded Security Maintenance for Applications is not enabled.

112 updates can be applied immediately.
63 of these updates are standard security updates.

Last login: Sun Jun  7 20:40:49 2026 from 2001:2f8:1c1:c39::480d
```

From this point onward, any commands you enter will run on the lab server, not on your local computer.

For example:

- `pwd` shows your current directory.
- `ls` lists files in the current directory.
- `whoami` displays the currently logged-in username.
- `hostname` displays the server hostname.
- `nvidia-smi` shows current GPU usage.

## 7. How to Disconnect from the Server

Simply type `exit` at the command line and press Enter to end the current SSH session.

Closing the terminal window will usually disconnect as well, but it is good practice to exit cleanly using `exit`.

**One important thing to note is that if you run a long-running program directly in a normal SSH session, the program may terminate when you disconnect. Long-running experiments should use a session manager such as `tmux`.**

## 8. Common Connection Errors

### Connection timed out

If you see:

```text
ssh: connect to host 10.30.81.206 port 22: Connection timed out
```

your computer cannot reach the server. Common causes include not being connected to the lab network, being at home or on another external network, or entering the wrong IP address.

First, verify that your computer is connected to the lab network. If you are off-campus, you may need to use the university VPN, Tailscale, or another approved remote-access solution. I personally recommend Tailscale and will discuss it later.

### Permission denied

If you see:

```text
Permission denied, please try again.
```

the username or password is usually incorrect. If you have forgotten your password, contact Hirakiuchi-san.

### Could not resolve hostname

If you see:

```text
ssh: Could not resolve hostname ...
```

the server address is usually incorrect. If you are using an IP address, check for missing digits or periods.

## 9. Basic Security Considerations

Your server account represents your identity on the server. All actions performed through the account may be logged, so protect your credentials carefully.

Follow these principles:

- Do not share your password with anyone.
- Do not store passwords in publicly accessible documents.
- Do not use `sudo` unless you understand exactly what a command does. In any case, you will not be able to use it on this server because Hirakiuchi-san has not granted you that permission.

Later, you can configure SSH key-based authentication. SSH keys eliminate the need to enter your password every time and are generally more secure than password-only authentication. This will also be covered in a later section.

## 10. What You Should Be Able to Do After This Section

After completing this section, you should be able to:

- Explain the basic purpose of SSH.
- Understand the difference between a local computer and a remote server.
- Open a terminal on macOS or Windows.
- Connect to the lab server using:

```bash
ssh username@server-address
```

- Understand that no characters appearing while typing a password is normal behavior.
- Determine whether you have successfully logged into an Ubuntu server.
- Exit a server properly using `exit`.
- Perform basic troubleshooting based on common error messages.

The complete minimum workflow is:

```bash
ssh jie-zhang@10.30.81.206
```

After entering the password and logging in successfully:

```bash
whoami
hostname
pwd
ls
```

When finished, disconnect with:

```bash
exit
```