---
layout: post
title: RNA secondary structure
description: 유전자 조절에 핵심 역할을 하는 RNA 2차 구조에 대해 살펴봅니다.
tags: [RNA structure, RNA secondary structure, structure probing]
comments: true
share: true
---

### RNA가 무엇인가요?

[분자생물학의 중심 원리](https://ko.wikipedia.org/wiki/%EB%B6%84%EC%9E%90%EC%83%9D%EB%AC%BC%ED%95%99%EC%9D%98_%EC%A4%91%EC%8B%AC%EC%9B%90%EB%A6%AC)(central dogma of molecular biology)는 유전자 정보의 흐름을 설명하는 내용인데요. DNA에 들어있는 유전자 정보가 읽혀져서 최종적으로는 단백질(protein)로 만들어져 세포 내에서 기능을 하게 됩니다. 이 때, DNA와 단백질 사이에 존재하는 중간 산물격인 RNA(ribonucleic acid)가 있는데요. 이는 바로 DNA에서부터 전사(transcription)되어 나와 단백질을 만드는 데 중요한 물질로 기능합니다. 만약 DNA를 도서관에 있는 대여가 불가한 백과사전에 비유한다면, 우리가 원하는 내용을 집에 가져가 참고하기 위한 백과사전의 일부 몇 페이지들의 복사물을 바로 RNA라고 생각하면 됩니다.

### RNA도 구조를 형성할 수 있나요?

이중나선 구조로 존재하는 DNA와 달리, 전사과정을 거쳐 만들어지는 RNA는 단일 가닥으로 만들어집니다.

### RNA 2차 구조는 어떻게 알아낼까요?

유전자 조절의 중요한 포인트 중 하나로 RNA가 각광받으면서 RNA 2차 구조를 알아낼 수 있는 방법들이 많이 연구되어 보고되고 있습니다. 당연한 이야기겠지만, RNA 2차 구조는 nucleotide가 paired 상태인지 unpaired 상태인지를 구분하는 원리를 이용합니다. 구분해주는 역할을 어떤 material이 해주느냐에 따라 chemical과 enzymatic 방법으로 나누어볼 수 있습니다. 또한 NGS 기술을 접목하면 단일 염기 단위에서 genome-wide하게 살펴볼 수도 있습니다.

* Chemical을 이용한 방법
    * icSHAPE: _in vivo_ click selective 2'-hydroxyl acylation and profiling experiment (2015)
    * CIRS-Seq
    * SHAPE-Seq: selective 2'-hydroxyl acylation analyzed by primer extension sequencing
    * Structure-Seq

* Enzyme을 이용한 방법
    * PARS: Parallel analysis of RNA structure (2014), [GSE50676](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE50676)(human transcriptome)


(공개되어 있는 데이터도 표시할 것)