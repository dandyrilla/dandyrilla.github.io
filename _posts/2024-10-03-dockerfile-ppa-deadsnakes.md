---
layout: post
title: "Ubuntu 에서 Python 설치를 위해 PPA 저장소를 추가해주어야 하는 이유"
description: 
tags: [docker, ubuntu, ppa]
comments: true
share: true
---

## Dockerfile 에서 PPA 저장소 추가하기

```dockerfile
RUN add-apt-repository ppa:deadsnakes/ppa
```

위 라인은 Dockerfile 에서 Ubuntu 기반의 이미지에 Python 버전 관리를 위한 추가 소프트웨어
저장소(PPA)를 등록하는 명령어입니다. 이 deadsnakes PPA는 Ubuntu에서 기본적으로 제공되지 않는 최신
또는 특정 버전의 Python을 설치할 수 있도록 해줍니다.

## Ubuntu 18.04 에서 이 라인을 사용하는 이유

Ubuntu 18.04 는 기본적으로 Python 2.x 와 Python 3.6 을 제공합니다. 만약 Python 3.7 이상을
설치하려면 deadsnakes 같은 추가 저장소를 등록해야 합니다. 따라서 Python 3.7 이상을 설치하기 위해
이 PPA를 추가하는 것이 일반적입니다.

## Ubuntu 20.04 에서 이 라인이 필요하지 않은 이유

Ubuntu 20.04 는 기본적으로 Python 3.8 을 제공하기 때문에, 대부분의 경우 Python 3.8을
사용하려면 별도의 저장소를 추가할 필요가 없습니다. 만약 Python 3.8보다 더 최신 버전(예: 3.9, 3.10
등)이 필요하다면 이 PPA를 사용할 수 있지만, 기본적인 Python 설치에는 필요하지 않습니다.

따라서, Ubuntu 18.04에서 Python 3.7 이상을 설치하려면 `add-apt-repository ppa:deadsnakes/ppa` 를
추가해야 합니다. Ubuntu 20.04 에서는 Python 3.8을 기본적으로 제공하기 때문에 보통 이 라인을 추가할
필요가 없습니다.
