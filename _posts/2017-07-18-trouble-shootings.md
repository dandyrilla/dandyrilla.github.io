---
layout: post
title: "오늘의 삽질 일기: perl 모듈 설치 에러"
description: "perl 버전에 따라 모듈을 설치하려고 할 때 예상치 못한 에러가 날 수 있다. 원하는 버전의 perl을 사용자 디렉토리에 설치해 사용함으로써 이를 해결할 수 있다."
tags: [삽질, 삽질 일기, perl, 모듈 설치]
comments: true
share: true
---

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

모듈의 소스코드를 다운로드 받고 압축을 푼 후 압축을 푼 디렉토리에 들어가 위의 안내대로 따라해 보았다. 하지만 역시나 한번에 되는 건 없다.

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

make 단계에서 ExtUtils/xsubpp 라는 모듈이 존재하지 않아 설치가 중단되었다. perl에 기본적으로 같이 제공되는 모듈인 것 같은데, 현재 시스템인 CentOS에 기본적으로 설치되어 있는 perl의 버전이 낮아 모듈이 제대로 설치되지 않는 것 같았다. 현재 perl의 버전을 확인해 보았다.

```
$ perl --version
This is perl, v5.10.1 (*) built for x86_64-linux-thread-multi
Copyright 1987-2009, Larry Wall
```

시스템에 설치된 버전은 5.10.1이고, 사용하고 있는 perl 프로그램의 권장 버전은 5.14.3 이었다. 따라서 CentOS의 perl 버전을 업그레이드 하기 위해서 yum update를 시도해 보려다가 CentOS는 python이나 perl을 이용하여 시스템을 관리하는 부분이 많기 때문에 시스템에서 사용하고 있는 perl의 버전 업그레이드는 예기치 않은 시스템 에러들이 생겨날 수 있다는 생각이 떠올랐다.

따라서 사용자 디렉토리에 perl을 따로 설치하기로 하였다. 해당 버전의 perl을 다운로드 받고, configure를 할 때에 prefix를 주어서 원하는 디렉토리에 설치되도록 하였다.

```
./configure --prefix=/home/user/opt/perl-5.14.3
make
make install
```

사용자 디렉토리에 perl이 문제없이 설치 되었고, 다시 Math-CDF 모듈을 설치하니 ExtUtils/xsubpp 문제 때문에 모듈이 설치되지 않는 문제는 없었다.

리눅스 시스템에서 원하는 버전의 python이나 perl을 사용하기 위해서는 시스템이 사용하고 있는 python이나 perl을 업그레이드 하려고 하지 말고 사용자 디렉토리에 따로 설치하여 사용하는 것이 제일 깔끔하고 시스템에 영향을 주지 않는 방법이라는 것을 다시 한번 깨달았다.