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



### 다중 비교 (multiple comparison)

[간호학대사전](http://terms.naver.com/entry.nhn?docId=489137&cid=55558&categoryId=55558)에는 다음과 같이 다중 비교를 설명하고 있다.

> 실험계획법 등에서 각 요인의 효과를 분산분석에 의하여 검정한 경우, 주 효과가 인정되어도, 어떤 수준간에 유의한 차이가 존재하는가는 지적할 수 없다. 그와 같은 경우, 요인의 각 수준에 대하여, 모든 조합에 대한 평균의 차이를 검정하는 것을 말한다. 이 경우, 여러번 검정을 동시에 행하기 때문에, 전체의 유의수준을 a에 유지하기 위해서 검정의 유의수준 설정에 연구가 필요하게 된다. Bonferroni 방법, Scheffe의 방법, Tukey의 한계치법, Dunnett의 방법, Fisher의 최소 유의차한계법 등이 있다.


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

#### Regression analysis

```python
import statsmodels.api as sm
est = sm.OLS(y, X).fit()
print(est.summary())
```

```python
from sklearn import linear_model
lr = LinearRegression().fit(X,y)
lr.coef_
lr.intercept_
lr.score()
```