---
layout: post
title: 작업 스케쥴러 PBS Professional 사용법
image: /images/pbspro-cover.png
description: >
  PBS Professional 은 고성능 컴퓨팅(HPC)이 구축된 환경에서 작업 스케쥴링을 원할하게 해주는 작업 스케쥴러입니다. PBS Pro
  사용자 가이드 문서에 나와있는 내용 중 가장 기본적이고 필요한 내용만을 골라 정리하였습니다. 사용법이 Open Grid Engine
  과 매우 비슷하므로 이를 사용했던 사용자라면 쉽게 익힐 수 있을 것입니다.
tags: [pbspro, job scheduler]
comments: true
share: true
---

### 1. 작업 스크립트 만들기

PBS 작업 스크립트는 기존에 사용하던 작업 스크립트와 매우 유사하다. 작업 스크립트는 (1) Shebang line, (2) PBS 지시어,
(3) 작업 내용 의 세 가지 부분으로 구성된다. Shebang line은 작업 스크립트의 쉘 또는 인터프리터를 설정하는 부분으로 보통
sh 또는 bash 와 같은 쉘이나 python과 같은 인터프리터를 사용할 수 있다. `#PBS`라는 prefix로 시작되는 PBS 지시어는 작업
스크립트에 대한 정보를 넘겨주는 용도로 사용된다. (이는 다음에 소개할 작업 제출 명령어의 qsub의 옵션과 일치한다.) 그리고
마지막으로 수행할 작업의 내용들을 적어주면 된다.

자, 이제 텍스트 에디터를 열어 다음과 같은 내용을 가진 작업 스크립트 파일 `jobscript.sh`을 만들어 보자. 작업의 이름을
`Sukjun.hello`로 지정해 주었고, 작업이 실행되면서 출력하는 표준 출력은 `/home/lab/Sukjun`에 파일로 저장하도록 하였다.

```bash
#!/bin/bash
#PBS -N Sukjun.hello
#PBS -o /home/lab/Sukjun
#PBS -j oe
echo "${HOSTNAME} says: Hello, Sukjun!"
```

PBS 지시어에 대하여 조금 더 알아보자. 추후 제출한 작업들의 관리를 용이하게 하려면 되도록 PBS 지시어를 지정하는 것을
권장한다. 아래는 자주 사용하는 **PBS 지시어들** 이다.

| 지시어         | 설명                                                                    |
|----------------|-------------------------------------------------------------------------|
| `-N {jobname}` | 작업의 이름을 지정한다. 지정해 두면 나중에 작업 목록에서 확인하기 좋다. |
| `-o {path}`    | 표준 출력(stdout)이 쓰일 경로를 지정한다.                               |
| `-e {path}`    | 표준 에러(stderr)가 쓰일 경로를 지정한다.                               |
| `-q {queue}`   | 작업을 제출할 큐(queue)를 지정한다.                                     |
| `-j oe`        | 표준 출력(stdout)에 표준 에러(stderr)를 통합시킨다. 그 반대는 `eo`      |
| `-l ncpus={n}` | 병렬처리 작업일 경우, 이용하고자 하는 코어의 개수를 지정할 수 있다.     |

여러분이 사용하고 있는 계산 노드가 멀티 코어를 가지고 있어서 여러 작업들을 동시에 실행시킬 수 있지만 가용한 메모리가
충분하지 않을 경우에는 어쩔 수 없이 한 대의 노드에서 실행되는 작업의 수를 제한해야 하는 일이 생길 수 있다. 이 때에는
작업 당 할당시킬 수 있는 cpu 개수를 지정해 주면 노드에서 제한된 수의 작업만 실행되게 할 수 있다. 다음과 같이 자원을
제한할 수 있는 limitation (`-l`) 옵션을 통해 cpu 의 개수를 4로 해 놓으면, 4개의 코어를 가진 노드에서는 한 개의 작업만
돌아가게 된다. `-l ncpus=4`

### 2. 작업 제출하기: `qsub`

이제 위에서 만든 작업 스크립트를 작업 스케쥴러에게 맡겨 실행시켜야 한다. 이 과정을 **작업 제출**이라고 한다. 작업
제출은 `qsub` 명령을 통해 이루어진다. `qsub`의 첫 번째 인수에 위에서 만든 작업 스크립트 파일 이름을 적어준다. 그러면
다음과 같이 `{작업 번호}.{호스트명}`의 포맷으로 작업이 제출되었다는 표시가 나타난다. 작업 번호는 0부터 시작하며 작업이
제출될 때마다 1씩 증가하여 최대 9,999,999까지 부여된다. 9,999,999 이후의 작업 번호는 다시 0부터 시작한다. PBS 작업
스케쥴러를 설치한 이후 처음으로 제출하는 작업이므로 작업 번호는 0번이 지정되었다.

```
$ qsub jobscript.sh
0.sirna1
```

작업 스크립트를 이용하여 작업을 제출하는 것은 여러 방식 중 하나일 뿐이며 작업 스크립트를 생성하지 않고 작업을 제출하는
방법도 있다. `echo "a.out myinfile mydate" | qsub`과 같은 형태인데, 이에 대해서는 위에 언급했던 [사용자 가이드](https://pbsworks.com/pdfs/PBSUserGuide14.2.pdf)
의 36페이지를 참고하면 된다.


### 3. 제출한 작업 확인하기: `qstat`

앞서 제출한 작업들이 제출과 동시에 바로 실행(running)되었는지, 아니면 이미 모든 자원이 이미 제출된 작업들로 인해
사용중이어서 대기상태(pending)에 있는지를 확인하는 방법에 대하여 알아본다. `qstat` 명령어를 통해 가능하다.

```
$ qstat
Job id            Name             User              Time Use S Queue
----------------  ---------------- ----------------  -------- - -----
0.sirna1          Sukjun.hello     lab                      0 Q workq
```

만약 작업 큐 별로 요약된 정보를 보고싶다면 `-Q` 옵션을 추가적으로 주면 된다.

```
$ qstat -Q
Queue              Max   Tot Ena Str   Que   Run   Hld   Wat   Trn   Ext Type
---------------- ----- ----- --- --- ----- ----- ----- ----- ----- ----- ----
workq                0     1 yes yes     1     0     0     0     0     0 Exec
```


### 4. 제출한 작업 삭제하기: `qdel`

작업을 제출하고 보니 작업 스크립트의 내용이 잘못되었음을 알아채는 경우가 있을 것이다. 곧바로 에러메시지를 내며 종료되면
괜찮지만 오랜 시간 돌아가는 작업의 경우에는 자원 및 시간의 낭비가 발생하므로 작업을 취소해야 한다. 이렇게 작업을 잘못
제출했을 경우에는 제출된 작업을 삭제해야 할 경우도 생기게 된다. `qdel` 명령을 이용한다. `qdel`의 첫 번째 인수로 작업의
고유번호(job id)를 입력해 준다.

```
$ qdel 0.sirna1
```

여러 개의 작업들을 한꺼번에 삭제할 수도 있다. 다음은 100개의 작업을 한꺼번에 삭제하는 명령이다.

```
$ qdel {0..99}.sirna1
```


### 5. 작업 큐 추가하고 삭제하기

작업 큐를 추가하고 삭제하는 방법을 알아본다. `qmgr` 명령으로 가능하다. 일반 사용자 계정으로는 

(참고) qmgr에서 사용하는 줄임 표현이 있다.
 
* 명령어(command): create(c), delete(d), set(s), unset(u), list(l), print(p)
* 오브젝트(object): server(s), node(n), queue(q)


### 6. 호스트 서버의 정보 확인하기

작업 큐에 대한 정보 뿐만 아니라 호스트에 대한 정보를 볼 때도 `qstat` 명령어가 이용된다. `-B` 옵션을 주면 호스트 서버의
요약된 화면을 표시해 준다.

```
$ qstat -B
Server             Max   Tot   Que   Run   Hld   Wat   Trn   Ext Status
---------------- ----- ----- ----- ----- ----- ----- ----- ----- -----------
sirna1               0     1     0     0     0     0     0     0 Active
```

더욱 자세한 정보를 보려면 `qstat -Bf` 명령을 이용한다.

```
$ qstat -Bf
Server: sirna1
    server_state = Active
    server_host = sirna1
    scheduling = True
    total_jobs = 1
    state_count = Transit:0 Queued:0 Held:0 Waiting:0 Running:0 Exiting:0 Begun:0
    default_queue = workq
    log_events = 511
    mail_from = adm
    query_other_jobs = True
    resources_default.ncpus = 1
    resources_default.place = scatter
    default_chunk.ncpus = 1
    scheduler_iteration = 600
    FLicenses = 2000000
    resv_enable = True
    node_fail_requeue = 310
    max_array_size = 10000
    default_qsub_arguments = -V
    pbs_license_min = 0
    pbs_license_max = 2147483647
    pbs_license_linger_time = 31536000
    license_count = Avail_Global:1000000 Avail_Local:1000000 Used:0 High_Use:0
        Avail_Sockets:1000000 Unused_Sockets:1000000
    pbs_version = 14.1.2
    eligible_time_enable = False
    job_history_enable = True
    max_concurrent_provision = 5
```


### 7. 의존성 관계가 있는 작업 제출하기

앞서 제출한 세 작업(14, 15, 16)이 모두 제대로 끝나야 실행될 수 있는 작업을 제출하려고 한다. 이 때에는 `-W depend` 옵션을
이용해 제출하면 된다.

```
qsub -W depend=afterok:14.sirna1:15.sirna1:16.sirna1 jobscript.sh
```


### 8. 특정 노드를 비활성화 시키기

때때로 특정 노드가 제대로 작동하지 않거나 문제가 생긴 경우, 작업 스케쥴러에서 사용하지 않도록 하는 방법이 있다. 노드의
메인보드가 나가거나 메모리 이상으로 인해 작업이 제대로 할당되지 않거나, 할당 되더라도 계산 속도가 다른 노드들에 비해
현저히 낮아지는 경우 등이다. root 권한을 이용하여 다음과 같이 입력한다.

```
# pbsnodes -o node8
```

비활성화 되어 있는 노드를 다시 복구 시키려면 다음과 같이 입력한다.

```
# pbsnodes -c node8
```

이렇게 활성화 또는 비활성화 시킨 노드들이 제대로 적용되었는지 확인하려면 다음과 같이 노드들의 리스트 상태를 확인한다.

```
$ pbsnodes -l
node8                down,offline
node14               state-unknown,down node down: communication closed
node17               offline
node25               down,offline
```


### 9. 노드 리스트 보기

```
[root@sirna1 ~]# wwsh node list
NAME                GROUPS              IPADDR              HWADDR
================================================================================
mirna1              newnodes            192.168.10.253      00:1b:21:d7:xx:xx
mirna2              newnodes            192.168.10.252      00:1b:21:d7:xx:xx
node1               newnodes            192.168.10.1        00:1b:21:d7:xx:xx
...
node9               newnodes            192.168.10.9        00:1b:21:d5:xx:xx
```


### 10. 발생할 수 있는 에러들


작업 스크립트를 찾을 수 없는 경우

```
$ qsub non-existent.sh
qsub: script file:: No such file or directory
```

제출되었다가 삭제되었거나 이미 끝난 작업을 삭제하려고 할 때

```
$ qdel 0.sirna1
qdel: Job has finished
```

제출된 적이 없는 작업을 삭제하려고 할 때

```
$ qdel 9999.sirna1
qdel: Unknown Job Id 9999.sirna1
```

작업 번호는 지정했지만 잘못된 호스트 이름을 입력했을 경우

```
$ qdel 0.sirna2
qdel: illegally formed job identifier: 0.sirna2
```

큐를 생성할 수 있는 사용자가 아닌 경우

```
[lab@sirna1 ~]$ qmgr
Max open servers: 49
Qmgr: create queue optiplex
qmgr obj=optiplex svr=default: Unauthorized Request
qmgr: Error (15007) returned from server
```

오랜시간 동안 qmgr 프롬프트에서 입력이 없는 경우

```
[root@sirna1 lab]# qmgr
Max open servers: 49
Qmgr: create queue optiplex
Qmgr: set queue optiplex queue_type = execution
qmgr obj=optiplex svr=default: End of File
qmgr: Server disconnected due to idle connection timeout
```

존재하지 않는 속성 값을 부여하려고 할 때

```
[root@sirna1 lab]# qmgr
Max open servers: 49
Qmgr: set queue optiplex unkattr = True
qmgr obj=optiplex svr=default: Undefined attribute
qmgr: Error (15002) returned from server
```