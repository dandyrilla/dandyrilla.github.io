---
layout: post
title: "RNA binding proteins"
description: "Review/research papers and research groups on RBPs"
date: 2017-07-12
tags: [RNA binding protein, RBP, RNA, CLIP]
comments: true
share: true
---


## Review Papers

* 2017-03, Lewis, Nature Reviews MCB, [**RNA modifications and structures cooperate to guide RNA-protein interactions**](https://www.nature.com/nrm/journal/v18/n3/full/nrm.2016.163.html): RNA와 RBP와의 상호작용에 있어 RNA sequence 외에도 RNA modification이나 RNA secondary structure가 영향을 줄 수 있다. 그리고 이러한 요인들은 상호 의존적으로 동적으로 변화하면서 영향을 미친다.

* 2014-12, Gerstberger, Nature Reviews Genetics, [**A census of human RNA-binding proteins**](https://www.nature.com/nrg/journal/v15/n12/abs/nrg3813.html): 인간 세포에서 발현되는 RBP는 1,542 종류가 될 만큼 많다.

* 2012-02, Konig, Ule, Nature Reviews Genetics, [**Protein-RNA interactions, new genomic technologies and perspectives**](https://www.nature.com/nrg/journal/v13/n2/full/nrg3141.html): RNA binding landscape를 살펴볼 수 있는 technology인 PAR-CLIP, CLIP-Seq, iCLIP-Seq에 대한 설명과 비교

* 2007-06, Lunde, Varani, Nature Reviews, [**RNA-binding proteins - modular design for efficient function**](http://www.nature.com/nrm/journal/v8/n6/abs/nrm2178.html): RNA-binding protein의 multiple modules이 biological function을 나타내는 데 있어 어떻게 기본적인 구조를 형성하는지에 대한 리뷰. 다양한 RNA-binding domains에 대한 설명을 찾아볼 수 있다. - RRM, KH, dsRBD, ZnF-CCHH, ZnF-CCCH, S1, PAZ, PIWI, TRAP, Pumilio, SAM

* 2002-03, Dreyfuss, Nature Reviews MCB, [**Messenger-RNA-binding proteins and the messages they carry**](http://www.nature.com/nrm/journal/v3/n3/full/nrm760.html): HnRNP and mRNP proteins, mRNA splicing, NMD


## Research Papers

* 2016-10, Taliaferro, Molecular Cell, [**RNA Sequence Context Effects Measured In Vitro Predict In Vivo Protein Binding and Regulation**](https://doi.org/10.1016/j.molcel.2016.08.035): RBP-binding motifs 중 대부분이 RBP에 의해 결합되지 않는 현상이 종종 관찰된다. 왜냐하면 RNA secondary structure가 RBP binding에 큰 영향을 미치기 때문이다. RNA 상에 RBP-binding motif가 존재하더라도 이 부분이 강한 hairpin structure의 stem-loop 구조 속에 숨어있다면 이는 RBP가 제대로 결합할 수 없다.

* 2016-03, Nostrand, Yeo, Nature Methods, [**Robust transcriptome-wide discovery of RNA-binding protein binding sites with enhanced CLIP**](http://www.nature.com/nmeth/journal/v13/n6/full/nmeth.3810.html): iCLIP-Seq 보다 더 정확한 eCLIP-Seq 프로토콜에 관한 논문. Amplification 과정을 줄여 PCR duplicate reads를 없애고 size-matched input을 control로 사용함으로써 peak calling시에 더욱 정확도를 높였다. K562와 HepG2의 인간 세포주에서 100 종류 이상의 RBP들에 대한 eCLIP-Seq 데이터를 만들어 [ENCODE project](https://www.encodeproject.org/matrix/?type=Experiment&assay_title=eCLIP&biosample_type=immortalized+cell+line)에 공개해 놓았다.

* 2014-06, Lambert, Molecular Cell, [**RNA Bind-n-Seq: Quantitative Assessment of the Sequence and Structural Binding Specificity of RNA Binding Proteins**](http://www.cell.com/molecular-cell/fulltext/S1097-2765(14)00327-X): RBNS(RNA Bind-n-Seq)을 이용하여 RBP들의 binding motifs를 밝혀낸 resource 논문. RBNS는 random 20nt RNA pool에 특정 RBP를 넣어주고 pull down하여 어떤 RNA sequence를 가진 RNA들이 enrich되었는지를 보는 *in vitro* assay 방법이다. [ENCODE project](https://www.encodeproject.org/search/?type=Experiment&assay_title=RNA+Bind-n-Seq&limit=all)에서 데이터를 확인할 수 있다.

* 2013-07, Ray, Nature, [**A compendium of RNA-binding motifs for decoding gene regulation**](https://www.nature.com/nature/journal/v499/n7457/full/nature12311.html): 24종류의 eukaryotes의 200개 이상의 RBP들에 대한 RNA-binding motifs를 찾아본 연구. RRM과 KH 도메인 단백질의 binding motifs가 무엇인지를 RNAcompete라는 방법을 사용하여 알아내었다.

Research Groups
-----

* [Hentze group, EMBL](https://www.embl.de/research/units/directors_research/hentze/): RNA biology, Metabolism and molecular medicine, mRNA interactome capture (Castello et al., 2012), RBDmap (Castello et al., 2016), enigmRBPs (Beckmann et al., 2015), REM networks (Hentze & Preiss, 2010)

* [Chaolin Zhang, Columbia University](https://zhanglab.c2b2.columbia.edu): Robert Darnell lab에서 postdoc으로 지내며 Rbfox CLIP-Seq 데이터로부터 더욱 정확한 crosslinking sites를 찾아내는 연구를 수행하였고, 지금은 Columbia University에서 신경계에서의 RNA regulatory network에 대해 연구하고 있다. 

* [Robert Darnell, The Rockefeller University](http://lab.rockefeller.edu/darnell/)


Tips for searching
-----

* 구글에서 review, rna-binding protein과 같은 키워드를 넣어 검색해 보면 된다.

* Nature에서는 [주제별 검색](https://www.nature.com/subjects)이 가능하게 되어있다. 주제에 RNA-binding protein이라고 입력한 후 살펴보면 이와 관련된 최근 연구결과들을 살펴볼 수 있다.
