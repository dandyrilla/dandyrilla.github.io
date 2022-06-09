---
layout: post
title: "판다스(pandas)에서 데이터프레임(DataFrame)을 생성하는 다양한 방법"
description: >
  파이썬의 빌트인 타입인 dict 및 list, NumPy 의 ndarray 객체, 그리고 Pandas 의 Series 및
  Index 등을 활용하여 데이터프레임(DataFrame)을 만드는 방법을 소개합니다.
tags: [python, pandas, dataframe]
share: true
comments: true
---

다양한 분야에서 여러 목적으로 판다스(pandas)가 사용됩니다. 그렇기 때문에 판다스는 다양한 형태의
데이터가 데이터프레임(DataFrame)으로 다루어질 수 있도록 유연하게 설계되었습니다. 기본적인 파이썬의
빌트인 타입인 딕셔너리(`dict`)와 리스트(`list`) 뿐만 아니라 넘파이(NumPy) 에서의 n-차원의 배열
객체인 `np.ndarray`, 그리고 시리즈(`Series`)와 인덱스(`Index`)와 같은 판다스의 자료형도
데이터프레임을 만드는 데에 넣어줄 수 있습니다.

하지만 이렇게 데이터를 입력하는 방법이 다양하다는 점은 판다스를 이제 막 다루기 시작한 사람들에게는
데이터프레임을 만들기 위해 어떤 방법을 택해야 할지 막막하게 다가올 수도 있을 것 같습니다. 이 글이 그런
부분들을 조금이나마 해소하고, 여러 방법들을 체계적으로 파악하는 데에 길잡이가 될 수 있으면 좋겠습니다.
