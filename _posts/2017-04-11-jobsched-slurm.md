---
layout: post
title: Slurm 스케쥴러를 이용한 작업의 제출 및 관리
description: 작업 스케쥴러인 slurm workload manager 의 기본 사용법을 알아봅니다.
tags: [sge, slurm, job scheduler]
comments: true
share: true
---


### 1. 작업 스크립트 작성

제일 먼저 해야 할 일은, 여러분이 수행하고 싶은 작업들을 적어놓은 작업 스크립트를 작성하는 일일 것입니다.
여기에서는 리눅스의 기본 쉘인 bash 를 이용한 스크립트를 작성하는 방법을 알아볼 것입니다.
이 블로그의 주제에 맞게 생물정보학 관련 예제를 통해 조금 더 알아봅시다.
다음과 같이 samtools 를 이용하여 bam 파일을 sam 파일로 변환하는 작업을 하고싶다고 해 봅시다.

```
samtools view alignments.bam > alignments.sam
```

그렇다면 이를 bash 스크립트로 만들면 다음과 같은 형태가 될 것입니다.

```
#!/bin/bash

samtools view alignments.bam > alignments.sam
```

이러한 스크립트를 그대로 사용하여 작업을 제출해도 무방하지만,
여기서 slurm 스케쥴러에 넘겨줄 여러 옵션들을 스크립트 파일 내용에 추가로 적어줄 수 있습니다.
줄의 시작이 `#SBATCH` 인 부분이 바로 그러한 기능을 하는 부분인데요.
이 부분은 `#` 으로 시작했기 때문에 bash 입장에서는 주석으로 여겨지므로 아무런 영향이 없고,
slurm 에서는 `#SBATCH` 를 인식하여 이 부분은 수행할 작업에 대한 옵션으로 해석됩니다.
자, 그렇다면 어떠한 옵션들을 주었는지 예제를 통해 한번 살펴볼까요?

```
#!/bin/bash

#SBATCH -J Sukjun.samtools   # job name
#SBATCH -o Sukjun.samtools.%j.out   # standard output and error log

samtools view alignments.bam > alignments.sam
```

저는 이렇게 작성하여 `job_script.sh` 라는 파일명으로 저장해 보았습니다. 이전의 스크립트보다 2줄이 더 추가되었는데요.
작업의 이름을 지정하는 부분의 옵션(`-J`)과 작업 스크립트의 출력 파일을 지정하는 옵션(`-o`)을 넣어주었습니다.
이는 뒤에 소개할 작업들의 목록을 확인할 수 있는 명령어인 `squeue` 를 이용할 때 `NAME` 컬럼 부분에 표시됩니다.

작업 스크립트에서 표준출력(standard output)이나 표준에러(standard error)가 나온다면
이를 파일로 저장해둘 수 있는데 이 때의 출력 파일 이름을 `-o` 옵션으로 지정해 주었습니다.
이름 중에 `%j` 라고 쓰인 부분이 보이실 텐데요. 이는 작업이 제출되고 난 뒤에 부여되는 작업의 고유번호를 말합니다.
작업의 고유번호가 1465 라 부여되었다면 작업 스크립트의 출력은 `Sukjun.samtools.1465.out`라는 파일에 쓰여질 것입니다.

따로 명시해주지 않았을 때에는 작업 이름은 작업 스크립트명이 되므로 `job_script.sh` 라 나타나게 되고
작업 결과 파일은 sbatch 를 실행한 현재 디렉토리에 `slurm-1465.out`라는 이름으로 생성되게 됩니다.
하지만 보통 클러스터는 여러 사용자가 쓰는 경우가 많기 때문에 자신이 제출한 작업이 무엇인지를 찾기 쉽게 하기 위해
자신의 이름 및 어떤 내용의 작업인지를 나타내는 작업의 이름을 지정하는 것을 권장합니다.

자, 그렇다면 몇 가지의 옵션을 더 살펴볼까요?
작업을 수행할 때 여러 종류의 자원들(CPU, 메모리, 시간 등)이 필요합니다.
하지만 여러 사람들이 같이 쓰는 경우에는 작업에 필요한 자원들의 제한을 걸어두어야 할 때가 있습니다.
작업이 너무 많은 CPU 를 사용하려고 하거나, 과도한 메모리의 사용, 또는 너무 오랜시간 돌아가는 경우입니다.
따라서 클러스터 관리자는 사용자들에게 아래와 같은 옵션이 꼭 포함하도록 지시해야 할 경우도 있습니다.

```
#SBATCH --ntasks=1        # Run on a single CPU
#SBATCH --mem=1gb         # Memory limit
#SBATCH --time=00:30:00   # Time limit hh:mm:ss
```

수행하는 작업이 CPU core 1개를 쓰는 작업이라면 `--ntasks=1` 옵션을 지정해주면 되고,
메모리는 1기가 이상은 쓰지 않도록 제한하려면 `--mem=1gb` 라 지정해주면 됩니다.
또한 작업이 최대 30분까지만 실행되도록 실행되도록 하고 싶다면 `--time=00:30:00` 으로 시간을 제한하면 됩니다.


### 2. 작업의 제출, 확인, 삭제

작업 스크립트를 작성했으니, 작업을 제출해 보고, 제출한 작업을 확인하고,
더 나아가 잘못 제출된 작업들이 있을 경우에 삭제하는 방법을 알아보겠습니다.

#### 2.1. 작업의 제출

Slurm 에서의 작업 제출(job submission)은 `sbatch` 명령어를 통해 이루어집니다.
`sbatch` 명령어의 첫 번째 인자에는 앞서 만든 작업 스크립트 파일을 넣어주면 됩니다.
위에서 `job_script.sh` 라는 이름으로 작업 스크립트 파일을 만들었으므로, 이를 이용하여 작업을 제출해 봅니다.

```
$ sbatch job_script.sh
Submitted batch job 1465
```

작업이 문제 없이 제출이 되면 'Submitted batch job {JOBID}' 와 같은 메시지를 출력합니다.
여기서 `JOBID` 는 제출된 작업에 부여된 식별 번호입니다. 이는 작업을 제출할 때마다 1씩 증가합니다.

#### 2.2. 제출된 작업의 확인

제출한 작업들의 목록을 확인(job status)하려면 `squeue` 명령어를 이용합니다.

```
$ squeue

 JOBID  PARTITION         NAME USER  ST  TIME  NODES  NODELIST(REASON)
  1465     normal  Sukjun.samt  lab  R   0:05      1  node1
```

작업들의 목록이 테이블 형태로 보여지죠. 테이블에 있는 각 필드들의 뜻은 다음과 같습니다.

* `JOBID` : 제출한 작업의 식별 번호
* `PARTITION` : 현재 작업이 제출된 파티션의 이름 (slurm에서의 partition은 SGE에서의 queue와 같은 개념)
* `NAME` : 작업의 이름
* `USER` : 작업을 제출한 리눅스 계정의 이름
* `ST` : 현재 작업의 상태 (R: running, PD: pending)
* `NODELIST` : 현재 이 작업을 수행할 수 있도록 할당된 컴퓨터 노드들

한편, 제출된 작업의 이름을 확인할 수 있는 필드인 `NAME` 은 그 길이가 짧아 이름을 확인하기에는 어려움이 많은데요.
이 부분을 해결할 수 있도록 squeue 명령어에 formatting 옵션을 주어 출력할 수 있습니다. 아래의 formatting 옵션 중 `%.50j`
부분이 작업의 이름을 나타내는 필드의 가로 길이를 결정해 주는 부분입니다.

```
squeue --format="%.10i %.9P %.50j %.8u %.8T %.10M %.9l %.6D %R" | sort -n -k1,1
```

저는 이러한 스크립트를 `qsum` (queue summary) 라는 이름의 스크립트로 저장해 놓고 자주 사용합니다.

```
(sjpy3) [sonic@rna1 ~]$ qsum
  JOBID  PARTITION                           NAME     USER    STATE       TIME TIME_LIMI     NODES NODELIST(REASON)
5499940     debug1   Sukjun.prep_reads.TR0078_001    sonic  RUNNING   15:55:56 365-00:00:00      1 n18
5499941     debug1   Sukjun.prep_reads.TR0078_002    sonic  RUNNING   15:55:56 365-00:00:00      1 n19
5499942     debug1   Sukjun.prep_reads.TR0078_003    sonic  RUNNING   15:55:56 365-00:00:00      1 n20
5499943     debug1   Sukjun.prep_reads.TR0078_004    sonic  RUNNING   15:55:56 365-00:00:00      1 n10
5499944     debug1   Sukjun.prep_reads.TR0078_005    sonic  RUNNING   15:55:56 365-00:00:00      1 n11
...
```


#### 2.3. 제출된 작업의 삭제

현재 실행중인 작업을 중지시킬 필요가 있거나 작업을 잘못 제출하였을 때 작업을 삭제(job deletion)하려면
`scancel` 라고 입력한 후 뒤에 취소할 작업 번호(JOBID)를 적어주면 됩니다.

```
$ scancel 1465
```

일단 기본적으로 작업을 제출하고, 제출한 작업 목록들을 살펴보고, 원치 않는 작업들을 삭제하는 것을 알아보았습니다.
다음으로는 제출된 작업들을 관리하는 방법을 알아보겠습니다.

#### 2.4. 작업들의 우선순위 조정

어떤 특정 작업을 더 먼저 수행시키고자 할 때, 해당 작업의 우선순위를 상향 조정시키는 방법이다.
보통 클러스터 관리자가 우선순위를 조정하는데요. 아래는 작업의 우선순위를 높이는 방법을 보여주고 있습니다.

```
$ sudo scontrol update job=1465 nice=-100
```

nice 값은 기본이 0 인데, 기본적으로 음수를 주어야 높은 우선순위로 바뀌고 양수는 낮은 우선순위를 갖도록 합니다.
nice 값을 조정하면 자동적으로 priority 값이 조정이 되어 작업이 실행되는 순서가 바뀌게 된다.
우선순위를 높이는 작업은 권한이 있는 사용자만 가능하기 때문에 sudo 를 붙여야 하고,
우선순위를 낮추는 건 모든 일반 사용자도 가능합니다.


### 3. 환경 설정

Slurm 환경 설정에 대한 방법들을 알아봅니다.

#### 3.1. 파티션 목록 확인

다른 작업 클러스터에 있는 큐(queue) 라는 개념이 slurm 에서는 파티션(partition) 입니다.
Slurm 에 존재하는 파티션의 목록들은 `sinfo` 명령으로 알 수 있습니다.

```
$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
normal*      up 2-00:00:00      3   idle node[1-3]
```

#### 3.2. 파티션 생성

작업 파티션을 생성하기 위해서는 `scontrol create` 명령어를 이용합니다.
관리자 권한이 필요합니다. 다음은 `optiplex` 라는 이름의 파티션을 생성하는 예제입니다.

```
$ sudo scontrol create PartitionName=optiplex
```

파티션이 제대로 생성됐는지 `sinfo` 명령을 통해 확인해 보겠습니다.

```
$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
normal*      up 2-00:00:00      3   idle node[1-3]
optiplex     up   infinite      0    n/a
```

#### 3.3. 파티션 세부 정보 확인

파티션을 생성하면 기본적으로 여러 속성들이 설정되는데, 기본적으로 설정되는 값들은 아래와 같습니다.
`scontrol show partition {partition_name}` 명령을 이용하여 해당 파티션에 설정된 속성들을 확인할 수 있습니다.

```
$ scontrol show partition optiplex
PartitionName=optiplex
   AllowGroups=ALL AllowAccounts=ALL AllowQos=ALL
   AllocNodes=ALL Default=NO QoS=N/A
   DefaultTime=NONE DisableRootJobs=NO ExclusiveUser=NO GraceTime=0 Hidden=NO
   MaxNodes=UNLIMITED MaxTime=UNLIMITED MinNodes=1 LLN=NO MaxCPUsPerNode=UNLIMITED
   Nodes=(null)
   PriorityJobFactor=1 PriorityTier=1 RootOnly=NO ReqResv=NO OverSubscribe=NO
   OverTimeLimit=NONE PreemptMode=OFF
   State=UP TotalCPUs=0 TotalNodes=0 SelectTypeParameters=NONE
   JobDefaults=(null)
   DefMemPerNode=UNLIMITED MaxMemPerNode=UNLIMITED
```

이 상태로 파티션에 작업을 제출하면 작업이 실행되지 않고 대기중(PD, Pending)인 상태로 남아 있게 됩니다.
파티션의 설정(PartitionConfig)이 아직 완성되지 않았기 때문에 그렇습니다.
이 파티션에 작업이 들어올 경우 어느 노드에서 실행시켜야 하는지? 얼마만큼의 CPUs 를 할당할 수 있는지? 등의
정보들을 추가적으로 설정해 주어야 합니다.

```
$ squeue
    JOBID PARTITION         NAME   USER ST       TIME  NODES NODELIST(REASON)
     1466  optiplex  Sukjun.samt  sonic PD       0:00      1 (PartitionConfig)
```

위에서 본 파티션에 설정된 속성들 중에서 추가/변경이 필요한 속성들은 아래와 같습니다.

* `Nodes=n[1-51]`: 파티션에 연결되어 작동할 노드들의 목록. 여러개일 경우 콤마로 구분한다.
* `MinNodes=1`: 하나의 작업이 가질 수 있는 노드 수의 최소값이다.
* `MaxCPUsPerNode=4`: 노드 당 가질 수 있는 CPUs 의 개수를 설정한다.

처음에 파티션을 만들 때부터 적어줘도 되지만, 그렇지 못하였다면 아래와 같이 `scontrol update` 명령으로
속성들을 추가해주거나, 수정해줄 수 있습니다.

```
sudo scontrol update PartitionName=optiplex MaxCPUsPerNode=10
```

현재까지의 파티션 설정 내용을 살펴보면 다음과 같습니다.

```
$ scontrol show partition
PartitionName=optiplex
   AllowGroups=ALL AllowAccounts=ALL AllowQos=ALL
   AllocNodes=ALL Default=YES QoS=N/A
   DefaultTime=NONE DisableRootJobs=NO ExclusiveUser=NO GraceTime=0 Hidden=NO
   MaxNodes=UNLIMITED MaxTime=1-00:00:00 MinNodes=0 LLN=NO MaxCPUsPerNode=UNLIMITED
   Nodes=n[1-51]
   PriorityJobFactor=1 PriorityTier=1 RootOnly=NO ReqResv=NO OverSubscribe=NO
   OverTimeLimit=NONE PreemptMode=OFF
   State=UP TotalCPUs=204 TotalNodes=51 SelectTypeParameters=NONE
   JobDefaults=(null)
   DefMemPerNode=UNLIMITED MaxMemPerNode=UNLIMITED
```

#### 3.4. 파티션 삭제

생성했던 파티션을 다시 지우고 싶을 때는 다음과 같이 하면 된다.

```
$ sudo scontrol delete PartitionName=optiplex
```

#### 3.5. 잠들어 있는 노드 깨우기

오랜 기간 사용하지 않으면 계산 노드들의 상태가 down 으로 잠들어 있는 경우가 종종 있다.
이는 `scontrol update` 명령으로 가능하며 다시 활성화 시킬 노드들을 정해주고, 업데이트 할 상태를 적어주면 된다.
노드를 깨우기 전/후의 sinfo 의 결과를 비교해 보면, 상태가 down 에서 idle 로 바뀐 것을 확인할 수 있다.

```
$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
optiplex*    up 1-00:00:00     51   down n[1-51]

$ sudo scontrol update NodeName=n[1-51] State=resume

$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
optiplex*    up 1-00:00:00     51   idle n[1-51]
```

#### 3.6. 기타 명령어

설치여부 및 버전 확인 (위: 마스터 노드, 아래: 계산 노드)

```
[sonic@rna2 ~]$ slurmctld -V
slurm 18.08.8
```

```
[sonic@n1 ~]$ slurmd -V
slurm 18.08.8
```

각 계산 노드들의 상태 확인

```
$ sinfo -N

NODELIST   NODES PARTITION STATE
n1             1  optiplex down
n2             1  optiplex down
n3             1  optiplex down
...
n51            1  optiplex down
rna2a          1    debug2 down
rna2b          1    debug3 down
```

#### 3.7. 관련 경로

`/etc/slurm/slurm.conf`: slurm 의 환경 설정 파일

환경 설정 파일에는 여러가지 경로들이 설정되어 있다.

```
StateSaveLocation=/var/spool/slurm/ctld
SlurmdSpoolDir=/var/spool/slurm/d
SlurmctldPidFile=/var/run/slurmctld.pid
SlurmdPidFile=/var/run/slurmd.pid
...
SlurmctldLogFile=/var/log/slurmctld.log
SlurmdLogFile=/var/log/slurmd.log
```

`/var/spool/slurm`: 현재 돌고 있는 작업들의 스크립트가 저장되는 곳


### 4. 자주 접하는 문제 및 해결방법

#### slurm_update error: Invalid user id

설정 권한이 있는 사용자가 아닌 경우에 권한이 없다는 에러(Invalid user id)를 낸다.
아래는 sonic 이라는 일반 사용자 계정으로 설정을 했을 때의 볼 수 있는 에러 메시지이다. 

```
$ scontrol create PartitionName=optiplex
Error creating the partition: Invalid user id

$ scontrol update NodeName=n1 State=resume
slurm_update error: Invalid user id
```

보통 root 계정은 scontrol 을 통해 설정을 할 수 있는 권한을 가진 사용자이다.
현재의 계정에서 'sudo' 명령어를 붙여 root 권한으로 실행하면 해결된다.

```
$ sudo scontrol create PartitionName=optiplex
```

#### You are not running a supported accounting_storage plugin

```
$ sacctmgr list account
You are not running a supported accounting_storage plugin
(accounting_storage/filetxt).
Only 'accounting_storage/slurmdbd' and 'accounting_storage/mysql' are supported.
```

#### You must specify a reason when DOWNING or DRAINING a node. Request denied.

몇 개의 노드에 문제가 생겨 상태를 변경하여 작업 실행이 일어나지 않도록 해야 할 때가 있다.
그런데, down 또는 drain 으로 상태 변경 시 이유를 적시하지 않으면 에러가 발생한다.

```
$ sudo scontrol update NodeName=n3 State=down
You must specify a reason when DOWNING or DRAINING a node. Request denied
```

다음과 같이 Reason 속성을 추가하여 다시 실행해주면 된다.
3번째 노드 (hostname: n3) 의 파워서플라이 고장으로 인해 꺼두려고 하는 경우이다.

```
$ sudo scontrol update NodeName=n3 State=down Reason="Power supply failing"
```

상태 변경 시 down 과 drain 의 차이가 있다.
현재 노드에 남아 실행중인 작업들을 바로 종료시키느냐의 여부가 차이가 있다.
down 의 경우에는 곧바로 작업들을 종료시키는 반면,
drain 의 경우에는 현재 실행중인 작업들은 끝날 때까지 실행시키고 새로운 작업이 들어오지 않게 한다.

#### sbatch: error: invalid partition specified:

잘못된 파티션 이름을 넣은 경우에 발생하는 에러이다.

```
$ sbatch job_script.sh
sbatch: error: invalid partition specified: custom
sbatch: error: Batch job submission failed: Invalid partition name specified
```

#### 노드에서 마지막 작업이 끝날 때 다른 ssh 연결이 끊기는 경우

우리 연구실은 클러스터의 각 노드들의 cpu/mem 사용량을 모니터링 하기 위해 ctop 을 사용한다.
이는 각 노드에 ssh 연결을 통해 정보를 실시간으로 가지고 오는데,
slurm 을 통해 작업을 제출하고 끝날 때 쯤 slurm 과 상관 없는 이러한 ssh 연결이 끊기는 경우가 있다.
이는 slurm 의 epilog script 때문에 그런 것으로 파악되었다.
slurm 의 epilog script 는 잔여 zombi 프로세스를 죽이기 위해 만들어졌으나 이는 해당 노드에서 돌아가는 해당 유저의
프로세스들을 모두 죽이는 경우가 있기 때문에 ctop 과 같은 프로세스도 죽어서 영향이 있는 경우가 있었다.
따라서 epilog 스크립트를 사용하지 않게끔 설정해주는 방법이 있다.
slurm 환경설정 파일로 들어가 Epilog 속성을 다시 주석 처리하고 slurm 데몬을 재시작 하면 된다.

slurm 환경설정 파일 `/etc/slurm/slurm.conf` 의 마지막 부분의 모습.

```
# COMPUTE NODES
# OpenHPC default configuration
TaskPlugin=task/affinity
PropagateResourceLimitsExcept=MEMLOCK
AccountingStorageType=accounting_storage/filetxt
# Epilog=/etc/slurm/slurm.epilog.clean   # <== Comment this to disable
NodeName=n[1-51] Sockets=1 CoresPerSocket=4 ThreadsPerCore=1 State=UNKNOWN
NodeName=rna2a Sockets=2 CoresPerSocket=18 ThreadsPerCore=1 State=UNKNOWN
NodeName=rna2b Sockets=2 CoresPerSocket=6 ThreadsPerCore=1 State=UNKNOWN
PartitionName=debug Nodes=n[1-51] Default=YES MaxTime=24:00:00 State=UP
PartitionName=debug2 Nodes=rna2a MaxTime=24:00:00 State=UP
PartitionName=debug3 Nodes=rna2b MaxTime=24:00:00 State=UP
ReturnToService=1
```

`slurm.conf` 파일을 수정한 이후에는 slurm 데몬의 설정 파일을 다시 읽어들이면 적용된다.

```
scontrol reconfigure
```

#### Node appears to have a different slurm.conf than the slurmctld.

마스터 노드에 있는 `/var/log/slurmctld.log` 파일에 다음과 같이 에러 메시지가 뜨는 경우가 있다.
마스터 노드와 계산 노드에 있는 환경설정 파일 `slurm.conf` 의 내용이 서로 다른 경우가 그 원인이다.
따라서 항상 내용을 갖게 유지시켜주어야 한다.

```
[2019-10-05T21:29:13.093] error: Node n51 appears to have a different slurm.conf than the slurmctld.
This could cause issues with communication and functionality. Please review both files and make sure
they are the same.  If this is expected ignore, and set DebugFlags=NO_CONF_HASH in your slurm.conf.
```

#### Slurm temporarily unable to accept job, sleeping and retrying

```
...
Submitted batch job 14146
Submitted batch job 14147
Submitted batch job 14148
sbatch: error: Slurm temporarily unable to accept job, sleeping and retrying
```

#### scancel: error: Kill job error on job id 14262_43: Socket timed out on send/recv operation

작업을 취소하려 하는 경우에 발생하는 에러

```
$ scancel -u sonic
...
scancel: _add_delay: adding delay in RPC send of 1000000 usec
scancel: error: Kill job error on job id 14262_43: Socket timed out on send/recv operation
```

#### slurm_load_node: Socket timed out on send/recv operation

타임아웃 에러

```
$ sinfo
slurm_load_node: Socket timed out on send/recv operation
```

#### scontrol: error: Update of this parameter is not supported: MaxJobs=10 

```
[root@rna1 ~]# scontrol update PartitionName=debug1 MaxJobs=10
scontrol: error: Update of this parameter is not supported: MaxJobs=10
```
