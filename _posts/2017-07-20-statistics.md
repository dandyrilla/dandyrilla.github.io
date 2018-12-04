---
layout: post
title: 통계학
description: 통계학
tags: [statistics]
share: true
comments: true
---


### Classifciation evaluation

개발된 모델에 의해 우리는 개별 사례들을 분류해야 하는 경우가 있습니다. 새로 개발된 바이러스 검사 키트를 이용해 사람들의
감염 여부를 판단해야 하는 경우를 예로 들 수 있습니다. 실제 바이러스에 감염된 사람과 감염되지 않은 사람을 정확히 가려낼
때 완벽한 검사 방법이라고 할 수 있습니다. 하지만 완벽하지 않은 경우들이 존재하므로, 얼마나 좋은 검사 방법인지를 판단할
수 있는 방법들이 있습니다.

![Image](https://www.nature.com/nmeth/journal/v13/n8/images/nmeth.3945-F1.jpg "The confusion matrix"){: .center-image}

The confusion matrix (Lever *et al*., Nature Methods, 2016)
{: .center}



### 다중 비교 (multiple comparison)

> 실험계획법 등에서 각 요인의 효과를 분산분석에 의하여 검정한 경우, 주 효과가 인정되어도, 어떤 수준간에 유의한 차이가
존재하는가는 지적할 수 없다. 그와 같은 경우, 요인의 각 수준에 대하여, 모든 조합에 대한 평균의 차이를 검정하는 것을
말한다. 이 경우, 여러번 검정을 동시에 행하기 때문에, 전체의 유의수준을 a에 유지하기 위해서 검정의 유의수준 설정에 연구가
필요하게 된다. Bonferroni 방법, Scheffe의 방법, Tukey의 한계치법, Dunnett의 방법, Fisher의 최소 유의차한계법 등이 있다.
(출처: [간호학대사전](http://terms.naver.com/entry.nhn?docId=489137&cid=55558&categoryId=55558))

### 분산분석법 (analysis of variance)

> 분산분석법은 관측값의 변동(variability)을 분해하고 해석하는 방법이다. 이 글에서는 처리가 I개 수준이고 각 처리수준에서
반복 수가 n인 실험자료에 대한 분산분석법을 설명하기로 한다. 개별 관측값은 y<sub>ij</sub>로 표현하자. (단, i는
처리수준이고 j는 반복차수이다. i = 1, ..., I, j = 1, ..., n) 예를 들어



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


#### Binomial test

See [documentation of scipy.stats.binom_test](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom_test.html)

```python
import scipy.stats

scipy.stats.binom_test(30, 100, 0.5)                   # 7.85013964559e-05
scipy.stats.binom_test(30, 100, 0.5, 'two-sided')      # 7.85013964559e-05
scipy.stats.binom_test(30, 100, 0.5, 'two-sided') / 2  # 3.9250698228e-05
scipy.stats.binom_test(30, 100, 0.5, 'less')           # 3.9250698228e-05
scipy.stats.binom_test(70, 100, 0.5, 'greater')        # 3.9250698228e-05
```



강조하고 싶은 문구가 있다면 다음과 같이 span태그를 활용하여 <span style="color:red">붉은색으로 강조</span>하면 됩니다.

> 인용문구는 이와 같이 작성하면 됩니다. <br/> 줄바꿈을 위해 br 태그도 사용할 수 있습니다.


표는 아래와 같이 작성합니다.