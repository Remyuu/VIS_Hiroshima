# Python 実験環境の分離

このページでは、研究室サーバーに Miniforge3 をインストールし、conda を使って実験ごとに独立した Python 環境を作成する方法を説明します。

実験ではシステムの Python に依存しないでください。プロジェクトごとに別々の環境を使い、依存関係の管理には conda を優先してください。

<figure markdown="span">
  ![Python-environment-meme](../../assets/images/running-experiments/image1.png){ loading=lazy, width="60%" }
  <figcaption>https://programmerhumor.io/python-memes/gis-and-ml-is-a-whole-new-world-of-hurt/</figcaption>
</figure>

!!! note "Miniforge と Miniconda のどちらを使う？"

    このガイドでは一貫して Miniforge3 を使用します。Miniforge はデフォルトで `conda-forge` を使い、Miniconda は Anaconda のデフォルトパッケージチャンネルを使います。どちらも軽量な Conda ディストリビューションですが、このガイドではコミュニティによって開発され、商用ライセンスの懸念がない Miniforge を選んでいます。

    すでにお使いのコンピューターに Miniconda がインストールされている場合、すぐに置き換える必要はありません。ほとんどの conda コマンドはそのまま使えます。

    Miniforge と Miniconda を同時にインストールしないでください。また、同じ環境内で異なるパッケージチャンネルを安易に混ぜないでください。

    **どちらを使うべきか分からない場合は、Miniforge を使ってください。**

## 1. なぜ環境分離が必要か

実験によって、必要な Python やパッケージのバージョンがまったく異なることがあります。たとえば次のようなケースです。

```text
project-a needs Python 3.10 + torch 2.4
project-b needs Python 3.11 + torch 2.6
project-c needs an older numpy
```

正しい習慣は「1 プロジェクトにつき 1 つの conda 環境」です。

## 2. まずサーバーのデフォルト環境を確認する

ログインしたら、まず現在の環境を確認します。

```bash
uname -m
cat /etc/os-release | sed -n '1,8p'
python3 --version
python3 -m pip --version
command -v conda
conda --version
```

デフォルトのサーバー環境では、ログは次のようになります。

```text
x86_64
Ubuntu 24.04.3 LTS
Python 3.12.3
/usr/bin/python3: No module named pip
conda: command not found
```

これは、サーバーにシステムの Python は入っているものの、Miniforge / conda はデフォルトでは用意されていないことを意味します。システムの Python はオペレーティングシステム用のものであり、一般ユーザーには変更する権限がありません。

!!! warning "システムの Python を変更しないこと"

    システムの Python を実験環境として使わないでください。一般ユーザーには sudo 権限がありません。実験の依存関係は、自分の Miniforge / conda 環境に入れるべきです。

`pip` をそのまま入力すると、次のようなメッセージが表示されることがあります。

```text
コマンド 'pip' が見つかりません。次の方法でインストールできます:
apt install python3-pip
管理者に確認してください。
```

これは、システムレベルの `pip` コマンドがインストールされていないことを意味します。実験ユーザーにとって正しい対処は `apt install python3-pip` ではなく、自分用の Miniforge をインストールして使うことです。

## 3. Miniforge のインストール

Miniforge は軽量な conda ディストリビューションで、デフォルトで `conda-forge` を使用します。完全な Anaconda ディストリビューションと比べて、個人の実験環境管理により適しています。

ホームディレクトリ以下にインストールします。

```text
~/opt/miniforge3
```

インストーラーをダウンロードします。

```bash
mkdir -p ~/opt
cd ~/opt
curl -L -O https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
```

自動インストールを実行します。

```bash
bash Miniforge3-Linux-x86_64.sh -b -p ~/opt/miniforge3
```

結果を確認します。

```bash
~/opt/miniforge3/bin/conda --version
~/opt/miniforge3/bin/python --version
```

次のような出力が表示されれば、インストールは成功です。

```bash
jie-zhang@Ubuntu:~/opt$ ~/opt/miniforge3/bin/conda --version
conda 26.3.2
jie-zhang@Ubuntu:~/opt$ ~/opt/miniforge3/bin/python --version
Python 3.13.13
```

## 4. conda を有効化する

インストール直後は、現在のシェルが `conda` の場所を認識していないことがあります。まず手動で読み込みます。

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
```

その後、確認します。

```bash
conda --version
```

## 5. ~/.bashrc に書き込むべきか（推奨）

ログインのたびに `conda activate` を直接使いたい場合は、次を実行します。

```bash
~/opt/miniforge3/bin/conda init bash
```

そのあと、新しい SSH 端末を開くか、次を実行します。

```bash
source ~/.bashrc
```

`base` への自動アクティベートは無効にしておくことをおすすめします。

```bash
conda config --set auto_activate false
```

> 旧バージョンの conda コマンド： `conda config --set auto_activate_base false`

こうしておくと、ログイン後に `(base)` が自動で表示されなくなり、端末がすっきりします。

初心者には `conda init` の実行をおすすめします。`~/.bashrc` を変更したくない場合は、毎回手動で次の 1 行を実行しても構いません。

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
```

## 6. プロジェクト用環境を作成する

環境名はプロジェクト名と揃えるのが望ましいです。たとえばプロジェクトが `nerf-room1` という名前なら、次のようにします。

```bash
conda create -n nerf-room1 python=3.11 -y
conda activate nerf-room1
```

現在の Python がどこから来ているかを確認します。

```bash
which python
python --version
```

出力は次のようになるはずです。

```bash
(nerf-room1) jie-zhang@Ubuntu:~$ which python
/home/jie-zhang/opt/miniforge3/envs/nerf-room1/bin/python
(nerf-room1) jie-zhang@Ubuntu:~$ python --version
Python 3.11.15
```

!!! warning "base に依存関係をインストールしないこと"

    `base` は `conda` などの環境管理ツールを提供するためだけに使うべきです。学習コードが必要とする `torch`、`tensorflow`、`opencv`、`numpy` などの依存関係は、プロジェクト専用の環境に入れてください。

## 7. プロジェクトの依存関係をインストールする

複雑な依存関係には conda を優先します。

```bash
conda install numpy pandas matplotlib -y
```

プロジェクトが `requirements.txt` を提供しており、すでにプロジェクト環境をアクティベートしている場合は、次のようにします。

```bash
python -m pip install -r requirements.txt
```

一時的に 1 つだけ pip パッケージをインストールしたい場合も、次の書き方を優先してください。

```bash
python -m pip install package-name
```

こうすることで、`pip` が現在アクティブな Python 環境に属することが保証されます。

!!! warning "環境の外で pip install を実行しないこと"

    conda 環境をアクティベートする前に `pip install` を実行しないでください。

    conda 環境をアクティベートする前に `pip install` を実行しないでください。

    conda 環境をアクティベートする前に `pip install` を実行しないでください。

## 8. conda 環境で特定の CUDA-Toolkit バージョンを使う

研究室のサーバーは複数のユーザーで共有されています。OS レベルで自分で CUDA をインストールしたり変更したりしないでください。`/usr/local/cuda`、システムの環境変数、ドライバ関連コンポーネントへのグローバルな変更は、他の学生が現在実行中の実験に影響を与えるおそれがあります。

より安全な方法は、自分の conda 環境の中に、プロジェクトが必要とする CUDA ランタイム、CUDA Toolkit、あるいはディープラーニングフレームワークの CUDA バージョンをインストールすることです。こうすれば、システム全体の環境を変更することなく、プロジェクトごとに異なる CUDA 関連の依存関係を使えます。

!!! note "まずいくつかの概念を区別する"

    - 「NVIDIA Driver / GPU ドライバ」はシステムレベルのコンポーネントで、管理者が保守します。`nvidia-smi` が GPU を正常に表示できるかどうかは、主にドライバに依存します。
    - 「CUDA Runtime」は、すでにコンパイルされた CUDA プログラムを実行するために必要なユーザー空間のライブラリです。多くの PyTorch / TensorFlow のインストールパッケージには基本的に含まれています。
    - 「**CUDA Toolkit**」は、開発とコンパイルのための完全なツールキットです。通常、ヘッダーファイル、ライブラリ、デバッグ / プロファイリングツール、`nvcc` などのコンパイル関連ツールが含まれます。
    - 「`nvcc`」は NVIDIA CUDA Compiler Driver です。`.cu` ファイル、CUDA 拡張、またはローカルでの CUDA コンパイルを必要とするパッケージのコンパイルに使われます。PyTorch モデルの学習と推論を行うだけなら、通常 `nvcc` を単独でインストールする必要はありません。

!!! warning "CUDA を base にインストールしないこと"

    NVIDIA も公式に、`base` 環境ではなく専用の conda 環境に CUDA をインストールすることを推奨しています。実験プロジェクト間では CUDA / PyTorch / Python のバージョンが異なることが多く、それらを `base` に混在させると、後のデバッグが難しくなります。

### 8.1 いつ何をインストールするか

PyTorch や TensorFlow などのフレームワークをインストールするだけなら、通常はまずフレームワークの公式インストールページを確認します。たとえば PyTorch では、Linux、インストール方法、Python、CUDA バージョンを選択すると、対応するコマンドが生成されます。この場合、一般的にはシステムレベルの CUDA Toolkit を先にインストールする必要はなく、`nvcc` も必ずしも必要ありません。

インストールパッケージが `nvcc` を見つけられないと表示された場合、またはプロジェクトの README で特定の CUDA Toolkit バージョンが明示的に要求されている場合は、CUDA コードをコンパイルするために CUDA Toolkit をインストールする必要があります。

エラーが `nvcc` の不足だけを示している場合は、まず `cuda-nvcc` だけをインストールしてみるとよいでしょう。

### 8.2 CUDA バージョンの確認先

一般的には、NVIDIA 公式サイトの [NVIDIA CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive) で、CUDA Toolkit の公式な過去バージョン、リリース日、対応するドキュメントを確認できます。

また、Conda 公式サイトの [`cuda-toolkit` labels on Anaconda.org](https://anaconda.org/nvidia/cuda-toolkit/labels) で、conda パッケージとして利用できる CUDA ラベル（たとえば `cuda-11.6.2` や `cuda-12.4.0`）を確認できます。

`nvcc` を単独でインストールしたい場合は、[`cuda-nvcc` on Anaconda.org](https://anaconda.org/nvidia/cuda-nvcc) を参照してください。

!!! tip "バージョン番号と conda ラベルの関係"

    conda で古い NVIDIA CUDA パッケージをインストールするときの一般的なパターンは、バージョンをチャンネルラベルに書くことです。たとえば `-c nvidia/label/cuda-12.4.0` のように書きます。このラベルは、Anaconda.org に掲載されているラベルと一致している必要があります。

### 8.3 推奨インストール方法：プロジェクト環境内にインストールする

たとえば、CUDA 11.6 が必要な環境を作成します。

```bash
conda create -n cuda116-demo python=3.10 -y
conda activate cuda116-demo
```

NVIDIA 公式の conda インストール手順は [CUDA Installation Guide for Linux: Conda Installation](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#conda-installation) にあります。研究室のサーバーでは、プロジェクト専用の conda 環境内にインストールすることを優先してください。

よく使われる NVIDIA の conda パッケージは、次のように理解できます。

| パッケージ | 適した状況 | 説明 |
| --- | --- | --- |
| `cuda-toolkit` | 比較的完全な CUDA Toolkit が必要 | CUDA 開発でよく使うツール、ヘッダーファイル、ライブラリを含みます。 |
| `cuda` | プロジェクトの README や NVIDIA 公式コマンドが明示的に要求している | NVIDIA 公式ドキュメントで、一連の CUDA Toolkit コンポーネントをインストールするために使われるメタパッケージです。 |
| `cuda-nvcc` | エラーが `nvcc` の不足だけ、または CUDA コンパイラだけが必要 | 完全な Toolkit より小さく、後でヘッダーファイルやライブラリが不足したら `cuda-toolkit` をインストールします。 |

比較的完全な CUDA Toolkit が必要な場合は、`cuda-toolkit` をインストールできます。

```bash
conda install -c nvidia/label/cuda-11.6.2 cuda-toolkit
```

プロジェクトの README が NVIDIA 公式の conda CUDA パッケージを直接要求している場合は、`cuda` メタパッケージを目にすることもあります。これは一連の CUDA Toolkit コンポーネントをインストールします。

```bash
conda install -c nvidia/label/cuda-11.6.2 cuda
```

エラーが `nvcc` の不足だけを示している場合は、まずより小さい `cuda-nvcc` をインストールできます。

```bash
conda install -c nvidia/label/cuda-11.6.2 cuda-nvcc
```

**どのパッケージをインストールするかは、まずプロジェクトの README、講義の指示、エラーメッセージで判断してください。一般的には、PyTorch / TensorFlow を実行するだけなら、まずフレームワークの公式コマンドでフレームワークをインストールし、Toolkit を先にインストールしないでください。`.cu` や CUDA 拡張をコンパイルする必要がある場合は、まず `cuda-toolkit` をインストールします。エラーが `nvcc` の不足だけなら、まず `cuda-nvcc` だけをインストールしてみてください。完全な CUDA 開発環境が必要な場合は、`cuda-toolkit`、またはプロジェクトが明示的に要求する `cuda` メタパッケージをインストールします。**

### 8.4 現在の環境の CUDA と `nvcc` を確認する

インストール後、確認します。

```bash
which nvcc
nvcc -V
```

次のような出力が表示されれば、現在の conda 環境の `nvcc` は CUDA 11.6 です。

```text
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2022 NVIDIA Corporation
Built on Tue_Mar__8_18:18:20_PST_2022
Cuda compilation tools, release 11.6, V11.6.124
Build cuda_11.6.r11.6/compiler.31057947_0
```

`which nvcc` が現在の conda 環境（たとえば `~/opt/miniforge3/envs/cuda116-demo/bin/nvcc`）を指していれば、この環境の `nvcc` を使っていることを意味します。

システムの GPU とドライバの状態も確認することをおすすめします。

```bash
nvidia-smi
```

<figure markdown="span">
    ![cuda-version](../../assets/images/running-experiments/image3.png){ loading=lazy, width="80%" }
</figure>

`nvidia-smi` が表示する `CUDA Version` は、現在のシステムドライバがサポートする最も高い CUDA ランタイムバージョンを意味することに注意してください。これは、現在の conda 環境内で `nvcc -V` が表示する CUDA Toolkit バージョンと必ずしも同じではありません。現在の環境の Toolkit / `nvcc` バージョンを判断するには、`which nvcc` と `nvcc -V` を使ってください。

現在の環境に PyTorch がインストールされている場合は、Python を使って PyTorch から見える CUDA の状況を確認することもできます。

```bash
python - <<'PY'
import torch
print("torch:", torch.__version__)
print("torch cuda:", torch.version.cuda)
print("cuda available:", torch.cuda.is_available())
PY
```

ここでの `torch.version.cuda` は、現在の PyTorch ビルドに対応する CUDA バージョンを意味し、これもシステムの `nvidia-smi` が表示するバージョンと必ずしも等しいわけではありません。

### 8.5 よくある質問

**`nvidia-smi` に CUDA 12.x と表示されています。これは CUDA Toolkit をすでにインストールしたという意味ですか？**

必ずしもそうではありません。`nvidia-smi` の `CUDA Version` は、ドライバがサポートする最も高い CUDA ランタイムバージョンを示すだけです。

**`nvcc: command not found` が出たらどうすればよいですか？**

正しい conda 環境をアクティベートしているか確認してください。

```bash
conda activate cuda116-demo
which python
which nvcc
```

何も出力されなければ、現在の環境に `nvcc` がインストールされていないことを意味します。

**pip で CUDA をインストールできますか？**

NVIDIA は pip wheel も提供しており、一部の Python ランタイム依存関係には適しています。ただし、pip による方法は主に Python パッケージの依存関係管理を対象としており、完全な開発ツールを必ずしも含みません。研究室サーバー上のプロジェクト環境では、フレームワークの公式コマンドまたは conda でのインストールを優先し、プロジェクトが明示的に要求する場合にのみ pip の NVIDIA CUDA パッケージを使ってください。

**ドライバが古すぎるとどうなりますか？**

サーバーのシステムドライバが古すぎる場合、conda 環境内に新しい CUDA Toolkit をインストールしても、対応する GPU プログラムが実行できないことがあります。この種の問題に遭遇したら、管理者に連絡してください。

### 8.6 再ログイン後に環境を再有効化する

サーバーに再度ログインしたら、環境を再アクティベートします。

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda activate cuda116-demo
```

すでに `conda init bash` を実行して新しい端末を開いている場合は、通常は次を実行するだけで済みます。

```bash
conda activate cuda116-demo
```

## 9. 実験を実行する

実験を始める前に、次を確認する習慣をつけましょう。

```bash
whoami
hostname
pwd
nvidia-smi
```

プロジェクトディレクトリに移動し、Miniforge を有効化して、プロジェクト環境をアクティベートします。

```bash
cd ~/projects/nerf-room1
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda activate nerf-room1
which python
```

その後、学習を実行します。

```bash
python train.py
```

`tmux` とログを併用する場合の推奨コマンドは次のとおりです。

```bash
mkdir -p logs
python train.py 2>&1 | tee "logs/train_$(date +%Y%m%d_%H%M%S).log"
```

長時間の実験を継続して実行し続ける方法については、[tmux と実験の実行](tmux-and-experiments.md) を参照してください。

## 10. 環境のエクスポートと再現

他の人に実験を再現してもらいたい場合は、環境ファイルをエクスポートします。

```bash
conda activate nerf-room1
conda env export --from-history > environment.yml
```

`--from-history` は明示的にインストールしたパッケージだけを記録するため、ファイルは通常よりすっきりします。

他の人は次のコマンドで再現できます。

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda env create -f environment.yml
conda activate nerf-room1
```

プロジェクトが主に `pip` パッケージを使っている場合は、次のように記録することもできます。

```bash
python -m pip freeze > requirements.txt
```

CUDA、PyTorch、OpenCV などの複雑な依存関係には、通常 conda の方が良い選択です。

## 11. VS Code Remote SSH と併用する

VS Code Remote SSH でプロジェクトを開いた後、Python 拡張機能が環境を自動的に検出しない場合は、手動でインタープリタを選択します。

```text
Command Palette -> Python: Select Interpreter
```

次のようなパスを選びます。

```text
/home/your-name/opt/miniforge3/envs/nerf-room1/bin/python
```

VS Code の端末でまだ `conda activate` が使えない場合は、次を実行します。

```bash
source ~/opt/miniforge3/etc/profile.d/conda.sh
conda activate nerf-room1
```

## 12. ディスク使用量とクリーンアップ

conda 環境は大きくなることがあります。ディープラーニング環境で数 GB を使うことはよくあります。ディスク使用量を定期的に確認しましょう。

```bash
du -sh ~/opt/miniforge3
conda env list
```

使わなくなった環境を削除します。

```bash
conda remove -n nerf-room1 --all -y
```

ダウンロードしたパッケージキャッシュをクリーンアップします。

```bash
conda clean -a
```

## 13. FAQ

### 誤って base にパッケージをインストールしてしまった

`base` へのこれ以上のパッケージのインストールをやめてください。今後のプロジェクトでは、プロジェクト環境を作成します。

```bash
conda create -n my-project python=3.11 -y
conda activate my-project
```

`base` がすでに散らかってしまった場合は、その中のファイルを勝手に手動で削除しないでください。まず管理者か経験のある研究室メンバーに相談してください。

### Miniforge のアンインストール

以前に `conda init bash` を実行している場合は、まずシェルの初期化を元に戻します。

```bash
~/opt/miniforge3/bin/conda init --reverse bash
```

その後、インストールディレクトリを削除します。

```bash
rm -rf ~/opt/miniforge3
```

リバースコマンドが使えない場合は、`~/.bashrc` を手動で編集し、conda の初期化ブロックを削除してください。何かを削除する前に、必ずパスを確認してください。

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
