---
layout: post
title: "리스트의 정렬 여부를 체크하는 여러 방법들"
description: "파이썬의 all과 zip에 대한 이해를 돕기 위한 내용입니다."
tags: [python tips, zip]
share: true
comments: true
---

다음과 같은 `ages`라는 이름의 튜플이 있다고 가정하자. 순서대로 잘 정리된 것처럼 보이지만 19, 30, 24 부분에서 순서가 제대로 정렬되지 않은 상태이다.

```python
ages = [13, 16, 19, 30, 24]
```

값들의 정렬 여부를 확인하기 위해 다음과 같이 `sorted()`함수를 이용할 수 있다. 순서대로 정렬한 리스트가 원래 리스트와 같은지를 확인하는 것이다.

```python
is_sorted1 = (sorted(ages) == ages)
```

혹은 역순으로 정렬되어있는지 확인하려면 `sorted()`함수에 `reverse=True`라는 인자를 넣어주면 된다.

```python
is_sorted2 = (sorted(ages, reverse=True) == ages)
```

sorted 함수를 쓰지 않고 쓰는 방법으로 이런 방법도 존재한다. 이것의 장점은 우리가 마음대로 판단의 내용을 정할 수 있다는 것이다.

```python
is_sorted2 = all(x<y for x, y in zip(ages[:-1], ages[1:]))
```