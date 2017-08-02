---
layout: post
title: 통계학
description: 통계학
tags: [statistics]
share: true
comments: true
---


### 통계적 결정

강조하고 싶은 문구가 있다면 다음과 같이 span태그를 활용하여 <span style="color:red">붉은색으로 강조</span>하면 됩니다.

> 인용문구는 이와 같이 작성하면 됩니다. <br/> 줄바꿈을 위해 br 태그도 사용할 수 있습니다.


표는 아래와 같이 작성합니다.

|   | N   | P   |
|---|---|---|
| N | TN  | FN  |
| P | FP  | TP  |



### 파이썬으로 각종 통계 테스트 하기

#### Chi-square test using 2x2 contingency table
```python
import numpy as np
import scipy.stats
obs = np.array([[n1, n2], [n3, n4]])
chi2, p, dof, expected = scipy.stats.chi2_contingency(obs, correction=False)
```

#### Two-sample K-S test / Ranksum test

```python
import scipy.stats
data1 = [1, 2, 3, 4]
data2 = [2, 4, 6, 8]
p_ks = scipy.stats.ks_2samp(data1, data2)[1]
p_rs = scipy.stats.ranksums(data1, data2)[1]
```

#### Correlation coefficient

```python
import numpy as np
import scipy.stats
r   = np.corrcoef(x, y)[0, 1]  # Pearson's corrleation coefficient
rho = scipy.stats.spearmanr(x, y)[0]  # Spearman's rank correlation coefficient
```
