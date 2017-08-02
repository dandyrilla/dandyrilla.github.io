---
layout: post
title: "Equal-sized binning methods"
description: "파이썬으로 일정한 크기를 갖는 구간을 나누는 방법들에 대해 설명합니다."
share: true
comments: true
---

우리는 종종 균등하게 나누는 문제를 접할 때가 있다. 빵 3개를 2명의 친구들에게 나누어주려면 빵 1개와 빵 하나를 반으로 나누는 방법으로 한 명의 친구당 1.5개씩 나누어 주면 된다. 하지만 해당 요소들이 쪼갤 수 없는 성질을 갖고 있는 것들이라면 완전히 같은 갯수로 나누지 못한다. 바로 다음과 같은 예제들이다.

* (일반적인 예제) 여름 휴가지로 떠나려고 하는데 10명의 친구들을 3대의 차에 나누어 태워야 할 때: 한 차당 3.3명(10명/3대)씩. 그러나 사람은 나눌(?)수 없다. 몇몇의 차에는 다른 차보다 1명이 적거나 많이 타야 한다.
* (생물정보학적 예제) 약 1만 8천 개의 인간 유전자를 전사체 길이에 따라 정렬한 뒤 같은 크기를 갖는 10개 그룹으로 나누어야 할 때: 유전자도 쪼갤 수 없다. 어느 그룹에는 다른 그룹들보다 유전자의 갯수가 1개씩 차이가 나게 된다.

이러한 문제들을 파이썬으로 짠다면 어떻게 될까? 구간(시작과 끝)을 계산해주는 방법(`binning1` 함수)과 해당 요소가 어느 그룹으로 속할지를 정해주는 방법(`binning2` 함수)이 있다. 아래의 코드를 살펴보자.

### 1. 시작과 끝을 정의해주는 방법

```python
def binning1(n, nbins):
    sizes = []
    for i in range(nbins):
        s = int(n*(i+0)/nbins)  # start index
        e = int(n*(i+1)/nbins)  # end index
        sizes.append(e-s)
    return sizes
```

```python
>>> sizes1 = binning1(10, 3)
>>> print(sizes1)
[3, 3, 4]
```

### 2. 그룹 번호를 지정해주는 방법

```python
def binning2(n, nbins):
    sizes = [0 for i in range(nbins)]
    for i in range(n):
        b = int(i/n*nbins)  # bin index
        sizes[b] += 1
    return sizes
```

```python
>>> sizes2 = binning2(10, 3)
>>> print(sizes2)
[4, 3, 3]
```

