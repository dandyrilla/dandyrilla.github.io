---
layout: post
title: 삽질 일기
description: 똑같은 삽질을 반복하지 않기 위해서 쓰는 삽질 일기입니다. 같은 삽질을 하고 계신 분들께도 도움이 되기를.
tags: [삽질, 삽질 일기]
comments: true
share: true
---


## 2017. 7. 18. (월): 사용자 디렉토리에 perl 설치 권장

최근에 perl로 만들어진 프로그램을 사용하여 분석해야 할 일이 있어서 프로그램을 돌렸는데 아래와 같은 에러 메시지를 만났다.

```
Can't locate Math/CDF.pm in @INC (@INC contains ...)
```

perl이 [Math-CDF](http://search.cpan.org/~callahan/Math-CDF-0.1/CDF.pm)라는 모듈을 불러들이는 데 실패했다는 메시지였다. 그래서 이 모듈을 찾아 설치하려고 하였다. README 파일에는 다음과 같이 차례대로 실행하여 설치하라는 안내가 있었다.

```
perl Makefile.pl
make
make install
```

그대로 따라해 보았다. 하지만 역시나 한번에 되는 건 없었다.

```
$ perl Makefile.PL
Checking if your kit is complete...
Looks good
Writing Makefile for Math::CDF::cdflib
Writing Makefile for Math::CDF

$ make
cp CDF.pm blib/lib/Math/CDF.pm
AutoSplitting blib/lib/Math/CDF.pm (blib/lib/auto/Math/CDF)
(중략)
make: *** No rule to make target `ExtUtils/xsubpp', needed by `CDF.c'.  Stop.
```

make 단계에서 ExtUtils/xsubpp 라는 모듈이 존재하지 않아 설치에 어려움을 겪었다. perl에 기본적으로 같이 깔리는 모듈인 것 같은데, 현재 시스템인 CentOS에 기본적으로 깔려있는 perl의 버전이 낮아 모듈이 제대로 설치되지 않는 것 같았다. 일단 현재 perl 버전을 확인해 보았다.

```
$ perl --version
This is perl, v5.10.1 (*) built for x86_64-linux-thread-multi
Copyright 1987-2009, Larry Wall
```

시스템에 설치된 버전은 5.10.1이고, 최신 버전은 5.26.0까지 나와있었다. 따라서 CentOS의 perl 버전을 업그레이드 하기 위해서 yum update를 해볼까도 하다가 CentOS는 python이나 perl을 이용하여 시스템을 관리하는 부분이 많기 때문에 시스템에서 사용하고 있는 perl 버전 업그레이드로 인해 예기치 않은 에러들이 생겨날 수 있다는 생각이 떠올랐다.

따라서 사용자 디렉토리에 perl을 따로 설치하여 위와 같은 모듈 설치 작업을 반복하였더니 
