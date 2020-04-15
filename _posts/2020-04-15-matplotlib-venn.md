---
layout: post
title: "파이썬으로 벤다이어그램 그리기"
image: /images/2020-04-15/cover.svg
description: >
  파이썬(python)에서 matplotlib_venn 패키지를 활용하여 벤다이어그램을 그려보고
  사용하려는 목적에 맞게 다양하게 커스터마이징 하는 방법을 알아봅니다.
tags: [python, venndiagram, matplotlib_venn]
share: true
comments: true
---

### matplotlib-venn 패키지 소개 및 설치

벤 다이어그램을 그릴 수 있는 패키지는 다양합니다.
이 포스팅에서는 그 중에 matplotlib 이라는 plotting 패키지 위에서 동작하는 matplotlib_venn 패키지를 소개하려고 합니다.
matplotlib-venn 패키지는 2개 또는 3개의 집합들에 대해 벤 다이어그램을 그리는 것이 가능합니다.
집합의 수에 따라 사용해야 하는 함수의 이름이 다른 것이 특징입니다.
2개인 경우에는 `venn2` 함수를, 3개인 경우에는 `venn3` 함수를 사용하면 됩니다.
이 기본 함수 외에도 각 집합을 윤곽선만 있는 원으로 표시하는 함수인 `venn2_circles` 및 `venn3_circles` 와
집합의 크기를 원의 크기에 반영하지 않는 함수인 `venn2_unweighted` 및 `venn3_unweighted` 가 있습니다.
이렇게 말씀드린 6개의 함수가 이 패키지에서 제공하는 전부입니다.

![image](/images/2020-04-15/funcs.png "Functions in matplotlib-venn package"){: .center-image}

지금 여러분이 필요로 하는 기능이 담겨있는 패키지가 맞나요? 그렇다면 설치를 한번 해 봅시다.
현재 파이썬을 사용하는 환경마다 설치 방법이 조금씩 다를 텐데요.
간략히 easy_install 또는 conda 를 이용한 설치 방법을 소개해 보겠습니다.
먼저 파이썬만을 단독으로 설치해서 사용하는 환경의 경우에는 easy_install 을 사용하여 아래와 같이 설치해주면 됩니다.

```
easy_install matplotlib-venn
```

그리고 아나콘다 환경에서는 conda install 명령어를 이용하여 설치해주시면 됩니다. 설치 시에 채널을 지정하지 않으면
패키지를 못 찾을 수 있으니 채널을 지정하는 옵션인 `-c conda-forge` 를 넣어 설치하는 것을 권장합니다.

```
conda install -c conda-forge matplotlib-venn
```

설치가 성공적으로 되었다면 아래와 같이 패키지를 불러오는 데 문제가 없어야 합니다.

```python
from matplotlib_venn import venn2
```


### matplotlib-venn 기본 사용법

(작성중입니다.)

