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

위와 같은 구조의 코드에서는 전체 파이프라인을 수행하기 위해서는 `step3` 함수만 실행시켜 주면 된다. `step3` 함수는 `step2` 함수를 호출하고, `step2` 함수는 `step1` 함수를 호출하여 결과적으로는 `step1`, `step2`, `step3`의 순서대로 파이프라인이 진행되는 것이다.

연구를 위한 분석을 진행하다 보면 다양한 데이터들 또는 파라미터 값, 그리고 다양한 통계적 방법을 적용해 다양한 조합의 결과들을 시도해야 할 일이 많다. 그래서 보통 다음과 같이 `step3` 함수를 다양한 인자 값으로 돌려보게 된다.

```python
step3('hg19', 'ACC001', 'rs')  # (3-1) default
step3('hg19', 'ACC001', 'ks')  # (3-2) other statistical test
step3('hg19', 'ACC002', 'rs')  # (3-3) other NGS data    
step3('hg38', 'ACC001', 'rs')  # (3-4) other reference genome
```

그러나 자세히 살펴보면 똑같은 계산을 너무 많이 반복하고 있다는 사실을 찾을 수 있다. 예를 들면 통계적 방법을 바꿔서 진행하려고 한 경우(3-2)에는 `hg19`에 해당하는 유전자들을 불러오고, `ACC001`에 해당하는 발현량 값들을 계산하는 일이 동일하게 첫 번째 경우(3-1)에서 했던 일이다. 첫 번째 경우에서 `step1`이나 `step2`에서 리턴한 값들을 미리 어딘가에 저장해 두었다면 두번째 경우(3-2)에서 불러와서 빠르게 테스트 방법만 바꿔 결과를 확인할 수 있을 것이다.

이렇게 분석을 하다 보면 중간에 생산된 데이터들을 잠시 저장해두면 좋은 경우가 있다. 중간에 생산된 데이터들을 불러와서 다양한 방법을 적용한 최종 데이터들을 많이 만들 경우이다. 이 때에 중간에 생산된 데이터들을 다시 계산할 필요가 없어 계산에 대한 오버헤드가 줄고 이로 인해 분석 시간이 많이 줄어들게 된다. 그 해결방법으로 파이썬의 다음과 같은 `cached`라는 이름의 데코레이터를 만들었다.

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
```

사용할 때에는 자신이 만든 함수 위에다가 `@cached`라고만 적어두면 된다. 이는 함수가 반환하는 리턴값 자체를 pickle로 dump시켜 `cached`라는 폴더 안에다가 함수 이름과 각종 arguments들을 파일 이름으로하여 저장해 둔다. 다음에 불러올 때에는 파일이 있는지를 체크하여 다시 계산하지 않고 빠르게 불러올 수 있다. 위의 예제를 다시 데코레이터를 이용하여 적어본다면 아래와 같다.

```python
@cached
def step1(genome):
    ...
    return genes

@cached
def step2(genome, accession):
    ...
    return genes

def step3(genome, accession, statname):
    ...
    print(pval)
```

이렇게 하면 `step1`과 `step2` 함수들은 호출되기 전에 미리 계산한 값이 저장된 파일이 있나 살펴보는 일을 먼저 할 것이다. 이전에 계산해 둔 파일이 있으면 그 파일을 바로 불러오고, 그 파일이 없다면 새로 계산하여 `cached` 폴더에 저장해둘 것이다. 위의 여러가지 경우의 `step3` 함수를 수행시키고 난 후의 `cached` 폴더 내부에 쌓이는 중간 데이터 결과물 파일들을 살펴보면 다음과 같을 것이다.

```bash
$ ls ./cached
step1.hg19.dat
step1.hg38.dat
step2.hg19.ACC001.dat
step2.hg19.ACC002.dat
step2.hg38.ACC001.dat
```

만약 다섯 번째 경우(3-5)가 다음과 같이 존재한다면, `step3` 함수가 `step2` 함수를 호출하는 것이 아니라 이미 계산된 `step2.hg38.AC0001.dat` 파일을 읽어들여 통계적 테스트 방식만 KS test로 바꾸어 빠르게 진행할 수 있다.

```python
step3('hg38', 'ACC001', 'ks')  # (3-5) changed statistical test from the case 3-4
```