---
layout: post
title: "리눅스 공유 라이브러리"
description: "공유 라이브러리와 연관되어 자주 접하는 에러들을 기록합니다."
tags: [shared library, so, linux, compile error]
comments: true
share: true
---


`ldd (executable file)`: 현재 실행 파일이 사용하고 있는 공유 라이브러리들의 목록을 확인하는 명령어.
`ldconfig -v`: 현재 불러오고 있는 공유 라이브러리의 목록들을 확인하는 명령어.