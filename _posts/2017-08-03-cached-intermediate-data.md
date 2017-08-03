---
layout: post
title: "Python decorator for saving intermediate files during pipeline"
description: "파이썬 데코레이터를 이용하여 긴 파이프라인 중간에 생산된 데이터들을 저장해두는 기능을 구현해보았습니다."
tags: [python tips, decorator]
share: true
comments: true
---

분석을 하다 보면 중간에 생산된 데이터들을 잠시 저장해두면 좋은 경우가 있다. 중간에 생산된 데이터들을 불러와서 여러가지 최종 계산 방법을 적용하여 최종 데이터들을 만들 경우이다. 이 때에 중간에 생산된 데이터들을 다시 계산할 필요가 없어 오버헤드와 계산시간들을 많이 줄여 성능 향상을 꾀할 수 있다.

```python
def cached(func):
    def wrapper(*args, **kwargs):
        name = '.'.join((func.__name__, *args))
        cached_file = 'cached/%s.dat'%(name)
        if os.path.isfile(cached_file):
            data = pickle.load(open(cached_file, 'rb'))
        else:
            data = func(*args)
            pickle.dump(data, open(cached_file, 'wb'))
        return data
    return wrapper

@cached
def calculate_intermediated_data(arg1, arg2, arg3):
    ## calculate someting
    return data
```

위와 같이 cached라는 데코레이터를 만들어 보았다. 이는 리턴값 자체를 pickle로 dump시켜 cached라는 폴더 안에다가 함수 이름과 각종 arguments들을 파일 이름으로하여 저장해 둔다. 다음에 불러올 때에는 파일이 있는지를 체크하여 다시 계산하지 않고 빠르게 불러올 수 있다.