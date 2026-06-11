# What SSH Is and How to Connect

Before using the VIS Hiroshima Lab Ubuntu servers, you need to learn two things:

1. How to connect to a server through SSH;
2. How to use basic Linux/UNIX commands.

This section introduces what SSH does and walks through the most basic server login process. Later sections will cover SSH keys, VS Code Remote SSH, file transfer, and running long experiments.

![SSH-remoooo](../../assets/images/connecting-to-servers/image0.png){ loading=lazy }

## 1. Basic Concepts of SSH

SSH stands for **Secure Shell**, a set of network protocols used for remotely accessing computers. It can establish an encrypted connection between your computer and a remote server.

The lab's Ubuntu server is the server side. SSH is responsible for creating a connection between your computer and the server side. After the connection is established, you can use your own computer to view files on the server, create and edit code, run programs, use the server-side GPU resources, download experiment results, and so on.

After logging in to the server, although you are typing commands on your own computer, those commands are actually executed on the remote server. SSH encrypts communication content, including usernames, passwords, commands, and transferred data, so it is very suitable for research and server management scenarios.

## 2. Do You Need to Install SSH Software?

Depending on your operating system, you may already have an available SSH client.

=== "macOS"

    Mac computers usually come with a command-line SSH tool preinstalled, so no additional installation is required. We recommend using Ghostty, iTerm2, or the built-in Terminal.

    After opening the terminal, enter:

    ```bash
    ssh -V
    ```

    If SSH information appears on the screen, SSH is already available and working correctly.

=== "Windows"

    Windows usually comes with the OpenSSH client preinstalled. We recommend using PowerShell.

    After opening PowerShell, enter:

    ```powershell
    ssh -V
    ```

    If SSH command information is displayed, the SSH client is already installed.

    If the system says that the `ssh` command cannot be found, check Windows Optional Features and confirm that **OpenSSH Client** is installed.

## 3. What You Need Before Connecting to the Server

Before connecting to a lab server, you need to get **the username assigned to you by Hirakiuchi-san, the lab server's IP address or hostname, and the corresponding account password**.

Server accounts are usually provided by Hirakiuchi-san or another server administrator. 

Hirakiuchi-san may provide information similar to the following:

```text
Blackwell:10.30.XXX.XXX
Account name: jie-zhang
Password: today's date (8-digit number)
```

Here, `10.30.XXX.XXX` is the server's IP address inside the lab network.

## 4. Connecting to the Server from Within the Lab Network

If your computer is already connected to the lab's wired or wireless network, you can try connecting directly to the server with SSH.

The basic SSH command format is:

```bash
ssh username@server-address
```

For example:

```bash
ssh jie-zhang@10.30.XXX.XXX
```

When connecting to a server for the first time, SSH may display a message similar to the following:

```text
The authenticity of host '10.30.XXX.XXX' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

This means your computer has never connected to this server before, so it has not saved the server's identity information yet. Type `yes` directly and press Enter.

After confirmation, the server information will be recorded in the local `known_hosts` file. When you connect to the same server again in the future, this prompt will usually not appear again.

## 5. Entering the Password

After running the SSH command, the terminal will ask for a password:

```text
jie-zhang@10.30.XXX.XXX's password:
```

Enter the server password provided by Hirakiuchi-san and press Enter.

> **Note: Nothing will appear on the screen while you type the password**
>
> When entering a password in the command line, the screen will not show asterisks, dots, or password characters. This is a normal security design.
>
> Just type the password normally and press Enter. If you are worried that you typed it incorrectly, press `Ctrl + C` to cancel the current connection, then run the SSH command again.

## 6. How to Confirm a Successful Login

The following shows a complete SSH login process:

```text
user@DESKTOP-TRQ9UD0 C:\Users\user>ssh jie-zhang@10.30.XXX.XXX
jie-zhang@10.30.XXX.XXX's password:
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
  IPv4 address for eno1: 10.30.XXX.XXX
  IPv6 address for eno1: 2001:2f8:xxx:xxx::xxxx

Expanded Security Maintenance for Applications is not enabled.

112 updates can be applied immediately.
63 of these updates are standard security updates.

Last login: Sun Jun  7 20:40:49 2026 from 2001:2f8:1c1:c39::480d
```

From this moment onward, the commands you enter will run on the lab server, not on your own computer.

For example, entering `pwd` shows the current directory.

Entering `ls` lists the files in the current directory.

Entering `whoami` confirms the username you are currently logged in as.

Entering `hostname` shows the current server's hostname.

Entering `nvidia-smi` shows the current GPU usage.

## 7. How to Disconnect from the Server

Type `exit` directly in the command line and press Enter to exit the current SSH session.

Closing the terminal window will usually also disconnect, but it is a good habit to exit normally with `exit`.

If you run a long-running program directly in a normal SSH window, the program may terminate together with the SSH connection when you disconnect. Long-running experiments should use `tmux`. See [tmux and Running Experiments](../running-experiments/tmux-and-experiments.md) for more information.

## 8. Common Connection Errors

### `Connection timed out`

If you see:

```text
ssh: connect to host 10.30.XXX.XXX port 22: Connection timed out
```

it means your computer cannot connect to the server. Common causes include not being connected to the lab network, being at home or on another off-campus network, entering the wrong IP address, and so on.

First confirm whether you are inside the lab network. If you are off-campus, see [Off-campus Access](off-campus-access.md).

### `Permission denied, please try again.`

If you see:

```text
Permission denied, please try again.
```

it usually means the username or password is incorrect. If you forgot your password, contact Hirakiuchi-san directly.

### `Could not resolve hostname`

If you see:

```text
ssh: Could not resolve hostname ...
```

it usually means the server address is incorrect. If you are using an IP address, check whether any digits or periods are missing.

## 9. Basic Security Considerations

Follow these principles:

- Do not tell your password to anyone else;
- Do not make your password public;
- Do not use `sudo` when you do not understand what a command means. In any case, you cannot use it on the server, because Hirakiuchi-san has not given you that permission. :)

Later, you can configure SSH key-based login. After using an SSH key, you usually do not need to enter the server password every time, and it is more suitable for long-term use. See [SSH Public and Private Keys](ssh-key-pair.md) for the detailed steps.

## 10. What You Should Be Able to Do After This Section

After completing this section, you should be able to:

- Explain the basic purpose of SSH;
- Understand the difference between a local computer and a remote server;
- Open a terminal on macOS or Windows;
- Connect to the lab server using `ssh username@server-address`;
- Understand that it is normal for no characters to appear while typing a password;
- Determine whether you have successfully logged in to an Ubuntu server;
- Exit the server normally with `exit`;
- Perform basic troubleshooting based on common error messages.

The most basic complete workflow is:

```bash
ssh jie-zhang@10.30.XXX.XXX
```

After entering the password and logging in successfully:

```bash
whoami
hostname
pwd
ls
```

When finished, exit with:

```bash
exit
```

## References

- [Princeton University - Connect by SSH](https://researchcomputing.princeton.edu/support/knowledge-base/connect-ssh)
- [Florida State University - Using SSH](https://docs.rcc.fsu.edu/ssh/)
- [University of Michigan - Get Connected](https://documentation.its.umich.edu/node/5093)