---
layout: post
title: "pyenv, virtualenv 설치 및 사용법"
description: 파이썬을 쉽게 설치할 수 있도록 도와주는 pyenv 와 가상환경을 분리하여 관리할 수 있는 virtualenv 사용법에 대해 알아본다.
tags: [pyenv, virtualenv]
comments: true
share: true
---

파이썬을 쉽게 설치할 수 있도록 도와주는 pyenv 와 가상환경을 분리하여 관리할 수 있는 virtualenv 사용법에 대해 알아본다.

## pyenv 및 python 설치 후 virtualenv 가상환경 생성하기

### Step 1: pyenv 설치

다음의 명령어를 이용하여 pyenv 를 설치한다.

```bash
curl https://pyenv.run | bash
```


### Step 2: Shell 환경에 pyenv 설정 반영

다음의 내용을 .bashrc 스크립트에 추가하여 pyenv 가 shell 시작 시 자동으로 로드되도록 만든다.

```
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

서버에 다시 접속하여 다음과 같이 pyenv 가 제대로 동작하는지 확인한다. 여기에서는 버전을 한번 출력해 보았다.

```bash
pyenv --version
```

```
pyenv 2.4.1
```


### Step 3: 필요한 버전의 python 설치

아래와 같이 pyenv 를 통하여 python 3.11.8 버전을 설치한다.

```bash
pyenv install 3.11.8
```

성공한 경우 아래의 메시지를 볼 수 있다.

```
Downloading Python-3.11.8.tar.xz...
-> https://www.python.org/ftp/python/3.11.8/Python-3.11.8.tar.xz
Installing Python-3.11.8...
Installed Python-3.11.8 to /home/ubuntu/.pyenv/versions/3.11.8
```

다음과 같은 명령을 이용하면 현재 pyenv 로부터 설치되어 있는 버전들을 확인해볼 수 있다. system 외에 3.11.8 버전이 추가된 것을 볼 수 있다.

```bash
pyenv versions
```

```
* system (set by /home/ubuntu/.pyenv/version)
  3.11.8
```

(참고) 만약 python 설치에 에러가 있었다면 시스템에서 필요한 라이브러리가 제대로 설치되어 있지 않기 때문일 수 있다.
아래의 명령어를 통해 필요 라이브러리들을 설치 후 다시 한번 시도를 해보는 것을 권장한다.

```
sudo apt-get install -y \
    make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
    libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils \
    tk-dev libffi-dev liblzma-dev python-openssl git
```


### Step 4: 가상 환경 생성 및 확인

앞서 설치한 python 3.11.8 버전 기반으로 py311 라는 이름의 가상환경을 생성한다.

```bash
pyenv virtualenv 3.11.8 py311
```

추가된 가상환경은 아래와 같이 확인할 수 있다.

```bash
pyenv virtualenvs
```

```
  3.11.8/envs/py311 (created from /home/ubuntu/.pyenv/versions/3.11.8)
  py311 (created from /home/ubuntu/.pyenv/versions/3.11.8)
```

(참고) 만약 python 을 설치하지 않고 가상환경을 만든다면 다음과 같은 에러가 발생한다.
예를 들어 앞서 미리 설치되지 않은 3.11.5 라는 버전에 대해 가상환경을 생성하려는 시도를 해 보았다.

```bash
pyenv virtualenv 3.11.5 py311
```

그러면 다음과 같이 pyenv 에 설치되어 있지 않은 파이썬 버전이므로 파이썬 설치부터 먼저 진행하라는 안내 문구가 나온다.

```
pyenv-virtualenv: `3.11.5' is not installed in pyenv.
Run `pyenv install 3.11.5' to install it.
```


### Step 5: 가상환경 적용 (activate)

다음의 명령어를 통하여 가상환경을 적용시킬 수 있다.

```bash
pyenv activate py311
```

가상 환경이 적용되면 명령줄 프롬프트의 맨 앞에 `(py311)` 이 추가된다.

```
(py311) ubuntu@ip-10-144-193-3:~$
```

다음과 같이 파이썬 버전이 가상환경에서 사용되는 3.11.8 버전으로 변경된 것을 확인할 수 있다.

```bash
python3 --version
```

```
Python 3.11.8
```


### Step 6: 적용된 가상환경 해제 (deactivate)

다음의 명령어를 통하여 적용된 가상환경을 해제시킬 수 있다.

```bash
pyenv deactivate
```

가상 환경이 해제되면 명령줄 프롬프트에 있던 `(py311)` 표시가 사라진다.

```
ubuntu@ip-10-144-193-3:~$
```

다음과 같이 파이썬 버전이 3.8.10 으로 되돌아 온 것을 확인해 볼 수 있다.

```bash
python3 --version
```

```
Python 3.8.10
```


### Step 7: 해당 폴더에 가상환경 적용

일단 현재 상태의 python 버전을 확인해 보면, 3.8.10 버전으로 잡혀있는 것을 볼 수 있다.

```bash
python3 --version
```

```
Python 3.8.10
```

가상환경이 적용될 폴더를 위해 임시로 `project` 라는 이름의 폴더를 만들고 해당 폴더로 들어가 가상환경을 적용해 보았다.

```bash
cd project
pyenv local py311
```

해당 폴더 내에 `.python-version` 이라는 파일이 생성되며,
명령줄 프롬프트 앞에 `(py311)` 도 붙어있는 것을 확인할 수 있다.

```bash
cat .python-version
```

```
py311
```

또한 이 폴더 내에서 파이썬 버전을 살펴보면 기존 system 버전인 3.8.10 이 아닌 3.11.8 버전으로 잡혀있는 것을 볼 수 있다.

```bash
python3 --version
```

```
Python 3.11.8
```


## pyenv 삭제하기

pyenv 삭제는 별도의 과정이 필요 없이 해당 폴더나 파일들만 제대로 지워주면 된다.

### Step 1. pyenv 폴더 삭제

사용자의 홈 디렉토리에서 `.pyenv` 폴더를 삭제한다.

```bash
cd ~
rm -rf .pyenv
```

### Step 2. pyenv 관련하여 추가된 설정 제거

pyenv 를 설치하면서 추가한 `.bashprofile` 혹은 `.bashrc` 파일 내 라인들을 제거한다.

### Step 3. (선택 사항) 각 프로젝트 폴더 내 `.python-version` 파일 삭제하기

각 프로젝트 폴더 내 `.python-version` 파일들을 삭제한다.
나중에 pyenv 를 다시 설치하면서 동일한 가상환경 이름을 사용한다면 굳이 삭제하지 않아도 되겠지만 깔끔하게 하기 위해 삭제할 것을 권장한다.

## Errors

### ModuleNotFoundError: No module named ...

파이썬 설치 시 시스템 내 특정 라이브러리를 찾지 못하는 경우에 에러가 발생할 수 있다.

```
sukjun@207f9fbfcb7b:~$ pyenv install 3.8
Downloading Python-3.8.19.tar.xz...
-> https://www.python.org/ftp/python/3.8.19/Python-3.8.19.tar.xz
Installing Python-3.8.19...
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/sukjun/.pyenv/versions/3.8.19/lib/python3.8/ctypes/__init__.py", line 7, in <module>
    from _ctypes import Union, Structure, Array
ModuleNotFoundError: No module named '_ctypes'
WARNING: The Python ctypes extension was not compiled. Missing the libffi lib?
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/sukjun/.pyenv/versions/3.8.19/lib/python3.8/sqlite3/__init__.py", line 23, in <module>
    from sqlite3.dbapi2 import *
  File "/home/sukjun/.pyenv/versions/3.8.19/lib/python3.8/sqlite3/dbapi2.py", line 27, in <module>
    from _sqlite3 import *
ModuleNotFoundError: No module named '_sqlite3'
WARNING: The Python sqlite3 extension was not compiled. Missing the SQLite3 lib?
Installed Python-3.8.19 to /home/sukjun/.pyenv/versions/3.8.19
```

위의 에러에서는 libffi 와 SQLite3 라이브러리가 없어서 아래와 같이 별도로 설치한 뒤에 다시 파이썬을 설치하였다.

```
sudo apt-get install -y libffi-dev libsqlite3-dev
```
