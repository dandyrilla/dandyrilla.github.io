---
layout: post
title: "Pandas 에는 없는 read_tsv() 와 to_tsv() 함수 만들어 사용하기"
description: >
  판다스는 기본적으로 CSV 파일을 읽고 쓸 수 있습니다. 하지만 탭으로 구분된 형식인 TSV (혹은 TXT) 파일의 사용 빈도도 꽤 높습니다. 이를 조금 더 간편하게
  이용할 수 있는 방법은 없을까요? 본 포스팅에서는 TSV 파일을 간편하게 열고 저장할 수 있도록 하는 함수를 만들어 보겠습니다.
tags: [pandas]
share: true
comments: true
---

다음과 같이 `read_tsv()` 또는 `to_tsv()` 함수를 따로 정의해 두고 사용할 수 있습니다. 이를 하나의 사용자 정의 모듈로 만들면 편하게 꺼내쓸 수 있습니다.

```python
import pandas as pd


def read_tsv(filename, **kw):
    _kw = dict(sep='\t')
    _kw.update(kw)
    df = pd.read_csv(filename, **_kw)
    return df


def to_tsv(df, filename, **kw):
    _kw = dict(sep='\t', index=False)
    _kw.update(kw)
    df.to_csv(filename, **_kw)
```

또는 functools 모듈을 이용하면 다음과 같이 단 2줄로 해결할 수도 있습니다. 그리고 해당 함수를 정의하는 위치를 pandas 라이브러리 내부에 둠으로써 기존에
CSV 파일을 읽을 때 `pd.read_csv()` 형태로 사용했듯이 TSV 파일을 읽을 때 `pd.read_tsv()` 형태로 사용할 수 있습니다. 마찬가지로 데이터프레임을
TSV 파일로 저장할 때에는 `df.to_tsv()` 형태로 사용할 수 있습니다.


```python
from functools import partial, partialmethod

import pandas as pd


pd.read_tsv = partial(pd.read_csv, sep='\t')
pd.DataFrame.to_tsv = partialmethod(pd.DataFrame.to_csv, sep='\t', index=False)
```