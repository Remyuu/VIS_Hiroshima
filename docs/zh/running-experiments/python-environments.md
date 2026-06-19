# Python 实验环境隔离

本节介绍如何在实验室服务器上安装 Miniforge3，并用 conda 为不同 Python 实验创建独立环境。

不要依赖系统 Python 做实验；每个项目使用自己的环境；优先用 conda 解决依赖。

<figure markdown="span">
  ![Python-environment-meme](../../assets/images/running-experiments/image1.png){ loading=lazy, width="60%" }
  <figcaption>https://programmerhumor.io/python-memes/gis-and-ml-is-a-whole-new-world-of-hurt/</figcaption>
</figure>

!!! note "Miniforge 还是 Miniconda ？"

    本文档统一使用 Miniforge3。Miniforge 默认使用 `conda-forge`，Miniconda 默认使用 Anaconda 的软件源。两者都是轻量级的 Conda 发行版，但本文选用的 Miniforge 基于社区开发，无商业风险。

    如果你的电脑已经安装了 Miniconda，也不必立即更换，大部分 conda 命令仍然适用。

    请不要同时安装 Miniforge 和 Miniconda，也不要在同一个环境中随意混用不同软件源。

    **如果你不确定自己适合用哪个，用 Miniforge 吧。**

## 1. 为什么需要环境隔离

不同实验对 Python 和包版本的要求可能完全不同。例如：

```text
project-a 需要 Python 3.10 + torch 2.4
project-b 需要 Python 3.11 + torch 2.6
project-c 需要旧版 numpy
```

正确做法是一个项目对应一个 conda 环境。

## 2. 先检查服务器默认环境

登录服务器后，先看当前环境：

```bash
uname -m
cat /etc/os-release | sed -n '1,8p'
python3 --version
python3 -m pip --version
command -v conda
conda --version
```

新账号或默认服务器环境通常类似：

```text
x86_64
Ubuntu 24.04.3 LTS
Python 3.12.3
/usr/bin/python3: No module named pip
conda: command not found
```

这说明服务器有系统自带 Python，但默认没有为你准备好 Miniforge / conda。系统 Python 主要给系统和基础工具使用，普通用户通常也没有权限修改系统 Python 环境。

!!! warning "不要修改系统 Python ！！！"

    禁止用系统 Python 做实验环境。普通用户没有 sudo 权限。实验依赖应该放进自己的 Miniforge / conda 环境。

如果直接输入 `pip`，可能会看到类似提示：

```text
コマンド 'pip' が見つかりません。次の方法でインストールできます:
apt install python3-pip
管理者に確認してください。
```

这个提示的意思是系统层面没有安装 `pip` 命令。对实验用户来说，正确处理方式不是 `apt install python3-pip`，而是安装并使用自己的 Miniforge。

## 3. 安装 Miniforge

Miniforge 是一个轻量的 conda 发行版，默认使用 `conda-forge`。相比完整 Anaconda，它更适合作为个人实验环境管理工具。

建议安装到自己的 home 目录：

```text
~/opt/miniforge3
```

下载安装脚本：

```bash
mkdir -p ~/opt
cd ~/opt
curl -L -O https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
```

自动安装：

```bash
bash Miniforge3-Linux-x86_64.sh -b -p ~/opt/miniforge3
```

检查安装结果：

```bash
~/opt/miniforge3/bin/conda --version
~/opt/miniforge3/bin/python --version
```

提示如下信息则表示安装成功：

```bash
jie-zhang@Ubuntu:~/opt$ ~/opt/miniforge3/bin/conda --version
conda 26.3.2
jie-zhang@Ubuntu:~/opt$ ~/opt/miniforge3/bin/python --version
Python 3.13.13
```

## 4. 启用 conda

安装完成后，当前 shell 可能还不知道 `conda` 在哪里。先手动加载：

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
```

然后检查：

```bash
conda --version
```


## 5. 是否要写入 ~/.bashrc （推荐）

如果你希望每次登录后都能直接使用 `conda activate`，可以执行：

```bash
~/opt/miniforge3/bin/conda init bash
```

然后重新打开 SSH 终端，或执行：

```bash
source ~/.bashrc
```

建议关闭自动进入 `base`：

```bash
conda config --set auto_activate false
```

> 旧版 conda ： `conda config --set auto_activate_base false`

这样登录服务器时不会自动出现 `(base)`，终端更干净。

对于新手而言推荐运行 `conda init`。如果不想修改 `~/.bashrc`，每次手动执行下面这一行也完全可以：

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
```

## 6. 创建项目环境

建议环境名和项目名保持一致。例如项目叫 `nerf-room1`：

```bash
conda create -n nerf-room1 python=3.11 -y
conda activate nerf-room1
```

确认当前 Python 来自这个环境：

```bash
which python
python --version
```

输出应该类似：

```bash
(nerf-room1) jie-zhang@Ubuntu:~$ which python
/home/jie-zhang/opt/miniforge3/envs/nerf-room1/bin/python
(nerf-room1) jie-zhang@Ubuntu:~$ python --version
Python 3.11.15
```

!!! warning "不要把实验依赖装进 base"

    `base` 只应该用来提供 `conda` 这些环境管理工具。训练代码需要的 `torch`、`tensorflow`、`opencv`、`numpy` 等依赖，请装进项目自己的环境。

## 7. 安装项目依赖

优先使用 conda 安装复杂依赖：

```bash
conda install numpy pandas matplotlib -y
```

如果项目提供 `requirements.txt`，并且你已经激活了项目环境：

```bash
python -m pip install -r requirements.txt
```

如果只临时安装一个 pip 包，也建议写成：

```bash
python -m pip install package-name
```

这样可以确保 `pip` 属于当前激活的 Python 环境。

!!! warning "不要在环境外 pip install"

    不要在没有激活 conda 环境时直接运行 `pip install`。

    不要在没有激活 conda 环境时直接运行 `pip install`。

    不要在没有激活 conda 环境时直接运行 `pip install`。

## 8. 在 conda 环境中使用指定 CUDA-Toolkit 版本

实验室服务器是多人共用环境，不要试图在 OS 系统层面自行安装或修改 CUDA。全局修改 `/usr/local/cuda`、系统环境变量或驱动相关内容，可能会影响其他同学正在运行的实验。

更安全的做法是：在自己的 conda 环境里安装项目需要的 CUDA 运行时、CUDA Toolkit 或深度学习框架的 CUDA 版本。这样不同项目可以使用不同版本的 CUDA 相关依赖，同时不会修改系统全局环境。

!!! note "先区分几个概念"

    - 「NVIDIA Driver / GPU 驱动」是系统层面的组件，由管理员维护。`nvidia-smi` 能否正常显示 GPU，主要取决于驱动。
    - 「CUDA Runtime / CUDA 运行时」是运行已经编译好的 CUDA 程序所需的用户态库。很多 PyTorch / TensorFlow 安装包基本会自带。
    - 「**CUDA Toolkit**」是面向开发和编译的完整工具包，通常包含头文件、库、调试 / 分析工具，以及 `nvcc` 等编译相关工具。
    - 「`nvcc`」全程 NVIDIA CUDA Compiler Driver，用来编译 `.cu` 文件、CUDA extension 或需要本地 CUDA 编译的包。只训练和推理 PyTorch 模型时，通常不需要单独安装 `nvcc`。

!!! warning "不要把 CUDA 装进 base"

    NVIDIA 官方也建议把 CUDA 安装在专用 conda 环境里，而不是 `base` 环境。实验项目之间的 CUDA / PyTorch / Python 版本经常不同，把它们混在 `base` 里后期很难排查。

### 8.1 什么时候需要安装什么

如果只是安装 PyTorch、TensorFlow 等框架，通常优先看框架官方安装页给出的命令。例如 PyTorch 会让你选择 Linux、安装方式、Python、CUDA 版本，然后生成对应命令。此时一般不需要先安装系统级 CUDA Toolkit，也不一定需要 `nvcc`。

如果安装包提示找不到 `nvcc`，或者是项目的 README 里明确要求某个 CUDA Toolkit 版本，就需要安装 CUDA Toolkit 来编译 CUDA 代码。

如果报错只说明缺少 `nvcc`，可以先尝试只安装 `cuda-nvcc`。

### 8.2 从哪里查 CUDA 版本

一般可以通过 Nvidia 官网 [NVIDIA CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive) 查看 CUDA Toolkit 官方历史版本、发布时间和对应文档。

也可以在 Conda 官网 [`cuda-toolkit` labels on Anaconda.org](https://anaconda.org/nvidia/cuda-toolkit/labels) 查看 conda 包可用的 CUDA 标签，例如 `cuda-11.6.2`、`cuda-12.4.0`。

如果要单独安装 `nvcc`，请阅读 [`cuda-nvcc` on Anaconda.org](https://anaconda.org/nvidia/cuda-nvcc) 。

!!! tip "版本号和 conda label 的关系"

    conda 安装旧版 NVIDIA CUDA 包时，常见写法是把版本写在 channel label 里，例如 `-c nvidia/label/cuda-12.4.0`。这个 label 要和 Anaconda.org 上列出的 label 对得上。

### 8.3 推荐安装方式：项目环境内安装

例如新建一个需要 CUDA 11.6 的环境：

```bash
conda create -n cuda116-demo python=3.10 -y
conda activate cuda116-demo
```

NVIDIA 官方 conda 安装说明见 [CUDA Installation Guide for Linux: Conda Installation](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#conda-installation)。在实验室服务器上，优先在项目自己的 conda 环境里安装。

常见 NVIDIA conda 包可以这样理解：

| 包名 | 适合情况 | 说明 |
| --- | --- | --- |
| `cuda-toolkit` | 需要比较完整的 CUDA Toolkit | 包含 CUDA 开发常用的工具、头文件和库。 |
| `cuda` | 项目 README 或 NVIDIA 官方命令明确要求 | NVIDIA 官方文档中用于安装一组 CUDA Toolkit 组件的元包。 |
| `cuda-nvcc` | 报错只缺 `nvcc`，或只需要 CUDA 编译器 | 比完整 Toolkit 小；如果后续又缺头文件或库，再安装 `cuda-toolkit`。 |

如果需要比较完整的 CUDA Toolkit，可以安装 `cuda-toolkit`：

```bash
conda install -c nvidia/label/cuda-11.6.2 cuda-toolkit
```

如果项目 README 直接要求 NVIDIA 官方 conda CUDA 包，也可能看到 `cuda` 这个元包。它会安装一组 CUDA Toolkit 组件：

```bash
conda install -c nvidia/label/cuda-11.6.2 cuda
```

如果报错只缺少 `nvcc`，可以先安装更小的 `cuda-nvcc`：

```bash
conda install -c nvidia/label/cuda-11.6.2 cuda-nvcc
```

**安装哪个包，优先按照项目 README、课程说明或报错信息决定。一般来说，只运行 PyTorch / TensorFlow 优先用框架官方命令安装框架，不要先装 Toolkit；若需要编译 `.cu` 或 CUDA extension，则优先安装 `cuda-toolkit`；如果报错只缺 `nvcc`，可以先尝试只装 `cuda-nvcc`。需要完整 CUDA 开发环境时，安装 `cuda-toolkit` 或项目明确要求的 `cuda` 元包。**

### 8.4 验证当前环境中的 CUDA 和 `nvcc`

安装完成后检查：

```bash
which nvcc
nvcc -V
```

如果看到类似下面的输出，说明当前 conda 环境中的 `nvcc` 已经是 CUDA 11.6：

```text
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2022 NVIDIA Corporation
Built on Tue_Mar__8_18:18:20_PST_2022
Cuda compilation tools, release 11.6, V11.6.124
Build cuda_11.6.r11.6/compiler.31057947_0
```

如果 `which nvcc` 指向当前 conda 环境，例如 `~/opt/miniforge3/envs/cuda116-demo/bin/nvcc`，说明正在使用这个环境里的 `nvcc`。

也建议同时看一下系统 GPU 和驱动状态：

```bash
nvidia-smi
```

<figure markdown="span">
    ![cuda-version](../../assets/images/running-experiments/image3.png){ loading=lazy, width="80%" }
</figure>

注意，`nvidia-smi` 中显示的 `CUDA Version` 表示当前系统驱动最高支持的 CUDA 运行时版本，不一定等于你当前 conda 环境里 `nvcc -V` 显示的 CUDA Toolkit 版本。判断当前环境的 Toolkit / `nvcc` 版本时，以 `which nvcc` 和 `nvcc -V` 为准。

如果当前环境安装了 PyTorch，也可以用 Python 检查 PyTorch 看到的 CUDA 情况：

```bash
python - <<'PY'
import torch
print("torch:", torch.__version__)
print("torch cuda:", torch.version.cuda)
print("cuda available:", torch.cuda.is_available())
PY
```

这里的 `torch.version.cuda` 表示当前 PyTorch 构建所对应的 CUDA 版本，也不一定等于系统 `nvidia-smi` 显示的版本。

### 8.5 常见问题

**`nvidia-smi` 显示 CUDA 12.x，是不是我已经安装了 CUDA Toolkit？**

不一定。`nvidia-smi` 里的 `CUDA Version` 只是驱动支持的最高 CUDA 运行时版本。

**`nvcc: command not found` 怎么办？**

确认是否激活了正确的 conda 环境：

```bash
conda activate cuda116-demo
which python
which nvcc
```

如果没有输出，说明当前环境没有安装 `nvcc`。

**可以用 pip 安装 CUDA 吗？**

NVIDIA 也提供 pip wheels，适合某些 Python 运行时依赖。但 pip 方式主要面向 Python 包依赖管理，并不总是包含完整开发工具。对实验室服务器上的项目环境，优先使用框架官方命令或 conda 安装；只有项目明确要求时再使用 pip 的 NVIDIA CUDA 包。

**驱动太旧会怎样？**

如果服务器系统驱动太旧，即使 conda 环境里安装了较新的 CUDA Toolkit，也可能无法正常运行对应的 GPU 程序。遇到这类问题，请联系管理员。

### 8.6 重新登录后激活环境

重新登录服务器后，需要重新激活环境：

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda activate cuda116-demo
```

如果你已经运行过 `conda init bash` 并重新打开了终端，通常可以直接执行：

```bash
conda activate cuda116-demo
```

## 9. 运行实验

每次启动实验前，建议固定做这几步：

```bash
whoami
hostname
pwd
nvidia-smi
```

进入项目目录，启用 Miniforge，并激活项目环境：

```bash
cd ~/projects/nerf-room1
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda activate nerf-room1
which python
```

然后再运行训练：

```bash
python train.py
```

配合 `tmux` 和日志时，推荐：

```bash
mkdir -p logs
python train.py 2>&1 | tee "logs/train_$(date +%Y%m%d_%H%M%S).log"
```

关于长时间实验如何不断线运行，请看 [tmux 和运行实验](tmux-and-experiments.md)。

## 10. 导出和复现实验环境

如果希望别人复现实验，可以导出环境文件：

```bash
conda activate nerf-room1
conda env export --from-history > environment.yml
```

`--from-history` 只记录你主动安装的包，文件通常更干净。

别人复现时可以运行：

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda env create -f environment.yml
conda activate nerf-room1
```

如果项目主要使用 `pip` 包，也可以记录：

```bash
python -m pip freeze > requirements.txt
```

但对于 CUDA、PyTorch、OpenCV 等复杂依赖，优先使用 conda 管理会更好。

## 11. VS Code Remote SSH 中使用

通过 VS Code Remote SSH 打开项目后，如果 Python 扩展没有自动识别环境，可以手动选择解释器：

```text
Command Palette -> Python: Select Interpreter
```

选择类似下面的路径：

```text
/home/your-name/opt/miniforge3/envs/nerf-room1/bin/python
```

如果 VS Code 终端里还不能使用 `conda activate`，先执行：

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda activate nerf-room1
```

## 12. 空间和清理

conda 环境可能很大，一个深度学习环境占用几 GB 很常见。定期查看空间：

```bash
du -sh ~/opt/miniforge3
conda env list
```

删除不再使用的环境：

```bash
conda remove -n nerf-room1 --all -y
```

清理下载缓存：

```bash
conda clean -a
```

## 13. 常见问题

### 不小心装进 base 了

先停止继续安装。以后创建项目环境：

```bash
conda create -n my-project python=3.11 -y
conda activate my-project
```

如果 `base` 已经很乱，不要随便手动删除里面的文件。先问管理员或有经验的同学。

### 想卸载 Miniforge

如果之前运行过 `conda init bash`，先撤销 shell 初始化：

```bash
~/opt/miniforge3/bin/conda init --reverse bash
```

然后删除安装目录：

```bash
rm -rf ~/opt/miniforge3
```

如果撤销命令不可用，也可以手动编辑 `~/.bashrc`，删除 conda 初始化块。删除前请确认路径，避免误删其他文件。

## 参考

- [Princeton Research Computing: Python](https://researchcomputing.princeton.edu/support/knowledge-base/python)
- [Harvard FASRC: Python Programming Language](https://docs.rc.fas.harvard.edu/kb/python/)
- [NIH Biowulf: Conda on Biowulf](https://hpc.nih.gov/docs/diy_installation/conda.html)
- [University of Florida Research Computing: Computation](https://docs.rc.ufl.edu/quickstart/computation/)
- [Yale Center for Research Computing: Jupyter Conda Environments](https://docs.ycrc.yale.edu/clusters-at-yale/access/ood-jupyter/)
- [conda-forge/miniforge](https://github.com/conda-forge/miniforge)
- [NVIDIA CUDA Installation Guide for Linux: Conda Installation](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
- [NVIDIA CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive)
- [NVIDIA cuda-toolkit on Anaconda.org](https://anaconda.org/nvidia/cuda-toolkit)
- [NVIDIA cuda-toolkit labels on Anaconda.org](https://anaconda.org/nvidia/cuda-toolkit/labels)
- [NVIDIA cuda-nvcc on Anaconda.org](https://anaconda.org/nvidia/cuda-nvcc)
- [NVIDIA CUDA Compiler Driver NVCC](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/index.html)
- [PyTorch: Get Started Locally](https://pytorch.org/get-started/locally/)
