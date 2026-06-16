# SSH Public and Private Keys

The previous page showed how to log in to a lab server with a username and password. This page introduces a better way for daily use: **SSH key login**.

With SSH keys, your computer keeps a private key, and the server keeps the matching public key. When you log in, SSH uses this key pair to verify your identity. Once it is set up, you usually do not need to type the server password every time. It also works nicely with VS Code Remote SSH, SFTP, `scp`, `rsync`, and similar tools.

The overall flow is:

1. Generate an SSH key pair on your own computer;
2. Put the public key into `authorized_keys` on the server account;
3. Use the private key from your own computer to log in.

<figure markdown="span">
  ![keep-your-password-private](../../assets/images/connecting-to-servers/image1.png){ loading=lazy, width="60%" }
  <figcaption>keep-your-password-private</figcaption>
</figure>

## 1. What Are Public and Private Keys?

An SSH key pair has two files:

| File | Usual location | What it does |
| --- | --- | --- |
| Private key | `~/.ssh/id_ed25519` | Stays only on your own computer. It proves "I am the user of this account." |
| Public key | `~/.ssh/id_ed25519.pub` | Goes on the server. It allows the matching private key to log in. |

You can think of it like this:

The **private key** is your own key. Do not send it to anyone. The server only needs the public key. It does not need to know your private key.

!!! warning "Do not leak your private key"

    Do not send files such as `id_ed25519`, `id_ed25519_vis`, or `id_rsa` to anyone if they do not have the `.pub` suffix. Also do not upload them to GitHub, Notion, Google Drive shared links, Slack, Teams, Line, or public documents.

    The file you can share is the public key file with the `.pub` suffix, such as `id_ed25519_vis.pub`.

## 2. Check Whether You Already Have an SSH Key

Run this in your local terminal:

=== "macOS / Linux"

    ```bash
    ls -al ~/.ssh
    ```

=== "Windows PowerShell"

    ```powershell
    dir $env:USERPROFILE\.ssh
    ```

If you see files like these, your computer may already have an SSH key:

```text
id_ed25519
id_ed25519.pub
```

Or:

```text
id_rsa
id_rsa.pub
```

The file without `.pub` is the private key. The file with `.pub` is the public key.

If you are not sure what those keys are used for, do not delete them yet. For the lab server, it is fine to generate a new key pair.

## 3. Generate a New SSH Key

I recommend using an Ed25519 key. It is newer, secure, fast, and the command is simple.

Run this in your local terminal:

=== "macOS / Linux"

    ```bash
    ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_vis -C "your-name@vis-hiroshima"
    ```

=== "Windows PowerShell"

    ```powershell
    ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\id_ed25519_vis" -C "your-name@vis-hiroshima"
    ```

Here is what the options mean:

| Option | Meaning |
| --- | --- |
| `-t ed25519` | Generate an Ed25519 key. |
| `-f ~/.ssh/id_ed25519_vis` | Set the private key path and file name. |
| `-C "your-name@vis-hiroshima"` | Add a comment to the key so it is easier to recognize later. |

After running the command, you will see prompts like:

```text
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Here you can set a passphrase to add one more layer of protection to the private key. The passphrase is not the server password. It protects the private key itself.

- If you set a passphrase, you may need to type it once when using this private key;
- If you just press Enter and leave it empty, it is more convenient, but you must take good care of the private key file;
- If you forget the passphrase later, it usually cannot be recovered. You will need to generate a new key.

If you are just getting started and are not familiar with SSH agent yet, leaving it empty is okay. After your workflow becomes stable, you can consider adding a passphrase.

After generation, you will have two files:

```text
~/.ssh/id_ed25519_vis
~/.ssh/id_ed25519_vis.pub
```

The first one is the private key. The second one is the public key.

## 4. View and Copy the Public Key

Before adding the public key to the server, you need to view its content.

=== "macOS / Linux"

    ```bash
    cat ~/.ssh/id_ed25519_vis.pub
    ```

=== "Windows PowerShell"

    ```powershell
    Get-Content "$env:USERPROFILE\.ssh\id_ed25519_vis.pub"
    ```

The public key looks something like this:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHx5dbGOMRblFApD+C2YcA2y5LL8Bm8n/OjytGGWwCcU your-name@vis-hiroshima
```

A public key is usually one single line with three parts:

```text
key-type key-content comment
```

When copying the public key, copy the entire line. Do not copy only the middle part, and do not add extra line breaks.

## 5. Add the Public Key to the Server

Whether SSH key login works depends on whether the server has your public key in your account.

On the server, public keys are usually stored here:

```text
~/.ssh/authorized_keys
```

For example, for the server user `jie-zhang`, the full path is usually:

```text
/home/jie-zhang/.ssh/authorized_keys
```

Run the following command on your own computer to append the public key to the server's `authorized_keys`.

=== "macOS / Linux"

    ```bash
    cat ~/.ssh/id_ed25519_vis.pub | ssh jie-zhang@10.30.XXX.XXX 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && cat >> ~/.ssh/authorized_keys'
    ```

=== "Windows PowerShell"

    ```powershell
    Get-Content "$env:USERPROFILE\.ssh\id_ed25519_vis.pub" | ssh jie-zhang@10.30.XXX.XXX "mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && cat >> ~/.ssh/authorized_keys"
    ```

Replace `10.30.XXX.XXX` with the actual server IP address, and replace `jie-zhang` with your own server username.

The server may ask for your server password when you run this command. That is normal, because the key setup is not finished yet.

The command does a few things:

| Command part | What it does |
| --- | --- |
| `mkdir -p ~/.ssh` | Creates the `.ssh` directory under your server account. |
| `chmod 700 ~/.ssh` | Makes the `.ssh` directory accessible only by you. |
| `touch ~/.ssh/authorized_keys` | Creates `authorized_keys` if it does not exist. |
| `chmod 600 ~/.ssh/authorized_keys` | Makes `authorized_keys` readable and writable only by you. |
| `cat >> ~/.ssh/authorized_keys` | Appends your local public key to the server's `authorized_keys`. |

!!! note "Do not append the same public key again and again"

    Duplicate public keys usually do not break login immediately, but they make `authorized_keys` messy. It is better to confirm that you copied the correct public key, then run the command once.

    If you already added the same key multiple times, log in to the server, edit `~/.ssh/authorized_keys`, and keep only one copy of that line.

## 6. Test SSH Key Login

After adding the public key to the server, run this on your own computer:

=== "macOS / Linux"

    ```bash
    ssh -i ~/.ssh/id_ed25519_vis jie-zhang@10.30.XXX.XXX
    ```

=== "Windows PowerShell"

    ```powershell
    ssh -i "$env:USERPROFILE\.ssh\id_ed25519_vis" jie-zhang@10.30.XXX.XXX
    ```

If you can log in directly, SSH key login is working.

If you set a passphrase, the terminal may ask you for that passphrase. This is not the server password. It is the password protecting your private key. If SSH still asks for the server password, the permissions of `authorized_keys` may be wrong. See section 8 for details.

After logging in, you can confirm that you are on the server with:

```bash
whoami
hostname
pwd
```

## 7. Use SSH Config to Shorten the Command

Typing this every time is a bit annoying:

```bash
ssh -i ~/.ssh/id_ed25519_vis jie-zhang@10.30.XXX.XXX
```

You can create or edit your local SSH config file.

=== "macOS / Linux"

    ```bash
    nano ~/.ssh/config
    ```

=== "Windows PowerShell"

    ```powershell
    notepad $env:USERPROFILE\.ssh\config
    ```

Add this:

```sshconfig
Host vis-server
    HostName 10.30.XXX.XXX
    User jie-zhang
    IdentityFile ~/.ssh/id_ed25519_vis
```

After saving it, you can connect with:

```bash
ssh vis-server
```

This alias can also be used by other tools, for example:

```bash
scp local-file.txt vis-server:~/
sftp vis-server
```

VS Code Remote SSH also reads this config file. So after setting up `~/.ssh/config`, later connections become much easier.

!!! tip "Windows path"

    Windows OpenSSH can usually understand `~/.ssh/id_ed25519_vis`. If it does not work in your environment, use the full path instead:

    ```sshconfig
    IdentityFile C:/Users/your-name/.ssh/id_ed25519_vis
    ```

## 8. Permissions

SSH is quite strict about file permissions. If permissions are too open, SSH may refuse to use the file.

Recommended local permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519_vis
chmod 644 ~/.ssh/id_ed25519_vis.pub
chmod 600 ~/.ssh/config
```

Recommended server-side permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

If you see this error:

```text
WARNING: UNPROTECTED PRIVATE KEY FILE!
```

it usually means the private key permissions are too open. Run this locally:

```bash
chmod 600 ~/.ssh/id_ed25519_vis
```

On Windows, you usually do not need to run `chmod` manually. If Windows OpenSSH complains about private key permissions, first check that the private key is inside your own user's `.ssh` directory.

## 9. Common Issues

### `Permission denied (publickey)`

If you see:

```text
Permission denied (publickey).
```

it means the server did not accept your SSH key. Focus on checking the server-side `.ssh` and `authorized_keys` permissions.

You can add `-v` to see more debugging information:

```bash
ssh -v -i ~/.ssh/id_ed25519_vis jie-zhang@10.30.XXX.XXX
```

The output will be long, but look for lines like:

```text
Offering public key: ...
Server accepts key: ...
```

### Forgot the passphrase

If you forget the private key passphrase, it usually cannot be recovered.

The usual fix is to generate a new SSH key pair, then add the new public key to the server's `authorized_keys`. If the old key is no longer used, you should also remove the old public key from `authorized_keys` on the server.

### What if the private key leaks?

If you accidentally send your private key to someone else, or upload it to a public repository, stop using that key immediately.

Recommended steps:

1. Delete the matching public key from `~/.ssh/authorized_keys` on the server;
2. Delete the leaked private key and public key from your own computer;
3. Generate a new SSH key pair;
4. Add the new public key to the server;
5. If the leak happened in a GitHub repository, remove it completely from Git history and notify the relevant administrator.

Deleting the file only from the current GitHub page is usually not enough, because the private key may still be visible in older commit history.

## 10. Good Habits

I recommend these habits:

- Use a separate SSH key pair for each computer you own;
- Keep private keys only on your own computer. Do not share them through chat apps, email, or cloud drives;
- Public keys can be given to the server administrator;
- When you stop using a computer, remove its public key from the server's `authorized_keys`.

## References

- [The Hong Kong University - Login to HPC Cluster Without Using Password](https://hkust-hpc-docs.readthedocs.io/latest/kb/ssh/ssh-login-to-hpc-cluster-without-usi-ImiEj9.html)
- [University of California Berkeley - SSH Keys](https://statistics.berkeley.edu/computing/ssh-keys)
- [University of Arizona - System Access](https://hpcdocs.hpc.arizona.edu/registration_and_access/system_access/)
