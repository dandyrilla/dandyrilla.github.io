---
layout: post
title: 오픈 그리드 스케쥴러(OGS)를 이용한 작업의 제출 및 관리
description: >
  여러 대의 컴퓨터를 하나로 묶은 클러스터 환경에서 대규모 연산이 필요한 연구들을 수행할 때 이를 편리하게 해결해주는 작업
  스케쥴러라는 소프트웨어가 있습니다. 그 중 하나인 오픈 그리드 스케쥴러(Open Grid Scheduler)는 제가 처음으로 접한 작업
  스케쥴러입니다. 오픈 그리드 스케쥴러를 통해 작업을 제출하고, 확인하며 환경을 설정하는 법을 배워봅시다.
tags: [job scheduler, sge, ogs]
comments: true
share: true
---

여러 대의 컴퓨터를 하나로 묶은 클러스터 환경에서 대규모 연산이 필요한 연구들을 수행할 때
이를 편리하게 해결해주는 작업 스케쥴러라는 소프트웨어가 있습니다.
그 중 하나인 [오픈 그리드 스케쥴러(Open Grid Scheduler)](http://gridscheduler.sourceforge.net/) 는 제가 처음으로 접한
작업 스케쥴러입니다. 오픈 그리드 스케쥴러를 통해 작업을 제출하고, 확인하며 환경을 설정하는 법을 배워봅시다.


### 1. 작업 제출하기

작업 제출에 쓰이는 주된 명령어는 `qsub` 입니다.

#### 1.1. 작업 스크립트 만들기

작업을 제출하려면 어떤 작업을 할 지 적어줘야겠죠? 그 내용이 담긴 파일을 작업 스크립트라 합니다.
실제로는 복잡한 계산 작업들을 수행하여 시간이 오래 걸리는 작업 스크립트를 만드실 테지만,
이번 예제에서는 작업 스케쥴러로 작업을 제출해보는 실습을 위해 다음과 같이 리눅스의 기본 명령어 중 하나인
sleep 을 이용해 아무것도 하지 않고 10초를 기다리는 작업을 가진 작업 스크립트를 작성해 볼 겁니다.

```
#!/bin/bash

sleep 10
```

위와 같이 내용을 입력하셨으면, 파일 이름은 `jobscript.sh` 로 하여 저장합니다.

#### 1.2. 작업 제출하기

작업을 제출하려면 `qsub` 명령어를 이용하면 됩니다.
이 명령의 첫 번째 인자에는 우리가 위에서 만들었던 작업 스크립트 파일의 경로를 입력해주면 됩니다.

```
$ qsub jobscript.sh
Your job 9065 ("STDIN") has been submitted
```

작업을 제출하면 작업이 정상적으로 제출되었다는 메시지가 나타나게 됩니다.
메시지 내용에 나타나는 9065 라는 숫자는 작업에 부여되는 고유 번호입니다.
고유 번호는 작업을 제출할 때마다 1씩 증가하게 되므로, 9065 번째로 제출된 작업이라는 것도 알 수 있습니다.
또한 작업의 이름은 STDIN 라는 기본값이 잡혀있는 것을 확인하실 수 있습니다.

#### 1.3. 작업 스크립트 없이 작업 제출하기

하지만 꼭 작업 스크립트를 만들어 작업을 제출해야만 하는 것은 아닙니다.
qsub 명령어는 작업 스크립트를 담고 있는 파일 없이 표준 입력(standard input)을 통해 작업 스크립트를 입력받기도 합니다.
다음과 같이 사용할 수 있습니다.

```
$ echo "sleep 10" | qsub
```

더욱 간단해 보이죠? 명령줄이 길지 않고 간단한 경우에는 이렇게 간편히 작업을 제출할 수 있습니다.

#### 1.4. 작업 이름 지정하기

작업을 제출한 뒤 끝나면 프로그램에서 출력되는 표준 출력과 표준 에러의 내용이 담긴 파일들이 생성되는데요.
기본값으로 현재 사용자의 홈 디렉토리에 표준 출력 파일은 `STDIN.o9065` 와 같이,
표준 에러 파일은 `STDIN.e9065` 와 같은 이름으로 생성됩니다.
하지만 동시에 여러 사람들이 작업을 돌리는 환경에서 모두가 작업 이름을 부여하지 않는다면
자신이 돌린 작업의 결과 파일이 무엇인지, 또한 어떤 작업을 돌렸는지 알기가 힘듭니다.
작업 이름을 한번 지정해 볼까요? 

```
$ echo "sleep 10" | qsub -N "Sukjun.sleep.10sec"
```

위와 같이 qsub 명령어의 `-N` 옵션을 이용하여 이름을 지정하면 됩니다.
이렇게 작업의 이름은 작업을 제출할 때 지정할 수 있습니다.

#### 1.5. 작업 큐 지정하기

작업을 수행할 작업 큐를 지정할 수 있습니다. `-q` 옵션을 이용합니다.

```
[lab@sirna1 ~]$ qsub -q optiplex jobscript.sh
Your job 9066 ("jobscript.sh") has been submitted
```


### 2. 제출된 작업 목록 확인, 변경, 삭제

제출된 작업들의 목록을 확인할 때에는 `qstat`, 제출된 작업의 속성을 변경할 때에는 `qalter` 명령어를 이용합니다. 

#### 2.1. 작업 목록 확인

현재 클러스터에 제출된 작업들의 목록은 다음과 같이 확인할 수 있습니다.


```
[lab@master ~]$ qstat
job-ID  prior   name       user         state submit/start at     queue                          slots ja-task-ID
-----------------------------------------------------------------------------------------------------------------
2185407 0.55500 Sukjun.cal lab          r     09/02/2019 13:00:35 24_730.q@node-0-69.local           1
2185408 0.55500 Sukjun.cal lab          r     09/02/2019 13:00:35 24_730.q@node-0-70.local           1
2185409 0.55500 Sukjun.cal lab          r     09/02/2019 13:00:35 24_730.q@node-0-73.local           1
```

또는 `-f` 옵션을 붙여 더욱 자세한 정보를 볼 수 있습니다.

```
[lab@sirna1 ~]$ qstat -f
queuename                      qtype resv/used/tot. load_avg arch          states
---------------------------------------------------------------------------------
all.q@mirna1.local             BIP   0/0/24         0.72     linux-x64
---------------------------------------------------------------------------------
all.q@mirna2.local             BIP   0/0/24         1.08     linux-x64
---------------------------------------------------------------------------------
all.q@node01.local             BIP   0/0/1          0.03     linux-x64

...

optiplex@node31.local          BIP   0/0/4          0.01     linux-x64
---------------------------------------------------------------------------------
optiplex@node32.local          BIP   0/0/0          -NA-     linux-x64     au
```

#### 2.2. 작업 속성 변경

작업 속성 변경은 `qalter` 명령으로 이루어집니다. 주로 제출된 작업의 우선순위 조정을 해야할 때 자주 쓰입니다.
다른 사람의 작업이 먼저 수행될 수 있도록 나의 작업 순위를 낮추기 위한 경우에는 다음과 같이 입력합니다.

```
$ qalter -p -100 9065
```


#### 2.3. 작업 삭제

현재 실행되고 있는 작업을 중단시키고 싶거나 아직 실행되지 않았지만 작업을 취소시키고 싶을 때
작업 삭제 명령어인 qdel 을 이용하면 됩니다.
qdel 명령어 다음에는 작업의 고유 번호 혹은 이름을 적어줍니다.
작업이 삭제되면 삭제되었다는 메시지가 나타나게 됩니다.

```
[lab@sirna1 ~]$ qdel 9065
lab has deleted job 9065
```

만약 lab 이라는 사용자가 제출한 모든 작업을 삭제하고 싶을 때에는 `-u` 옵션을 이용합니다.

```
[lab@sirna1 ~]$ qdel -u lab
```


### 3. 환경 설정

주로 `qconf` 명령어를 통해 이루어집니다.

#### 3.1. 작업 큐 생성 및 수정

다음과 같이 만들고자 하는 큐의 이름을 적어주면 됩니다.
생선은 `-aq` 옵션을, 수정은 `-mq` 옵션을 붙여 이용합니다.
hostlist 에는 host group 파일명 지정, slot 에는 각 host 의 노드 수를 지정할 수 있습니다.

```
$ qconf -aq optiplex  # 작업 큐 생성
$ qconf -mq optiplex  # 작업 큐 수정
```

#### 3.2. 호스트 그룹 환경 설정

다음과 같이 호스트 그룹에 대한 환경 설정을 할 수 있습니다.
호스트 그룹은 `hgrp` 라는 축약된 이름으로 쓰고,
그 앞에 생성(add)은 `a`, 보기(show)는 `s`, 수정(modify)은 `m` 을 붙인 옵션들을 이용합니다.

```
[lab@sirna1 ~]$ qconf -ahgrp @ibs1.q  # 생성(add)
[lab@sirna1 ~]$ qconf -shgrp @ibs1.q  # 보기(show)
[lab@sirna1 ~]$ qconf -mhgrp @ibs1.q  # 수정(modify)
```

#### 3.4. 현재 큐 목록 보기

sql (show queue list)

```
[lab@sirna1 ~]$ qconf -sql
all.q
optiplex
mirna1q
mirna2q
```

#### 3.5. 현재 노드 목록 보기

```
[lab@sirna1 ~]$ qconf -sel
mirna1.local
mirna2.local
...
node32.local
sirna1.local
```

#### 3.6. Job priority 조정 권한을 추가하기

다음과 같이 하면 lab 에 job priority 를 조정할 수 있는 권한이 lab 사용자에게 생깁니다.

```
[lab@sirna1 ~]$ qconf -am lab
```

#### 3.7. 작업 정보들이 저장되는 위치들

마스터 노드의 아래 경로에 다음과 같이 저장됩니다.

* 작업 바이너리: `/opt/gridengine/default/spool/qmaster/jobs`
* 작업 스크립트: `/opt/gridengine/default/spool/qmaster/job_scripts`

몇 개의 작업을 던지고 구조를 살펴보면, 다음과 같이 작업 번호가 생성되어 있는 것을 볼 수 있습니다.
작업에 부여된 번호가 `827472` 라면, `jobs/00/0082/7472` 의 경로에 저장되어 있습니다.

```
jobs
`-- 00
    `-- 0082
        |-- 7472
        |-- 7473
        ...
        |-- 7491
        |-- 7492
        `-- 7493
job_scripts
|-- 827472
|-- 827473
...
|-- 827491
|-- 827492
`-- 827493
```


### 4. 자주 접하는 문제 및 해결방법

#### 작업의 상태가 'dr' 인 경우

잘 돌던 작업들이 제대로 끝나지 못해 상태가 'dr'로 바뀐 작업들이 있습니다.
이 때에는 qdel 명령어로 지워도 지워지지 않습니다.
이 때에는 어떻게 해야 할까요? `qdel -f {job_id}` 명령어로 강제로 작업을 지울 수 있습니다.

```
$ qdel -f "Sukjun.*"
rule "default rule (spool dir)" in spooling context "flatfile spooling" failed writing an object
```

#### 작업의 상태가 'Eqw' 인 경우

여러 개의 작업들을 클러스터에 던질 때, 같은 작업이 아니라 랜덤하게 몇 개씩 계속 Eqw 의 상태를 갖는 작업들이 발생한다면
아래와 같이 `qstat -j {job_id}` 명령어로 그 원인을 파악할 수 있습니다.
보통 찾고자 하는 파일이 존재하지 않는 경우가 대부분입니다.
계산이 수행되는 노드에서 해당 저장장치의 마운트가 되어있지 않아 파일을 찾지 못하거나
qsub 명령어에서 `-cwd` 옵션을 주지 않아 제대로 된 경로를 찾지 못하여 파일을 찾지 못하는 경우가 있었습니다.

```
$ qstat -j 454860
==============================================================
job_number:                 454860
exec_file:                  job_scripts/454860
...
script_file:                ... scripts/000001.sh
error reason    1:          07/05/2019 14:30:48 [501:30986]: error: can't chdir to /extdata4/Sukjun/project: No such file or directory
scheduling info:            (Collecting of scheduler job information is turned off)
```

#### Following jobs do not exist

존재하지 않는 작업이거나 이미 끝난 작업에 대해 살펴보려고 할 때 나타날 수 있는 메시지입니다.

```
[lab@master ~]$ qstat -j 3279349
Following jobs do not exist:
3279349
```

#### ERROR: failed receiving gdi request for mid=1 (got syncron message receive timeout error). 

```
[lab@sirna1 ~]$ qsum
ERROR: failed receiving gdi request for mid=1 (got syncron message receive timeout error).
```

#### error: commlib error: got select error (Connection refused)

```
[lab@sirna1 ~]$ qsum
error: commlib error: got select error (Connection refused)
ERROR: unable to send message to qmaster using port 536 on host "sirna1.local": got send error
```
