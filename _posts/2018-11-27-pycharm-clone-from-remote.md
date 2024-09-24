---
layout: post
title: "PyCharm: 원격 저장소를 로컬 컴퓨터로 복제하기" 
description: >
  원격 저장소의 파일들을 로컬 컴퓨터로 복제하여 PyCharm 에서 작업하는 방법을 알아봅니다.
tags: [pycharm]
share: true
comments: true
---

원격 저장소의 파일들을 로컬 컴퓨터로 복제하여 PyCharm 에서 작업하고 싶을 때 이를 수행하는 방법입니다.

1. 메인 메뉴에서 **VCS > Checkout from Version Control > Git** 을 선택하거나, 아무런 프로젝트가 열려있지 않은 상태라면
   **Welcome** 대화상자에서 **Checkout from Version Control > Git** 을 선택합니다.

2. **Clone Repository** 대화상자에서 복제할 원격 저장소의 URL 을 입력합니다.
   (옆에 있는 **Test** 버튼을 눌러 원격 저장소와의 연결이 제대로 이루어지는지를 확인할 수 있습니다.)

3. **Directory** 항목에서 원격 저장소가 복제될 경로를 지정합니다.
   (만약 원격 저장소 이름이 'myrepo' 라면, `C:\github\myrpo` 처럼 원격 저장소 이름이 포함된 경로로 지정하면 됩니다.)

4. **Clone** 버튼을 클릭합니다. 복제가 시작됩니다.

참고: https://www.jetbrains.com/help/pycharm/set-up-a-git-repository.html#clone-repo
