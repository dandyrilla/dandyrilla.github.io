---
layout: post
title: "리스트의 정렬 여부를 체크하는 효율적인 방법"
description: "파이썬의 빌트인 함수인 all과 zip을 활용하여 정렬 여부를 체크하는 방법을 알아봅니다."
tags: [python tips, built-in functions, all, zip]
share: true
comments: true
---

### 정렬 여부를 체크하는 쉬운 방법

다음과 같은 `ages`라는 이름의 리스트가 있다고 가정해 봅시다. 이는 회원들의 나이를 내용으로 갖는 리스트입니다. 순서대로 잘 정리된 것처럼 보이지만 마지막의 '19, 30, 24' 부분에서 순서가 제대로 정렬되지 않은 상태입니다.

```python
ages = [13, 16, 19, 30, 24]
```

값들의 정렬 여부를 확인하기 위해 다음과 같이 `sorted` 함수를 이용할 수 있지요. 순서대로 정렬한 리스트가 원래 리스트와 같은지를 확인하는 방식입니다.

```python
is_sorted = (sorted(ages) == ages)  # It returns False
```

또는 역순으로(숫자가 큰 것이 먼저 오도록) 정렬되어있는지 확인하고싶다면 `sorted` 함수의 결과를 인덱싱을 사용하여 순서를 바꿔주어 비교하거나, `sorted` 함수에 `reverse=True`라는 인자를 넣어주면 됩니다.

```python
is_sorted = (sorted(ages)[::-1]         == ages)
is_sorted = (sorted(ages, reverse=True) == ages)
```


### 빌트인 함수 `all` 이용하기

그러나 위에 소개된 방법은 정렬이 되었는지 체크하기 위해서 **정렬이라는 작업이 한번 수행되어야 하기 때문**에 만약에 리스트의 길이가 긴 상황에서는 시간이 많이 걸릴 수 있습니다. 그렇다면 리스트를 *'그대로 놔둔 상태'*에서 체크할 수 있는 방법은 없을까요? 인접한 두 요소간의 비교를 여러번 하여 리스트 전체의 정렬 여부를 판단할 수 있는 방법이 있습니다. 예를 들면, 첫번째 숫자(13)와 두번째 숫자(16)를 비교해서 두번째 숫자가 큰지 체크해 보고, 두번째 숫자(16)와 세번째 숫자(19)를 비교하여 세번째 숫자가 큰지 체크하는 방식을 반복적으로 수행하면 됩니다. 각 비교의 결과는 모두 `True`가 나와야만 리스트가 제대로 정렬 되었다고 말할 수 있겠죠? 이때 빌트인 함수 `all`을 사용하면 됩니다. **`all`은 인자로 주어진 리스트의 모든 요소가 `True`일때 `True`를 반환하는 함수**입니다. 지금까지 말한 내용을 구현하면 다음과 같습니다.

```python
is_sorted = all(ages[i] < ages[i+1] for i in range(len(ages)-1))
## (True, True, True, False) --> False
```

ages는 크기가 5인 리스트라서, 그보다 하나 적은 4번의 반복을 하며 앞과 뒤의 숫자를 연달아 비교합니다. 맨 마지막의 비교(30과 24)에서 뒤의 숫자가 크지 않기 때문에 `False`를 반환하고, 모두가 `True`의 결과값이 아니기 때문에 종합적으로 `all` 함수의 리턴값은 당연히 `False`가 됩니다. 즉, 정렬되지 않았다는 것을 알려줍니다.


### 반복을 할 때 `range` 대신 `zip` 이용하기

자, 이제는 인접한 두 요소를 뽑아낼 때 `range`를 쓰지 않고 `zip`함수를 써볼까요? **`zip`은 길이가 같은 반복가능한 객체들을 인자로 여러개 받아들여 순서대로 각 객체들에 있는 요소들을 앞에서부터 각각 하나씩 순서대로 반환하는 함수**이다. 설명보다는 다음의 코드를 보면 이해가 되실 겁니다.

```python
agesX = ages[:-1]  # [13, 16, 19, 30]
agesY = ages[1:]   # [16, 19, 30, 24]

for x, y in zip(agesX, agesY):
    print(x, y)
    # 13, 16
    # 16, 19
    # 19, 30
    # 30, 24
```

`ages[:-1]`는 리스트 `ages`가 갖고 있는 맨 뒤의 숫자인 24만 제외한 리스트이며, `ages[1:]`는 그와 반대로 맨 앞의 숫자인 13만 제외한 리스트입니다. 이 둘은 한 숫자만 제외하였으므로 길이가 4로 같습니다. 이 둘을 `zip` 함수에 넣어주면 두 리스트의 요소들이 각각 하나씩 순서대로 리턴되는 것을 볼 수 있습니다. 그렇지만 이러한 동작의 의미를 달리 해석해 보면 `ages`라는 리스트에서 인접한 두 쌍을 계속 리턴하는 방법으로 생각할 수 있습니다. 따라서 인접한 두 숫자를 비교하는 데에도 사용할 수 있는 것입니다.

```python
# check if it is sorted in ascending order
is_sorted = all(x<y for x, y in zip(ages[:-1], ages[1:]))

# check if it is sorted in descending order
is_sorted = all(x>y for x, y in zip(ages[:-1], ages[1:]))
```

이것의 장점은 우리가 마음대로 판단의 내용을 정할 수 있다는 것입니다. 정순으로 정렬하고 싶으면 `x<y`, 역순으로 정렬하고 싶으면 `x>y`로 해주면 됩니다. 만약 ages라는 리스트가 같은 값을 여러 개 갖는 경우라면 위의 비교로는 정렬이 되지 않았다고 판단될 수 있습니다. 인접한 두 요소인 x와 y 값이 같은 값일 때에는 `x<y`나 `x>y` 모두 `False`이기 때문이지요. 그 때에는 정렬한 후 앞과 뒤의 값이 같을 수도 있으므로 `x<=y`(정순의 경우) 또는 `x>=y`(역순의 경우)로 바꿔주면 같은 값이 존재하더라도 전체적인 정렬 여부를 확인할 수 있습니다.


### sorted 함수를 사용하는 방법보다 얼마나 더 빠를까?

그렇다면, sorted 함수를 쓰는 것보다 얼마나 더 빨리 정렬 여부를 알아낼 수 있을까요? 실행시간을 비교하기 위해 다음 스크립트와 같이 백만(1,000,000)개의 무작위의 나이값을 가지는 리스트를 만들었습니다. 그리고 sorted 함수를 이용한 방법과 all과 zip만을 활용한 방법으로 정렬되었는지의 여부를 확인하고 그 실행시간을 다음과 같이 측정해보았습니다.

```python
ages = [random.randint(0,100) for i in range(10**6)]

t1 = time.time()
is_sorted = (ages == sorted(ages))
t2 = time.time()

print('is_sorted={}'.format(is_sorted), '{:.6f} secs'.format(t2-t1))

t1 = time.time()
is_sorted = all(x<=y for x, y in zip(ages[:-1], ages[1:]))
t2 = time.time()

print('is_sorted={}'.format(is_sorted), '{:.6f} secs'.format(t2-t1))
```

위와 같은 스크립트를 3번 실행하였고, 그 결과는 아래와 같았습니다.

```python
# 1st try:
# is_sorted=False 0.283676 secs
# is_sorted=False 0.013229 secs

# 2nd try:
# is_sorted=False 0.282903 secs
# is_sorted=False 0.012725 secs

# 3rd try:
# is_sorted=False 0.284382 secs
# is_sorted=False 0.013113 secs
```

sorted 함수를 이용하였을 때에는 약 0.284초, all과 zip을 이용하였을 때에는 0.013초가 걸렸네요. all과 zip만을 이용하여 정렬 여부를 확인하는 것이 약 **20배 빠른 성능**을 보여주었습니다.