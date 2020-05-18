---
layout: post
title: "아파치 서버 기본 사용법"
image: /images/2017-05-07/cover.svg
description: "아파치 웹 서버 (Apache HTTP server) 기본 사용 및 설정 방법을 알아봅니다."
tags: [apache]
comments: true
share: true
---

### httpd 데몬 시작 (CentOS 6)

아파치 HTTP 서버는 웹 서비스를 제공해주는 데몬 프로그램이다.
대부분의 리눅스 서버에는 아파치가 기본적으로 설치되어 있다.
아차피를 이용하여 웹 서비스를 한번 구동시켜 보자.
일단, 현재 사용하고 있는 서버에서 서비스가 구동되고 있는지를 확인해봐야 한다.
service 명령어를 이용하므로 root 계정으로 들어가서 아래와 같은 명령어로 확인해볼 수 있다.

```
[root@sirna1 ~]# service httpd status
httpd is stopped
```

현재 아파치 데몬은 실행되고 있지 않은 상태이다.
외부에서 서버로 들어온 웹 요청을 처리할 수 있는 상태가 아니라는 뜻이다.
그러면 다음과 같이 아파치 데몬을 실행시켜 보자.

```
[root@sirna1 ~]# service httpd start
Starting httpd:          [  OK  ]
```

다시 한번 아파치 데몬의 상태를 확인해 보자.
제대로 아파치 서버가 작동되는 것을 확인할 수 있다.

```
[root@sirna1 ~]# service httpd status
httpd (pid  18217) is running...
```

이제, 웹 브라우저로 서버의 IP 주소를 입력하면 다음과 같이 아파치 테스트 페이지가 보일 것이다.

![Image](/images/apache_testpage.png?v1 "apache test page"){: .center-image}

설정 파일 변경 등으로 아파치 서버의 작동을 중단시키거나 재시작할 경우에는 다음과 같이 하면 된다.

```
[root@sirna1 ~]# service httpd stop
Stopping httpd:          [  OK  ]
```

```
[root@sirna1 ~]# service httpd restart
Stopping httpd:          [  OK  ]
Starting httpd:          [  OK  ]
```


### httpd 데몬 시작 (CentOS 7)

현재 상태 확인

```
[sonic@rna2 ~]$ systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2019-10-10 14:37:16 KST; 2 weeks 0 days ago
     Docs: man:httpd(8)
           man:apachectl(8)
  Process: 11873 ExecStop=/bin/kill -WINCH ${MAINPID} (code=exited, status=0/SUCCESS)
  Process: 12024 ExecReload=/usr/sbin/httpd $OPTIONS -k graceful (code=exited, status=0/SUCCESS)
 Main PID: 11907 (/usr/sbin/httpd)
   Status: "Total requests: 0; Current requests/sec: 0; Current traffic:   0 B/sec"
    Tasks: 11
   CGroup: /system.slice/httpd.service
           ├─11907 /usr/sbin/httpd -DFOREGROUND
           ├─12256 /usr/sbin/httpd -DFOREGROUND
           ...
           └─30728 /usr/sbin/httpd -DFOREGROUND
```

아파치 데몬 시작

```
# systemctl start httpd
```

아파치 데몬 재시작.
설정 파일의 변경된 내용을 적용하기 위해서는 아파치 서비스 데몬을 항상 재시작해주어야 하기 때문에
이는 아마 빈번히 사용될 명령어일 것이다. 

```
[sonic@rna2 ~]# systemctl restart httpd
```

아파치 데몬 중지

```
[sonic@rna2 ~]# systemctl stop httpd
```


### 설정파일 다루기: httpd.conf

#### 서비스 포트 추가

웹 서비스의 기본 포트인 80 번이 차단되었을 경우에 포트를 변경하거나 추가할 수 있다.
다음과 같이 관리자 권한으로 설정 파일을 연다.

```
# vi /etc/httpd/conf/httpd.conf
```

설정 파일의 내용 중 'Listen' 으로 시작되는 부분이 바로 서비스 포트 번호를 지정할 수 있는 부분이다.
이를 다른 번호로 바꾸거나 한 줄을 더 추가해 서비스 포트를 추가할 수 있다.
관례적으로 8080 번 혹은 8888 번을 추가적인 포트 번호로 사용한다.

```
# Listen: Allows you to bind Apache to specific IP addresses and/or
# ports, in addition to the default. See also the <VirtualHost>
# directive.
#
# Change this to Listen on specific IP addresses as shown below to
# prevent Apache from glomming onto all bound IP addresses (0.0.0.0)
#
#Listen 12.34.56.78:80
Listen 80
Listen 8888
```

#### 데몬 사용자 변경

아차피 서비스 데몬을 실행시키는 사용자를 변경할 수 있다.
설정 파일에서 다음과 같이 수정하면 apache 사용자가 아니라 원하는 사용자로 변경하여 실행시킬 수 있다.
기존의 설정은 맨 앞에 `#` 로 주석처리를 함으로써 무시되도록 할 수 있다.

```text
# User apache
User lab
```

#### 디렉토리별 사용자 권한 부여

`.htaccess` 파일을 사용하도록 설정하는 부분이다.
설정파일에 들어가서 디렉토리 설정 아래에 AuthConfig 옵션을 추가한다.

```
<Directory "/var/www/html">
    AllowOverride AuthConfig
</Dicrectory>
```

---

### 특정 디렉토리를 허가된 사용자에게만 공개 (htpasswd)

특정 디렉토리를 허가된 사용자에게만 공개하고 싶을 경우가 있습니다.
이럴 때에는 특정 디렉토리에 접근을 시도했을 때 계정 정보를 물어보게 하고,
허가된 사용자가 맞다면 접근을 허용하는 방식을 사용합니다.
이런 기능을 해주는 것이 바로 htpasswd 입니다.

먼저 htpasswd 를 사용하기에 앞서 접근을 제한하고 싶은 디렉토리에 만들어야 하는 파일이 하나 있는데요.
바로 `.htaccess` 라는 분산 설정파일입니다.
아파치는 디렉토리로 접근을 할 때 해당 디렉토리와 그 상위 디렉토리에 `.htaccess`파일이 있는지를 확인하고,
존재한다면 그에 따라 계정을 물어보게 됩니다.
다음과 같은 내용으로 작성해봅니다.

```
AuthName  'myauth'
AuthType  Basic
AuthUserFile  /home/Sukjun/auth/.htapasswd
AuthGroupFile /dev/null
```

그리고 디렉토리마다 .htaccess 파일을 읽고 적용할 수 있게 아파치 환경설정 파일(`/etc/httpd/conf/httpd.conf`)을 바꿔
주어야 합니다. 해당하는 디렉토리 부분의 AllowOverride 지시어의 값을 None에서 All로 변환해줍니다. (이 값이 None 인
상태에서는 아파치가 .htaccess 파일을 검색하지 않아서 만들어 놓아도 적용이 안 됩니다.) 변경하고 난 뒤에는 적용을 위해
아파치 서버 데몬을 다시 시작 해주어야겠죠?

```
<Directory "/var/www/html">
   AllowOverride All
</Directory>
```

마지막으로 위에 명시한 위치에 `.htpasswd`파일을 만들어주어야 하는데요, 일단 `/home/Sukjun/auth` 폴더로 이동합니다.
그리고 `htpasswd` 명령어를 이용하여 다음과 같이 관리자 계정과 실제 사용할 계정을 만들어보겠습니다. 처음 만들 때에는
`-c` 옵션을 주어 `.htpasswd` 파일을 새롭게 만들겠다(create)는 명령을 주는 것이고요, 두번째는 만든 파일에 'sukjun'이라는
계정을 하나 더 추가하겠다는 명령입니다.

```
$ htpasswd -c .htpasswd admin
New password:
Re-type new password:
Adding password for user admin

$ htpasswd .htpasswd sukjun
New password:
Re-type new password:
Adding password for user sukjun
```

그러면 다음과 같이 설정이 되어 있는 디렉토리에 접근을 시도했을 때 계정을 물어보게 됩니다.

![Image](/images/2017-05-07/htpasswd.png "htpasswd"){: .center-image}
접근 권한을 설정(htpasswd)한 후 접근을 시도했을 때의 모습
{: .center}

---

### 디렉토리 리스트(Index of ...) 숨기기

출처: http://www.adminschool.net/wiki/doku.php?id=application:apache:noindexes

index 파일이 없을 경우에는 그 폴더의 파일 목록이 보이게 되는데요. 개발서버나 개발을 막 시작하려고 할 때에는 유용하게
사용되지만 운영시에는 누구에게나 파일의 목록이 보여질 수 있어 보안상 매우 위험합니다. 따라서 아파치에서 디렉토리
리스트를 숨겨줄 필요가 있습니다. 다음과 같은 방법에 따라서 설정을 하시면 됩니다.

* 방법 1. 각 디렉토리마다 index 파일을 넣기
* 방법 2. Apache <Directory> 설정을 바꾸기
    * Global 설정
    * Local(Virtual) 설정

수정 전 (디렉토리 리스트가 보이는 상태)
```
<Directory /> 
  Options Indexes FollowSymLinks 
  AllowOverride All 
</Directory>
```

수정 후 (디렉토리 리스트가 보이지 않는 상태)
```
<Directory /> 
  Options FollowSymLinks 
  AllowOverride All 
</Directory>
```

혹은

```
<Directory /> 
  Options -Indexes FollowSymLinks 
  AllowOverride All 
</Directory>
```


---


### 파이썬을 CGI 스크립트로 사용하도록 설정하기

DirectoryIndex 지시어에 index.py 를 추가합니다.

```
#
# DirectoryIndex: sets the file that Apache will serve if a directory
# is requested.
#
<IfModule dir_module>
    DirectoryIndex index.html index.py
</IfModule>
```

```
<IfModule mime_module>
    ...

    #
    # AddHandler allows you to map certain file extensions to "handlers":
    # actions unrelated to filetype. These can be either built into the server
    # or added with the Action directive (see below)
    #
    # To use CGI scripts outside of ScriptAliased directories:
    # (You will also need to add "ExecCGI" to the "Options" directive.)
    #
    AddHandler cgi-script .cgi .py

</IfModule>
```


---


### Internal Server Error (500)

여러가지 원인이 있을 수 있다.

1. 제대로 된 Header 가 전달되지 않은 경우
2. CGI script 에 버그가 있는 경우
3. CGI script 에 버그는 없지만 환경에서의 문자셋이 제대로 설정되지 않은 경우

파이썬 CGI script에 한글이 포함되었을 경우에 파이썬의 os 모듈을 이용하여 현재 설정된 환경변수들을 한번 체크해 보자.

```python
print(os.environ['LANG'])
```

아차피 환경설정 파일에 다음과 같이 환경변수를 넘겨준다.
파이썬 스크립트에서 `os.environ['LANG']`을 했을 때 제대로 utf-8 이 되어야 한글이 포함된 스크립트를 읽을 수 있다.

```
SetEnv LANG en_US.UTF-8
```


---


### 파일/폴더 이름이 잘려 보여지는 경우

위와 같이 파일이나 폴더의 이름이 긴 경우에는 잘려 보이는 경우가 있다.
이 때에 환경설정 파일에 다음과 같이 IndexOptions 지시어에 NameWidth 옵션을 설정하면 된다.
NameWidth 옵션의 값은 숫자로 지정할 수 있지만 별표(`*`)로 지정하는 경우에는
파일이나 폴더 이름이 다 표시될 수 있도록 충분한 가로 길이를 제공하라는 의미로 쓰인다.
여기에서는 이름이 모두 다 나오길 원하므로 별표(`*`)를 입력해 주었다.

```
<Directory "/var/www/html">
    ...
    IndexOptions NameWidth=*
    ...
</Directory>
```
