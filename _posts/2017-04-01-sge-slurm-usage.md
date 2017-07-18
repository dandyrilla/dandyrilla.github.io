---
layout: post
title: "Usage of job scheduler SLURM"
tags: [sge, slurm, job scheduler]
comments: true
share: true
---

## 1. 작업을 제출하고, 확인하고, 삭제하기

작업 제출(job submission)은 `sbatch` 명령어로 하면 된다. sbatch 명령어 뒤에는 작업할 내용이 담긴 스크립트 파일을 넣어주면 된다. 이를 작업 스크립트라 하는데, 이 작업 스크립트의 첫 부분에는 일정한 형식이 갖추어져 있어야 한다. 이에 대해서는 '작업 스크립트' 항목에서 자세히 알아볼 것이다.

`sbatch [script_file]`

제출한 작업들의 목록을 확인(job status)하려면 `squeue` 명령어를 이용하면 된다. 

`squeue`

현재 실행중인 작업을 중지시킬 필요가 있거나 작업을 잘못 제출하였을 때 작업을 삭제(job deletion)하려면 `scancel`라고 입력한 후 뒤에 취소할 작업 id를 적어주면 된다.

`scancel [job_id]`

일단 기본적으로 작업을 제출하고, 제출한 작업 목록들을 살펴보고, 원치 않는 작업들을 삭제하는 것을 배워보았다.


## 2. 작업 스크립트 작성하기

작업을 제출할 때에는 일정한 형식이 따르는 스크립트를 작성하여 넣어주어야 한다.
