---
layout: post
title: "파이썬 matplotlib 패키지"
description: "matplotlib 사용법과 팁"
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

plt.subplots() 메소드를 이용한다.

```python
x = np.linspace(0, 2*np.pi, 400)
y = np.sin(x**2)

ax = plt.subplots(2)
```