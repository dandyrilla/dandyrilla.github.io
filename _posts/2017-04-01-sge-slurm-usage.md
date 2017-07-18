---
layout: post
title: "Usage of job scheduler SLURM"
tags: [sge, slurm, job scheduler]
comments: true
share: true
---

1. 작업 제출하기 (job submission)

작업 제출은 sbatch 명령어로 하면 된다. sbatch 명령어 뒤에는 작업할 내용이 담긴 스크립트 파일을 넣어주면 된다. 이를 작업 스크립트라 하는데, 이 작업 스크립트의 첫 부분에는 일정한 형식이 갖추어져 있어야 한다. 이에 대해서는 '작업 스크립트' 항목에서 자세히 알아볼 것이다.

`sbatch [script_file]`

2. 제출된 작업 목록 확인하기 (job status)

`squeue`

3. 제출했던 작업 삭제하기 (job deletion)

`scancel [job_id]`


일단 기본적으로 작업을 제출하고, 제출한 작업 목록들을 살펴보고, 원치 않는 작업들을 삭제하는 것을 배워보았다.

