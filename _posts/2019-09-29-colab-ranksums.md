---
layout: post
title: "파이썬도 모르고 코딩도 모르지만 통계적 검증은 해야될 때"
description: >
  설치가 따로 필요 없으며 클라우드에서 실행되는 무료 Jupyter 노트 환경을 가진 Google Colaboratory 를 이용하여 단 몇 줄
  만으로 여러 통계 테스트를 진행해볼 수 있습니다. Python 을 모르시더라도, 심지어 코딩을 모르시더라도 간편하고 빠르게
  통계적 검증을 수행해볼 수 있습니다.
tags: [Google colab, python, jupyter notebook, rank-sum test]
share: true
comments: true
---

대조군과 실험군의 차이를 알아보기 위해 우리가 수행하는 통계적 검증은 여러 가지가 있는데요. 그 중 가장 손 쉽게 사용할 수
있는 것이 바로 Student's t-test 일겁니다. 이는 마이크로소프트 엑셀에서 손 쉽게 수행할 수 있습니다. 하지만 t-test 는
모수적 검정 방법이라 우리가 테스트 하는 변수의 분포가 정규분포를 따른다는 가정 하에 진행할 수 있는데, 그렇지 않을
경우에는 비 모수적 방법을 써서 진행하여야 합니다. 따라서 t-test 에 대응되는 비 모수적 검정 방법인 Wilcoxon's rank-sum
test 를 사용하면 됩니다. 마이크로소프트 엑셀에서도 이를 진행하지 못하는 건 아니지만 데이터를 이리저리 좀 바꾸어 주어야
해서 귀찮게 되죠. 따라서 코딩을 모르는 사람도 손 쉽게 이를 진행할 수 있도록 방법 하나를 소개하려 합니다.

자, [Google Colab](https://colab.research.google.com/) 으로 들어가 봅시다. 또는 구글에 'colab' 이라고만 쳐도 손 쉽게
들어갈 수 있습니다. 들어가면 아래와 같은 첫 화면이 나오는데요. 여기서 아래의 '새 PYTHON 3 노트' 를 클릭하여 새로운 노트
하나를 만들어 봅시다.

![그림](/images/2019-09-29/fig1.png "startup page"){: .center-image}

노트를 만들고 나면 아래와 같이 몇 줄만 적어주면 되는데요. 나머지는 다 모르셔도 되고, 여러분이 신경써야 할 부분은
여러분이 가지고 있는 데이터를 3번째와 4번째 줄에 콤마(,)로 구분된 형식으로 올바르게 넣어주면 됩니다.

![그림](/images/2019-09-29/fig2.png "rank-sum test on colab"){: .center-image}

자, 간단하죠? 줄 단위로 설명을 더 필요로 하시는 분들을 위해 더 적어볼께요. 1번째 줄은 우리가 사용할 통계적 검증에 쓰일
패키지를 불러 오는 과정입니다. [scipy](https://scipy.org/) 라는 패키지에 있는 stats 모듈에 있는
[ranksums](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ranksums.html) 라는 함수를 이용하겠다고
선언을 해 주었습니다. 3, 4번째 줄은 앞서 얘기한 것처럼 여러분이 가지고 있는 측정치 데이터를 넣는 부분이구요.
5번째 줄이 바로 아까 사용하겠다고 선언해 놓은 ranksums 함수를 호출하는 부분입니다. values1, values2 라는 데이터를
입력으로 집어넣어 주었더니 p value 를 계산해 줍니다.
