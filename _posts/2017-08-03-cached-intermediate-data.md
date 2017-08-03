---
layout: post
title: "Python decorator for saving intermediate files during pipeline"
description: "파이썬 데코레이터를 이용하여 긴 파이프라인 중간에 생산된 데이터들을 저장해두는 기능을 구현해보았습니다."
tags: [python tips, decorator]
share: true
comments: true
---

본 포스팅은 중간 생산 데이터들을 저장해 두는 기능을 하는 파이썬 데코레이터를 이용하여 분석의 시간을 단축시키는 방법에 대한 내용을 담고 있습니다.

다음과 같은 하나의 분석 파이프라인을 예제로 설명해 보려고 한다. 파이프라인을 구성하는 각 단계의 함수들을 설명하면 다음과 같다.

* 첫 번째 단계의 `step1` 함수는 reference genome 버전에 맞게 인간 유전자들을 갖고 오는 역할을 하는 함수이다. `step1` 함수의 첫 번째 인자는 `genome`인데, 이는 `'hg19'` 혹은 `'hg38'`과 같이 reference genome을 일컫는 문자열 값을 넣어줄 수 있다. 이 함수가 리턴하는 값은 `Gene`이라는 사용자 정의 클래스로 만들어진 인스턴스들을 갖는 리스트인 `genes`이다.

* 두 번째 단계의 `step2` 함수는 NGS 데이터들로부터 발현량 값들(RPKM values)을 계산하여 `step1`으로부터 만들어진 유전자들의 속성에 업데이트를 해주는 역할을 한다. `step2` 함수의 두 번째 인자는 `accession`인데, 이는 같은 인간 유전자들에 대해 다양한 처리를 한 발현량 값들이 있을 것이므로 각 데이터를 구분해 주는 ID역할을 하는 것으로 보면 된다. 예를 들면 `ACC001`, `ACC002`와 같이 다른 데이터들을 구분해 줄 수 있다.

* 마지막 단계의 `step3` 함수는 불러온 인간 유전자들과 해당 NGS 데이터들을 가지고 다양한 통계적 테스트를 진행하는 기능을 갖고 있다. `step3` 함수의 세 번째 인자는 `statname`으로, 이는 통계적 테스트를 무엇으로 할 것인지를 결정할 수 있다. Ranksum test를 수행하고 싶으면 `rs`, KS test를 수행하고 싶으면 `ks`라 넣어주면 된다.

```python
def step1(genome):
    """load human genes"""
    ...
    return genes

def step2(genome, accession):
    """calculate RPKM values"""
    genes = step1(genome)
    ...
    return genes

def step3(genome, accession, statname):
    """statistical test"""
    genes = step2(genome, accession)
    ...
    print(pval)
```


```python
step3('hg19', 'ACC001', 'rs')  # (3-1) default
step3('hg19', 'ACC001', 'ks')  # (3-2) other statistical test
step3('hg19', 'ACC002', 'rs')  # (3-3) other NGS data    
step3('hg38', 'ACC001', 'rs')  # (3-4) other reference genome
```



분석을 하다 보면 중간에 생산된 데이터들을 잠시 저장해두면 좋은 경우가 있다. 중간에 생산된 데이터들을 불러와서 여러가지 최종 계산 방법을 적용하여 최종 데이터들을 만들 경우이다. 이 때에 중간에 생산된 데이터들을 다시 계산할 필요가 없어 오버헤드와 계산시간들을 많이 줄여 성능 향상을 꾀할 수 있다.

하나의 분석 파이프라인을 예제로 설명해 보겠다.




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
def calculate_intermediate_data(arg1, arg2, arg3):
    ## calculate someting
    return data
```

위와 같이 cached라는 데코레이터를 만들어 보았다. 사용할 때에는 자신이 만든 함수 위에다가 `@cached`라고만 적어두면 된다. 이는 함수가 반환하는 리턴값 자체를 pickle로 dump시켜 cached라는 폴더 안에다가 함수 이름과 각종 arguments들을 파일 이름으로하여 저장해 둔다. 다음에 불러올 때에는 파일이 있는지를 체크하여 다시 계산하지 않고 빠르게 불러올 수 있다.