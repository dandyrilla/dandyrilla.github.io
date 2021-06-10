---
layout: post
title: "생물정보학에서 많이 다루는 파일 형식들"
description: "bigWig 파일 포맷에 대하여 알아보고 랜덤 액세스가 가능하도록 사용하는 방법에 대하여 알아봅니다."
tags: [UCSC, bigWig]
share: true
comments: true
---

유전체 배열에서 연속된 값이 많은 데이터를 저장하기 위해서는
[wiggle(.wig) 데이터 포맷](https://genome.ucsc.edu/goldenPath/help/wiggle.html)을 많이 이용하죠.
하지만 이는 텍스트 기반의 포맷이기 때문에 빠르게 임의 접근(random access)이 불가능합니다.
하지만 [wigToBigWig 프로그램](http://hgdownload.soe.ucsc.edu/admin/exe/)을 이용하여 wiggle 포맷을
[bigWig 포맷](https://genome.ucsc.edu/goldenpath/help/bigWig.html)으로 바꾸면 용량도 줄어들 뿐만 아니라 필요한 부분만
빠르게 값을 읽어올 수 있는 임의 접근이 가능해집니다.
주로 GC content, conservation scores, transcriptome 데이터를 저장할 때 유용하게 쓰입니다.

### wig 파일을 bw 파일로 변환하기 (wigToBigWig)

```
wigToBigWig in.wig chrom.sizes out.bw
```



#### ENCODE narrowPeak과 broadPeak의 차이

ENCODE에서는 region을 표시하기 위해 narrowPeak이나 broadPeak이라는 bed 포맷을 사용한다. 하지만 narrowPeak은 BED6+4
포맷을 따르고, broadPeak은 BED6+3 포맷을 따른다. 첫 6개 필드(chrom, chromStart, chromEnd, name, score, strand)가
동일하고 추가되는 4개의 필드(signalValue, pValue, qValue, peak) 중에서 3개의 필드가 동일하다. 즉, narrowPeak와
broadPeak의 차이점은 제일 마지막 필드인 peak이 포함되느냐의 여부이다.

그렇다면, 제일 마지막 10번째 필드인 peak은 무엇일까? [UCSC Genome Browser FAQ의 narrowPeak 포맷 설명]()에는 다음과 같이
적혀져 있다.

> peak - Point-source called for this peak; 0-based offset from chromStart. Use -1 if no point-source called.

즉, nucleotide 수준에서 chromStart와 chromEnd 사이의 정확한 위치를 딱 집어내기 위해 적어주는 필드이다. 어찌보면
broadPeak에서 하나의 필드가 추가된 형태가 narrowPeak이라고 이해할 수 있겠다.

참고자료:

* [ENCODE narrowPeak format](https://genome.ucsc.edu/FAQ/FAQformat.html#format12)
* [ENCODE broadPeak format](https://genome.ucsc.edu/FAQ/FAQformat.html#format13)