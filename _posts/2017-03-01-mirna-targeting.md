---
layout: post
title: microRNA targeting
description: miRNA targeting과 관련된 리뷰 논문 및 연구 논문들을 살펴봅니다.
tags: [microRNA, miRNA, microRNA targeting, miRNA targeting]
comments: true
share: true
---

## Review Papers

* 2011-02, Huntzinger, Nature Reviews Genetics, [**Gene silencing by microRNAs, contributions of translational repression and mRNA decay**](https://www.ncbi.nlm.nih.gov/pubmed/21245828)

* 2010-10, Garzon, Nature Reviews Drug Discovery, [**Targeting microRNAs in cancer: rationale, strategies and challenges**](http://www.nature.com/nrd/journal/v9/n10/full/nrd3179.html)

* 2009-01, Bartel, Cell, [**MicroRNAs: Target Recognition and Regulatory Functions**](https://www.ncbi.nlm.nih.gov/pubmed/19167326)

* 2008-02, Filipowicz, Nature Reviews Genetics, [**Mechanisms of post-transcriptional regulation by microRNAs: are the answers in sight?**](https://www.ncbi.nlm.nih.gov/pubmed/18197166)

* 2007-05, Nilsen, Trends in Genetics, [**Mechanisms of microRNA-mediated gene regulation in animal cells**](https://www.ncbi.nlm.nih.gov/pubmed/17368621)

* 2004-01, Bartel, Cell, [**MicroRNAs: Genomics, Biogenesis, Mechanism, and Function**](https://www.ncbi.nlm.nih.gov/pubmed/14744438)


## Research Papers

* 2016-10, Kim, Nature Genetics, [**General rules for functional microRNA targeting**](https://www.ncbi.nlm.nih.gov/pubmed/27776116): 현재까지 알려졌던 4종류의 canonical site types(8mer, 7mer-m8, 7mer-A1, 6mer)외에 추가적인 non-canonical site types(NSTs)을 발견하였다. 인간의 mRNA sequence와 miRNA sequence 사이에 일어날 수 있는 가능한 모든 base-pairing 경우에 대해 통계적 테스트를 거쳐 NSTs를 찾아내었다.

* 2015-08, Agarwal, Bartel, eLife, [**Predicting effective microRNA target sites in mammalian mRNAs**](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4532895): TargetScan v7.0

* 2012-04, Djuranovic, Science, [**miRNA-Mediated Gene Silencing by Translational Repression Followed by mRNA Deadenylation and Decay**](https://www.ncbi.nlm.nih.gov/pubmed/22499947): Drosophila S2 세포에서 miRNA에 의한 transaltional repression 관찰. Protein level을 측정할 수 있는 luciferase reporter assay와 RNA level을 측정할 수 있는 qRT-PCR을 이용하여 mRNA degradation이 일어나기 전에 translational repression이 일어나는것을 확인했다. Rachel Green's lab의 연구 결과.

* 2012-04, Bazzini, Science, [**Ribosome Profiling Shows That miR-430 Reduces Translation Before Causing mRNA Decay in Zebrafish**](https://www.ncbi.nlm.nih.gov/pubmed/22422859): Zebrafish embryo에서 miR-430에 의한 gene silencing이 translational repression에 의해 촉발된다. Antonio Giraldez's lab의 연구 결과.

* 2011-10, Garcia, NSMB, [**Weak seed-pairing stability and high target-site abundance decrease the proficiency of lsy-6 and other microRNAs**](https://www.ncbi.nlm.nih.gov/pubmed/21909094): miRNA의 기능은 target site가 적을수록, seed pairing이 안정될수록 더 높아진다. (TA and SPS in microRNA targeting)

* 2010-08, Guo, Nature, [**Mammalian microRNAs predominantly act to decrease target mRNA levels**](http://www.nature.com/articles/nature09267): 동물 miRNA는 translational repression보다는 주로 mRNA degradation을 통해 작용한다. mRNA-Seq 데이터와 RPF-Seq 데이터를 같이 비교하여 protein output이 감소하는 원인이 어떤 조절단계에 있었는지를 알아내었다.

* 2010-06, Shin, Molecular Cell, [**Expanding the MicroRNA Targeting Code, Functional Sites with Centered Pairing**](https://www.ncbi.nlm.nih.gov/pubmed/20620952): 새로운 miRNA targeting rule인 **centered pairing**을 찾아냈다. miRNA의 5'end를 기준으로 4-14번째 또는 5-15번째의 nucleotides가 target mRNA와 결합하는 경우이다. 11종류 miRNA transfection 데이터를 분석하여 얻은 결과이다.

* 2009-01, Friedman, Genome Research, [**Most mammalian mRNAs are conserved targets of microRNAs**](https://www.ncbi.nlm.nih.gov/pubmed/18955434): 새로운 site type인 **offset 6mer**를 발견했다. miRNA의 2-7번째 nucleotides의 pairing이 이루어지는 기존의 canonical 6mer와는 달리 1-6번째 nucleotides의 pairing이 이루어지는 경우(offset 6mer)에도 miRNA targeting이 동작한다.

* 2008-09, Baek, Bartel, Nature, [**The impact of microRNAs on protein output**](https://www.ncbi.nlm.nih.gov/pubmed/18668037): desc

* 2007-07, Grimson, Molecular Cell, [**MicroRNA Targeting Specificity in Mammals: Determinants Beyond Seed Pairing**](https://www.ncbi.nlm.nih.gov/pubmed/17612493): microRNA targeting specificity를 결정하는데 있어서 seed pairing 외에 또 다른 요소들은 무엇이 있을까? 11종류의 miRNA들을 이용한 실험과 분석을 바탕으로 miRNA targeting specificity에 도움을 주는 **5가지 추가적인 요소**들을 밝혀내었다.
  1. AU-rich nucleotide composition near the site. (local AU)
  2. Proximity to sites for coexpressed miRNAs (which leads to cooperative action).
  3. Proximity to residues pairing to miRNA nucleotides 13-16.
  4. Positioning within the 3'UTR at least 15 nt from the stop codon.
  5. Positioning away from the center of long UTRs.

* 2005-01, Lewis, Cell, [**Conserved seed pairing, often flanked by adenosines, indicates that thousands of human genes are microRNA targets**](https://www.ncbi.nlm.nih.gov/pubmed/15652477): desc



## Commentaries

* 2012-09, Hu, Cell Research, [**What comes first: translational repression or mRNA degradation? The deepening mystery of microRNA function**](https://www.nature.com/cr/journal/v22/n9/full/cr201280a.html): miRNA의 작용이 translational repression이 먼저 일어나는지 아니면 mRNA degradation이 먼저 일어나는지에 대한 질문을 연구한 back-to-back 논문을 소개하는 글. 2012년 4월, Science에 Rachel Green lab의 논문과 Antonio Giraldez의 논문이 같이 실렸다. 두 논문 모두 miRNA에 의해 mRNA degradation이 일어나기 전에 translational repression이 선행된다는 동일한 결론을 얻었다고 소개하고 있다.


## Research Groups

* [David Bartel (MIT)](http://bartellab.wi.mit.edu/)

* [V. Narry Kim (Seoul National University)](http://www.narrykim.org)

* [Rachel Green (Johns Hopkins University)](http://pages.jh.edu/~greenlab)

* [Antonio Giraldez (Yale University)](http://www.giraldezlab.org)

* [Mark Kay (Stanford University)](http://kaylab.stanford.edu/)

* [Elisa Izaurralde (Max Planck Institute)](http://www.eb.tuebingen.mpg.de/research/departments/biochemistry.html)
