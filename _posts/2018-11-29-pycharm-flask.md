---
layout: post
title: "PyCharm 설정: 템플릿 폴더 적용하기"
image: /images/2018-11-29/cover.svg
description: >
  Flask를 이용한 개발 진행에서 HTML template 파일들을 담고 있는 폴더를 PyCharm에게 알려주어 더 편리한 개발 환경을
  제공하도록 설정해 줍니다.
tags: [pycharm, settings, flask, template folder]
comments: true
share: true
---

## 자꾸만 눈에 거슬리는 알림

PyCharm에서 Flask를 이용하여 개발을 진행할 때, 추가적인 설정을 해주지 않으면 나타나는 inspection 단계에서의 경고가 있다.
Flask에서 사용하는 HTML 템플릿 파일 이름을 적어놓은 부분에서 실제로 파일을 찾지 못한다는 메시지이다. 고쳐놓지 않더라도
Flask 앱을 구동하는 데에는 딱히 큰 문제가 없지만, 왠지 개발을 할 때에 계속 신경이 쓰이는 부분이었다.

![image](/images/2018-11-29/fig1.png "Inspection error on template path"){: .center-image}

분명히 Flask 앱도 잘 돌아가고, 템플릿 파일들도 제대로 된 위치에 있는데도 PyCharm은 그 파일들을 찾지를 못했다. 그래서
구글링 끝에 찾아낸 것이 바로 템플릿 폴더 지정이었다. Python 언어에 특화된 설정이 있었다.


## 사용하고 있는 템플릿 엔진 설정하기

템플릿 폴더를 지정하기에 앞서 템플릿 종류가 무엇인지를 설정해 줘야 한다. Settings 로 들어가 'Language & Frameworks'
섹션에서 'Python Template Languages' 를 클릭한다.

![image](/images/2018-11-29/fig2.png "Python Template Languages"){: .center-image}

이 설정을 적용하려는 프로젝트를 선택하고, 템플릿 언어를 선택한 다음에 템플릿 파일 형식을 선택해 준다. Flask는 Jinja2라는
템플릿 엔진을 사용하고 있으므로 'Jinja2'를 선택하면 된다. 설정이 끝났으면 OK를 눌러 창을 닫는다.

![image](/images/2018-11-29/fig3.png "Python Template Languages"){: .center-image}


## 템플릿 디렉토리 지정하기

템플릿 종류를 설정했으니 이제 템플릿 파일들이 들어있는 폴더 위치를 PyCharm 에게 알려주어야 한다. 다시 Settings 로 들어가
현재 프로젝트의 'Project Structure'로 들어간다. 그러면 현재 프로젝트의 폴더 구조들을 볼 수 있는데, 여기서 템플릿
파일들이 들어있는 폴더를 클릭하고 위에 보이는 보라색 폴더 아이콘으로 되어있는 'Templates' 버튼을 클릭한다. 그리고 OK 를
눌러 창을 닫는다.

![image](/images/2018-11-29/fig4.png "Mark as template directory"){: .center-image}

템플릿 디렉토리를 지정하고 난 뒤에는 다음과 같이 템플릿 파일을 적어준 위치의 gutter 부분에 템플릿 파일 아이콘이 나타나게
된다. 심지어 누르면 해당 템플릿의 HTML 파일로 편집할 수 있도록 연결되기까지 한다.

![image](/images/2018-11-29/fig5.png "Icons directing to template files"){: .center-image}
