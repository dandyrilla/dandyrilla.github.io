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

```python
import pandas as pd


def read_tsv(filename, **kw):
    _kw = dict(sep='\t', header=0)
    _kw.update(kw)
    df = pd.read_csv(filename, **_kw)
    return df


def to_tsv(df, filename, **kw):
    _kw = dict(sep='\t', index=False)
    _kw.update(kw)
    df.to_csv(filename, **_kw)
```


```python
from functools import partial, partialmethod

import pandas as pd


pd.read_tsv = partial(pd.read_csv, sep='\t')
pd.DataFrame.to_tsv = partialmethod(pd.DataFrame.to_csv, sep='\t', index=False)
```