---
layout: post
title: "Usage of job scheduler SLURM"
tags: [sge, slurm, job scheduler]
comments: true
share: true
---

## 1. 작업을 제출하고, 확인하고, 삭제하기

작업 제출(job submission)은 sbatch 명령어로 하면 된다. sbatch 명령어 뒤에는 작업할 내용이 담긴 스크립트 파일의 이름을 넣어주면 된다. 여기에서는 job_script.sh라는 쉘 스크립트를 넣어주었다. 이를 작업 스크립트라 하는데, 이 작업 스크립트의 첫 부분에는 일정한 형식이 갖추어져 있어야 한다. 이에 대해서는 '작업 스크립트' 항목에서 자세히 알아볼 것이다.

```
$ sbatch job_script.sh
Submitted batch job 161445
```

제출한 작업들의 목록을 확인(job status)하려면 squeue 명령어만 입력하고 엔터를 치면 된다. 작업들의 목록이 테이블 형태로 보여진다. JOBID는 제출한 작업의 고유 번호이고, PARTITION은 현재 작업이 제출된 공간의 이름이며, NAME은 작업의 이름, USER는 작업을 제출한 사람(리눅스 계정), ST는 현재 작업의 상태를 말해주며 R은 현재 작업이 실행되고(running) 있음을 알려준다. TIME은 작업이 실행된 경과 시간을, NODES는 작업이 차지하는 컴퓨터 노드의 개수,  NODELIST는 이 작업을 맡고 있는 컴퓨터 노드들의 리스트를 알려준다.

```
$ squeue

 JOBID  PARTITION         NAME USER  ST  TIME  NODES  NODELIST(REASON)
147965     normal  Sukjun.calc  lab  R   0:05      1  node1
147966     normal  Sukjun.calc  lab  R   0:05      1  node2
147967     normal  Sukjun.calc  lab  R   0:05      1  node3
```

현재 실행중인 작업을 중지시킬 필요가 있거나 작업을 잘못 제출하였을 때 작업을 삭제(job deletion)하려면 scancel라고 입력한 후 뒤에 취소할 작업 id를 적어주면 된다.

```
$ scancel 147966
```

일단 기본적으로 작업을 제출하고, 제출한 작업 목록들을 살펴보고, 원치 않는 작업들을 삭제하는 것을 배워보았다.


## 2. 작업 스크립트 작성하기

작업을 제출할 때에는 일정한 형식이 따르는 스크립트를 작성하여 넣어주어야 한다.



## 3. 작업 제출 환경 설정

작업 제출 공간(PARTITION) 설정
