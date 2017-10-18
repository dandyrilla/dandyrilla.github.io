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

유전자 조절의 중요한 포인트 중 하나로 RNA가 각광받으면서 RNA 2차 구조를 알아낼 수 있는 방법들이 많이 연구되어 보고되고 있습니다. 당연한 이야기겠지만, RNA 2차 구조는 nucleotide가 paired 상태인지 unpaired 상태인지를 구분하는 원리를 이용합니다. 구분해주는 역할을 어떤 material이 해주느냐에 따라 enzymatic과 chemical 방법으로 나누어볼 수 있습니다. 또한 NGS 기술을 접목하면 단일 염기 단위에서 genome-wide하게 살펴볼 수도 있습니다.

**Enzyme을 이용한 방법**

* **Frag-Seq**: In vitro only (Underwood *et al*., 2010)
    * Single-stranded nucleic acids만 자르는 Nuclease P1의 원리를 이용하여 unpaired residues를 알아내는 방법
* **dsRNA-Seq**: in vitro (Zheng et al., 2011)
* **PARS**: Parallel analysis of RNA structure (Kertesz *et al*., 2010)
    * Step loop 부분만 선택적으로 자르는 RNase V1과 single-stranded 부분만 선택적으로 자르는 RNase S1을 이용한 probing 방법
    * Human transcriptome에 대해 측정해 놓은 데이터가 있다: [GSE50676](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE50676)
    * 온도를 높여가면서 측정하는 방법인 PARTE(parallel analysis of RNA structure with temperature elevation)으로 응용을 할 수 있다. (Wan et al., 2012)
* **PIP-Seq**: protein interaction profile sequencing (Silverman *et al*., 2015)
    * RNase V1과 RNase ONE을 써서 double- 과 single-stranded 부분을 모두 probing하는 방법
    * Proteinase K를 처리하지 않은 샘플과 처리한 샘플을 비교함으로써 protein이 RNA와 interaction하는 부위들을 알아내었다.
    * RNA 구조는 RNA가 담긴 용액의 환경에도 크게 영향을 받는다. 그런데 PIP-Seq 프로토콜은 RNase V1을 처리한 샘플과 RNase ONE을 처리한 샘플의 버퍼 환경이 달라 문제가 될 소지가 있다. 따라서 해석에 주의를 요해야 할 필요가 있다고 보고되었다.

**Chemical을 이용한 방법**

* **SHAPE-Seq**: selective 2'-hydroxyl acylation analyzed by primer extension sequencing (Lucks *et al*., 2011; Mortimer *et al*., 2012)
    * 1M7 (1-methyl-7-nitroisatoic anhydride)은 선택적으로 unpaired residues의 2'-OH에만 acylation을 시킨다.
    * acylation된 염기들은 RT-stop의 원리를 이용하여 정확한 위치를 알 수 있게 된다.
    * 이후 reproducibility를 높인 SHAPE-Seq 2.0이 발표되었다. (Loughrey *et al*., 2014)
* **CIRS-Seq**: Chemical inference of RNA structures (Incarnato *et al*., 2014)
    * DMS와 CMCT를 이용하여 RNA probing을 하는 방법
    * DMS는 unpaired A와 C를, CMCT는 unpaired G나 U에 modification을 일으킨다.
    * RT stops을 이용하여 unpaired residues의 위치를 알아낸다.
* **Structure-Seq**: DMS를 이용하여 probing을 하는 method를 지칭하는 용어. 넓은 의미
* **DMS-Seq**: DMS를 이용한 in vivo method. Weissman lab (Ding *et al*., 2014; Rouskin *et al*., 2014)
    * DMS(Dimethyl sulfate)는 unpaired A와 C의 염기를 modification 시킨다.
    * DMS-modified A와 C는 RT stop의 원리를 이용하여 정확한 위치를 알 수 있다.
* **Mod-Seq**: DMS를 이용한 in vitro method. McManus & co-workers (Talkish *et al*., 2014)
    * DMS-Seq과 매우 유사하지만 5' RNA ligation 단계가 하나 더 포함되어 있는 것이 차이점이다.
* **icSHAPE**: *in vivo* click selective 2'-hydroxyl acylation and profiling experiment (Spitale *et al*., 2015)
    * *In vivo*에서 4개의 염기(A,C,G,T)의 paired/unpaired 상태를 동시에 볼 수 있는 첫 프로토콜
* **DMS-MaPseq**: DMS mutational profiling with sequencing (Zubradt *et al*., 2017)
    * RT stop 방식 대신 RT mutation의 원리를 이용


### 리뷰 논문들

* [Genome-Wide Analysis of RNA Secondary Structure](http://www.annualreviews.org/doi/abs/10.1146/annurev-genet-120215-035034) (Bevilacqua *et al*., 2016)
    * RNA secondary structure probing 방법들에 대해 표로 잘 정리되어 있다.
    * MFold/UNAFold: http://unafold.rna.albany.edu/
    * RNAstucture: http://rna.urmc.rochester.edu/RNAstructure.html
    * StructureFold in Galaxy: https://usegalaxy.org/ (select "NGS: RNA Structure")
    * ViennaRNA Package: https://www.tbi.univie.ac.at/RNA/
    * RNA modification database: http://mods.rna.albany.edu/mods/modifications/search
