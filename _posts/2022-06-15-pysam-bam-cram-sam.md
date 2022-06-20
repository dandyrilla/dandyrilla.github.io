---
layout: post
title: "pysam 으로 BAM, CRAM, SAM 포맷 파일 다루기"
description: >
  BAM, CRAM, SAM 과 같은 서열 정렬 데이터를 다룰 때 유용한 pysam 모듈의 사용법에 대해 알아봅니다.
tags: [pysam, bam, cram, sam]
comments: true
share: true
---

## 파일 열기

먼저, 가장 자주 접하는 BAM 포맷으로 된 파일을 열어봅시다. pysam 모듈을 다음과 같이 import 시켜준 뒤
`pysam.AlignmentFile` 을 이용하여 파일을 열어주면 됩니다. 첫 번째 인자에는 파일 경로를, 두 번째
인자에는 파일을 읽어들일 형식을 지정해줍니다. BAM 포맷은 바이너리 형식으로 되어있으므로 `rb` 를
넣어주었습니다.

```python
import pysam

bam = pysam.AlignmentFile('alignment.bam', 'rb')
```

일반 텍스트로 된 버전인 SAM 포맷의 파일을 열어보기 위해서는 형식만 `r` 로 바꾸어 주면 됩니다.

```python
import pysam

sam = pysam.AlignmentFile('alignment.sam', 'r')
```

CRAM 포맷 파일은 다음과 같이 `rc` 로 지정하여 읽어들입니다.

```python
import pysam

cram = pysam.AlignmentFile('alignment.cram', 'rc')
```


## 특정 구간에 있는 mapped reads 가져오기

Reads 는 `fetch()` 메소드를 이용하여 꺼내올 수 있습니다. 이는 iterator 를 반환하는데요.
iterator 는 호출이 될 때마다 `pysam.AlignedSegment` 오브젝트를 반환해 줍니다. 다음의 예제는
많이 연구되는 TP53 유전자에 매핑된 read 들을 가져옵니다. TP53 유전자는 hg38 기준으로 `chr17` 의
`7668421` 부터 `7687491` 구간에 존재하니 이들을 각각 인자로 넣어줍니다.

```python
iter = bam.fetch('chr17', 7668421, 7687491)

for read in iter:
    print(str(read))
```

`fetch()` 메소드는 인자로 넣어준 구간과 겹치는 모든 read 들을 반환합니다. 첫 염기가 reference
서열에 정렬된 순서대로 반환됩니다. 따라서 넣어준 구간과 일부 겹치지만 read 의 시작과 끝 위치가 넣어준
구간을 벗어날 수도 있음에 유의하셔야 합니다.


## pileup 엔진 이용하기

앞서 소개한 fetch 와는 달리, pileup 엔진은 reference 서열의 특정 위치에 매핑된 모든 read 의
염기들을 반환해 줍니다. 서열 정렬이 된 모습을 상상해 보면, 제일 위에 reference 서열이 있고, 그 아래에
read 들이 차곡차곡 쌓여있는 모양새입니다. fetch 는 read 단위로 읽어보는 데 반해, pileup 은 컬럼
단위로 읽어오는 것이라고 생각하면 이해가 쉽습니다.

pileup 을 호출하는 것은 지정된 구간의 각 컬럼을 도는 iterator 를 반환해줍니다. 이 iterator 는
호출될 때마다 해당 위치에 정렬되어 있는 모든 read 들의 염기 정보를 알 수 있게 해주는
`pysam.PileupColumn` 오브젝트를 반환합니다.

```python
iter = bam.pileup('chr17', 7668421, 7687491)

for pos in iter:
    print(str(pos))
```

## BAM, CRAM, SAM 파일 만들기

아래 예제는 새로운 BAM 파일을 만드는 방법을 보여줍니다. 여기서 중요한 부분은 `pysam.AlignmentFile`
클래스가 서열 식별자를 필요로 한다는 것입니다. 딕셔너리 형태로, 이름과 길이 정보가 있는 리스트로, 또는
템플릿 파일로 전달 가능합니다. 여기에서는 header 딕셔너리를 사용하였습니다.

```python
header = {
    'HD': {'VN': '1.0'},
    'SQ': [{'LN': 1575, 'SN': 'chr1'},
           {'LN': 1584, 'SN': 'chr2'}]
}

with pysam.AlignmentFile('alignment.bam', 'wb', header=header) as out_f:
    a = pysam.AlignedSegment()
    a.query_name = 'read_28833_29006_6945'
    a.query_sequence='AGCTTAGCTAGCTACCTATATCTTGGTCTTGGCCG'
    a.flag = 99
    a.reference_id = 0
    a.reference_start = 32
    a.mapping_quality = 20
    a.cigar = ((0, 10), (2, 1), (0, 25))
    a.next_reference_id = 0
    a.next_reference_start = 199
    a.template_length = 167
    a.query_qualities = pysam.qualitystring_to_array('<<<<<<<<<<<<<<<<<<<<<:<9/,&,22;;<<<')
    a.tags = (('NM', 1), ('RG', 'L1'))
    out_f.write(a)
```

## 파일 스트림 이용하기

pysam 은 표준 입출력 스트림으로부터 파일을 읽고 쓰는 것이 가능합니다. 다음 예제는 표준 입력 (stdin)
으로 SAM 포맷 파일을 읽어들여 표준 출력 (stdout) 으로 파일을 쓰는 것을 보여줍니다.

```python
in_f = pysam.AlignmentFile('-', 'r')
out_f = pysam.AlignmentFile('-', 'w', template=in_f)
for read in in_f:
    out_f.write(read)
```

이 또한 BAM 포맷의 파일에 적용될 수 있습니다. 다음의 예제는 BAM 포맷의 파일을 읽어들여 SAM 포맷의
파일로 출력하는 것을 보여줍니다. 파일 오픈 모드가 `r` 에서 `rb` 로 바뀌었다는 것에 유의하세요.

```python
in_f = pysam.AlignmentFile('-', 'rb')
out_f = pysam.AlignmentFile('-', 'w', template=in_f)
for read in in_f:
    outfile.write(read)
```
