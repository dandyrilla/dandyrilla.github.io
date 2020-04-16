---
layout: post
title: "파이썬에서 벤 다이어그램 그리기"
image: /images/2020-04-15/cover.svg
description: >
  파이썬(python)에서 matplotlib-venn 패키지를 활용하여 벤 다이어그램을 그려보고
  사용하려는 목적에 맞게 다양하게 커스터마이징 하는 방법을 알아봅니다.
tags: [python, venndiagram, matplotlib_venn]
share: true
comments: true
---

### matplotlib-venn 패키지 소개 및 설치

벤 다이어그램을 그려주는 파이썬 패키지인 'matplotlib-venn'[^1] 를 소개하려고 합니다.
연구를 하다 보면 집합들간의 관계를 표시해주는 벤 다이어그램을 그려야 하는 경우가 종종 생깁니다.
그럴 때마다 웹에서 손쉽게 사용할 수 있는 툴들을 사용하곤 했었는데,
몇 가지 아쉬운 점들이 있어서 필요한 경우에는 직접 그려야 했던 적도 있었습니다.
하지만 이 패키지는 다른 패키지들과는 다르게 사용하기 쉽고,
유연한 커스터마이징이 가능하도록 만들어져서 앞으로 많은 부분에 적용하여 사용하게 될 것 같습니다.
특히 기존의 도구들이나 패키지들은 벤 다이어그램을 그릴 때 집합들의 크기(집합을 구성하는 원소들의 갯수)를 면적으로
반영하여 그려주는 기능[^2]이 없는 경우가 많은데, 이 패키지는 그것을 가능하게 해 주는 점이 큰 특징입니다.

이 패키지는 2개 또는 3개의 집합들에 대해 벤 다이어그램을 그리는 것이 가능합니다.
그리고자 하는 집합의 수에 따라 사용해야 하는 함수의 이름이 다릅니다.
집합이 2개인 경우에는 `venn2` 함수를, 3개인 경우에는 `venn3` 함수를 사용하면 됩니다.
이 기본 함수 외에도 각 집합을 윤곽선만 있는 원으로 표시하는 함수인 `venn2_circles` 및 `venn3_circles` 와
집합의 크기를 원의 크기에 반영하지 않는 함수인 `venn2_unweighted` 및 `venn3_unweighted` 가 있습니다.
이렇게 말씀드린 6개의 함수가 이 패키지에서 제공하는 전부입니다.

![image](/images/2020-04-15/funcs.png "Functions in matplotlib-venn package"){: .center-image}

여러분이 하고자 하는 기능이 잘 담겨있다고 생각되시나요? 자, 그럼 설치를 한번 해 봅시다.
이 패키지는 matplotlib 이라는 시각화 패키지 위에서 동작하므로 matplotlib 패키지가 먼저 설치되어 있어야 합니다.
하지만 여러분이 패키지를 하나씩 직접 설치하는 경우가 아니라면 이러한 의존성들에 대해서는 패키지 설치 관리자들이 알아서
설치를 해 줄 것이므로 크게 신경 쓸 필요가 없습니다. 파이썬을 사용하는 환경마다 설치 방법이 조금씩 다를 텐데요.
간략히 easy_install 또는 conda 를 이용한 설치 방법을 소개해 보겠습니다.
먼저 파이썬만을 단독으로 설치해서 사용하는 환경의 경우에는 easy_install 을 사용하여 아래와 같이 설치해주면 됩니다.

```
easy_install matplotlib-venn
```

그리고 아나콘다 환경에서는 conda install 명령어를 이용하여 설치해주시면 됩니다.
설치 시에 채널을 지정하지 않으면 패키지를 못 찾을 수 있으니
채널을 지정하는 옵션인 `-c conda-forge` 를 넣어 설치하는 것을 권장합니다.

```
conda install -c conda-forge matplotlib-venn
```

설치가 성공적으로 되었다면 아래와 같이 패키지를 불러오는 데 문제가 없어야 합니다.
앞에서 설치하기 위해 패키지 이름을 적어줄 때에는 하이픈(matplotlib-venn)이 쓰였지만,
패키지를 사용하기 위해 파이썬에서 import 할 때에는 언더스코어(matplotlib_venn)를 사용하는 점에 주의합니다.

```python
from matplotlib_venn import venn2
```


### matplotlib-venn 의 기본적인 사용법

가장 기본적인 예제를 통해 사용법을 익혀보도록 하겠습니다.
집합이 2개인 경우에는 `venn2` 함수를 이용합니다. 이 함수의 첫 인자는 `subsets`[^3] 인데요.
여기에 각 부분집합의 크기가 들어있는 튜플을 넘겨주면 됩니다.
아래의 코드에서는 `(1, 2, 3)` 이라는 튜플을 넘겨주어 보았습니다.
집합은 2개인데, 왜 3개의 값을 넘겨주냐고요? 집합의 2개인 경우에 생길 수 있는 부분집합의 수가 3개여서 그렇습니다.
집합 A와 B가 있다고 가정해보면, 집합 A 에만 속하는 집합(A-B), 집합 B 에만 속하는 집합(B-A),
그리고 집합 A 와 B 의 교집합(A∩B)으로 총 3개의 부분집합이 생기게 됩니다.
이 순서대로 부분집합의 크기를 넣어주면 됩니다.

```python
import matplotlib.pyplot as plt
from matplotlib_venn import venn2

venn2(subsets=(1, 2, 3))
plt.show()
```

![image](/images/2020-04-15/example_venn2.png "Basic example, venn2"){: .center-image}


[^1]: 기존에 매우 다양한 벤 다이어그램을 도구들이 존재했지만 제목이나 강조 표시 하나 손 쉽게 넣을 수 있는 도구는 잘 없는
점에 착안하여 에스토니아 출신 연구자인 [Konstantin Tretyakov](http://kt.era.ee/)가 2012년에 만든 파이썬 패키지입니다.
(참고: [Konstantin 의 블로그: Venn Diagrams in Python](http://fouryears.eu/2012/10/13/venn-diagrams-in-python/))

[^2]: 영어로는 이를 area-weighted 라고 표현합니다.

[^3]: 반드시 꼭 `venn2(subsets=(1, 2, 3))` 처럼 keyword argument 로 넘겨줄 필요는 없습니다.
간단히 `venn2((1, 2, 3))` 처럼 positional arguments 로 넘겨주어도 괜찮습니다.