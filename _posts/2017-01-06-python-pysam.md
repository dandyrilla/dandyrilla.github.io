---
layout: post
title: "파이썬 pysam 패키지"
description: "파이썬에서 bam과 같은 tabix 종류의 파일을 읽을 때 유용한 pysam 패키지의 사용법에 대해 알아봅니다."
tags: [python, pysam, sam, bam, tabix]
comments: true
share: true
---

자, 일단 설치부터

기본적인 pysam 이용방법은 아래와 같다.


* [pysam API document](http://pysam.readthedocs.io/en/latest/api.html): pysam의 사용법이 담겨있는 문서
* [pysam pypi(python package index)](https://pypi.python.org/pypi/pysam): pysam을 다운로드 받을 수 있는 곳


```python
import pysam

bam = pysam.AlignmentFile(in_file_bam)

for segment in bam.fetch():
    print(segment)
```