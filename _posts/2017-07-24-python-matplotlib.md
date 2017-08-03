---
layout: post
title: "파이썬 matplotlib 패키지"
description: "matplotlib 사용법과 팁"
tags: [python, matplotlib]
share: true
comments: true
---

### matplotlib 사용을 위한 import 구문

관용적으로 쓰이는 import 구문은 아래와 같다. 이에 더하여 실습을 위해 numpy도 같이 import 하였다.

```python
import matplotlib.pyplot as plt
import numpy as np
```

### 한 화면에 여러 개 그래프 동시에 그리기

#### 1. `plt.subplots()` 메소드를 이용하는 방법

x축 y축을 서로 공유하는지의 여부를 같이 결정해줄 수 있는 장점이 있다.

```python
x = np.linspace(0, 2*np.pi, 400)
y = np.sin(x**2)

ax = plt.subplots(2)
```

#### 2. `plt.subplot()` 메소드를 이용하는 방법

이를 이용하면 독립적으로 그래프를 그릴 수 있다.

```python
plt.figure(1)

plt.subplot(211)
plt.plot(x, y)

plt.subplot(212)
plt.plot(x, y)
```

### plt와 axis의 차이

`plt`를 통해 그리는 것과 `axis`를 통해 그릴 때 메소드명이 약간씩 다르다.

#### xtick

```python
plt.xticks(x, xtlab, rotation=90)
```

```python
ax.set_xticks(x)
ax.set_xticklabels(xtlab, rotation=90)
```

#### x-axis, y-axis label

```python
plt.xlabel('x-axis label')
plt.ylabel('y-axis label')
```

```python
ax.set_xlabel('x-axis label')
ax.set_ylabel('x-axis label')
```


#### xlim, ylim

```python
plt.xlim(0, 1)
plt.ylim(0, 1)
```

```python
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
```