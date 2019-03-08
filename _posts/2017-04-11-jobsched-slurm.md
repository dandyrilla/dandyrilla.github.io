---
layout: post
title: Slurm Workload Manager
description: 작업 스케쥴러 slurm의 사용법을 알아봅니다.
tags: [sge, slurm, job scheduler]
comments: true
share: true
---


### 1. 작업을 제출하고, 확인하고, 삭제하기

slurm에서의 작업 제출(job submission)은 `sbatch` 명령어를 통해 이루어집니다. `sbatch` 명령어의 첫 번째 인자에는 여러분이
하고자 하는 분석이 담긴 작업 스크립트 파일명을 넣어주면 됩니다. 아래 예제에서는 `job_script.sh`라는 이름으로 작업
스크립트 파일을 만들었습니다. 이를 slurm에 작업으로 제출하는 방법입니다.

```
$ sbatch job_script.sh
Submitted batch job 1465
```

작업이 문제 없이 제출이 되면 'Submitted batch job {JOBID}'와 같은 메시지를 출력합니다. 여기서 `JOBID`는 제출된 작업에
부여된 식별 번호입니다. 이는 작업을 제출할 때마다 1씩 증가합니다. 작업 스크립트는 어떻게 작성해야 하는지 몇 가지
가이드라인이 있습니다. 이에 관해서는 아래의 '[작업 스크립트 작성하기](#2-작업-스크립트-작성하기)' 항목에서 자세히
다루겠습니다.

제출한 작업들의 목록을 확인(job status)하려면 `squeue` 명령어만 입력하고 엔터를 치면 됩니다. 작업들의 목록이 테이블
형태로 보여지죠. 테이블에 있는 각 필드들의 뜻은 다음과 같습니다.

* `JOBID` : 제출한 작업의 식별 번호
* `PARTITION` : 현재 작업이 제출된 파티션의 이름 (slurm에서의 partition은 SGE에서의 queue와 같은 개념)
* `NAME` : 작업의 이름
* `USER` : 작업을 제출한 리눅스 계정의 이름
* `ST` : 현재 작업의 상태 (R: running, PD: pending)
* `NODELIST` : 현재 이 작업을 수행할 수 있도록 할당된 컴퓨터 노드들

```
$ squeue

 JOBID  PARTITION         NAME USER  ST  TIME  NODES  NODELIST(REASON)
  1465     normal  Sukjun.calc  lab  R   0:05      1  node1
  1466     normal  Sukjun.calc  lab  R   0:05      1  node2
  1467     normal  Sukjun.calc  lab  R   0:05      1  node3
```

현재 실행중인 작업을 중지시킬 필요가 있거나 작업을 잘못 제출하였을 때 작업을 삭제(job deletion)하려면 `scancel`라고
입력한 후 뒤에 취소할 작업 번호(JOBID)를 적어주면 됩니다.

```
$ scancel 1466
```

일단 기본적으로 작업을 제출하고, 제출한 작업 목록들을 살펴보고, 원치 않는 작업들을 삭제하는 것을 알아보았습니다.
그렇다면, 작업 스크립트는 어떻게 작성해야 할까요?


### 2. 작업 스크립트 작성하기

sbatch 명령어를 통해 작업을 제출할 때 뒤에 작업 스크립트의 이름만을 적어주었지요. 그렇다면 각종 옵션들은 어디에
적어줄까? 바로 작업 스크립트에 `#SBATCH`라고 시작한 후 이 뒷 부분에 써줄 수 있습니다. bash 쉘에서는 주석 기호가 `#`이기
때문에 주석으로 해석되어 아무런 영향이 없지만, slurm은 `#SBATCH`라고 시작되는 줄이 있으면 sbatch에 넘겨주는 옵션과
인수들로 인지합니다. 다음은 파이썬 프로그램을 실행시키기 위한 작업 스크립트의 예제인 `job_script.sh`이다. 자주 사용하는
옵션을 먼저 설명하겠습니다.

#### 2.1 작업의 이름(-J) 및 작업 스크립트의 출력 파일(-o) 지정하기

```bash
#!/bin/bash

#SBATCH -J Sukjun.analysis   # job name
#SBATCH -o log/Sukjun.analysis.%j.out   # standard output and error log

python analysis.py
```

작업의 이름은 `-J`옵션을 이용하면 됩니다. 이는 squeue 명령어를 통해 제출된 작업들의 목록을 볼 때 NAME 부분에 표시됩니다.
작업 스크립트에서 표준출력(standard output)이나 표준에러(standard error)가 나온다면 이를 파일로 저장해둘 수 있는데 이
때의 출력 파일 이름을 `-o`옵션으로 지정해줄 수 있습니다. 이름 중에 `%j`라고 쓰인 부분은 작업이 제출되고 난 뒤에
sbatch에서 부여되는 작업의 고유번호를 말합니다. 작업의 고유번호가 1465라 부여되었다면 작업 스크립트의 출력은
`log/Sukjun.analysis.1465.out`라는 파일에 쓰여질 것입니다. 작업 이름과 작업 결과 파일명을 꼭 명시해줄 필요는 없습니다.
명시해주지 않았을 때에는 작업 이름은 작업 스크립트명이 되므로 `job_script.sh`라 나타나게 되고 작업 결과 파일은 sbatch를
실행한 현재 디렉토리에 `slurm-1465.out`라는 이름으로 생성되게 됩니다. 하지만 여러 사용자가 쓰는 서버의 경우에는 어느
사용자가 돌렸고, 어떤 내용의 작업인지를 대략적으로 작업 목록에서 알 수 있게 하기 위해 작업의 이름을 지정하고 작업 결과
파일명을 지정하는 것을 권장합니다.

#### 2.2 작업 자원 제한하기

```bash
#SBATCH --ntasks=1        # Run on a single CPU
#SBATCH --mem=1gb         # Memory limit
#SBATCH --time=00:30:00   # Time limit hh:mm:ss
```

작업을 수행할 때 여러 종류의 자원(CPU, 메모리, 시간 등)이 필요합니다. 하지만 여러 사람들이 같이 쓰는 경우에는 작업에
필요한 자원들의 제한을 걸어두어야 할 때가 있습니다. 수행하는 작업이 CPU core 1개를 쓰는 작업이라면 `--ntasks=1` 옵션을
지정해주면 되고, 메모리는 1기가 이상은 쓰지 않도록 제한하려면 `--mem=1gb`라 지정해주면 됩니다. 또한 작업이 최대
30분까지만 실행되도록 실행되도록 하고 싶다면 `--time=00:30:00`으로 시간을 제한하면 됩니다.

### 3. 작업 제출 환경 설정

#### 3.1 현재 작업 파티션 보기

```
$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
normal*      up 2-00:00:00      3   idle node[1-3]
```

#### 3.2 작업 파티션 생성하기

`scontrol create` 명령어 이용
