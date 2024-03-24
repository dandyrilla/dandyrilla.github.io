---
layout: post
title: "PyCharm settings"
description: >
  Pycharm settings
tags: [pycharm, settings]
comments: true
share: true
---

## PyCharm 의 메모리 사용량이 10G 가 넘을 정도로 너무 많습니다. 이를 어떻게 해결할 수 있을까요?

아마도 이는 너무 많은 플러그인들이 백그라운드에서 수행되고 있기 때문일 가능성이 높습니다. 다음과 같은 단계를 이용하여 사용하지 않는 플러그인을 사용
해제합니다.

1. PyCharm 메뉴 바에서 'Settings...' 를 클릭하거나 'Command + ,' 키를 이용하여 'Preference' 창을 엽니다.
2. 왼쪽 메뉴에서 'Plugins' 을 선택하고 사용하지 않는 플러그인들의 체크박스를 해제하여 사용 해제합니다.
3. PyCharm 을 재시작하여 해당 사항을 반영합니다. 이를 반영한 후 메모리 사용량이 줄었는지 확인합니다.
