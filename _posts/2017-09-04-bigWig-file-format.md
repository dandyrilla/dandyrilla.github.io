---
layout: post
title: "UCSC bigWig file format"
description: "Introduction to UCSC bigWig file format"
tags: [UCSC, bigWig]
share: true
comments: true
---

유전체 상에 염기 위치에 대응되는 연속된 값을 저장하기 위해서는 wiggle(wig) 이라는 text format을 이용한다. bigWig는 wiggle 포맷을 위치를 기준으로 인덱싱하여 필요한 유전체 지역의 정보만을 빠르게 가져올 수 있는 임의 접근(random access)이 가능한 바이너리 포맷이다.

* bigWig 트랙에 대한 정보: [http://genome.ucsc.edu/goldenPath/help/bigWig.html](http://genome.ucsc.edu/goldenPath/help/bigWig.html)


## wig 파일을 bw 파일로 변환하기 (wigToBigWig)

```
wigToBigWig in.wig chrom.sizes out.bw
```