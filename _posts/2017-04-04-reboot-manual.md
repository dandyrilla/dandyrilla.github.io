---
layout: post
title: "클러스터 재시작 매뉴얼"
description: "CentOS 가 설치된 클러스터 시스템을 전체적으로 끄고 재시작 하는 절차를 안내합니다."
tags: [reboot]
comments: true
share: true
---

### 구동 순서

전원을 켜야 하는데, 장비 전원 켜는 순서는 다음과 같다.

1. 저장장치 (MD1200)
2. 관리 노드 (R210)
3. 계산 노드 (Optiplex, R815, R720)

> 관리 노드(R210)가 미리 켜져 있어야 계산 노드가 이를 보고 OS image 를 로딩해 온다.
  순서를 지키지 않으면 OS image 로딩에 실패할 수 있다.


### 종료

관리자 권한을 획득한 후 아래의 절차대로 시스템을 종료시킨다.

1. 클러스터에 존재하는 직접 연결 저장장치들의 마운트를 해제한다.

   ```
   psh node umount -l /extdata1
   psh node umount -l /extdata2
   psh node umount -l /extdata3
   ```
   
2. 클러스터에 속한 계산 노드들(compute nodes)을 먼저 종료시킨다.

   ```
   psh node shutdown -r now
   psh mirna shutdown -r now
   ```

3. 마스터 노드(master node)를 종료시킨다.

   ```
   shutdown -r now
   ```

### 시작

종료 절차와 반대로 진행하면 된다.

1. 마스터 노드를 켜고 완전히 부팅될 때까지 기다린다.
2. 직접 연결 저장장치를 갖고있는 노드들을 부팅시킨다.
3. 계산 노드들을 부팅시킨다.
4. 마스터 노드 및 계산 노드들의 직접 연결 저장장치들의 마운트를 진행한다. (관리자 권한 필요)

`mirna-mount.sh`

```bash
#!/bin/bash
psh mirna1 mount /dev/sdc1 /extdata1
psh mirna1 mount /dev/sdd1 /extdata2
psh mirna2 mount /dev/sdc1 /extdata3
psh mirna1 'echo "/extdata1 *(rw)" >> /etc/exports'
psh mirna1 'echo "/extdata2 *(rw)" >> /etc/exports'
psh mirna2 'echo "/extdata3 *(rw)" >> /etc/exports'
psh mirna1 service nfs restart
psh mirna2 service nfs restart
```

```bash
#!/bin/bash
mount -t nfs 192.168.10.252:/extdata1   /extdata1
mount -t nfs 192.168.10.252:/extdata1   /extdata1
mount -t nfs 192.168.10.253:/extdata2   /extdata2
psh node mount -t nfs 192.168.10.253:/extdata1   /extdata1
psh node mount -t nfs 192.168.10.253:/extdata2   /extdata2
psh node mount -t nfs 192.168.10.252:/extdata3   /extdata3
psh mirna1 mount -t nfs 192.168.10.253:/extdata3 /extdata3
psh mirna2 mount -t nfs 192.168.10.252:/extdata1 /extdata1
psh mirna2 mount -t nfs 192.168.10.252:/extdata2 /extdata2
```

### 파일을 읽고 쓸 때 느린 경우

마운트 되어있는 파일인 경우 자주 이런 현상이 나타날 수 있다.
이 때에는 저장장치를 제공하는 서버로 가서 NFS 서비스를 재시작 해주면 대부분 해결된다.
마스터 노드에서 파일을 읽고 쓰는 게 너무 느려서 NAS 노드로 가서 NFS 서비스를 재시작 해주었더니 빨라졌다.

```
[lab@mirna1 ~]# systemctl restart nfs-server.service
```

### Reassign write operation failed

Wall 메시지로 다음과 같은 에러 메시지가 모든 터미널에 뿌려질 때가 있다.

```
[lab@master ~]$
Message from syslogd@nas-0-0 at Sep  3 15:55:43 ...
 MR_MONITOR[3089]: <MRMON108> Controller ID:  2   Reassign write operation failed:   PD   01:0:9      Location   0x187295800#012Event ID:108

Message from syslogd@nas-0-0 at Sep  3 15:55:43 ...
 MR_MONITOR[3089]: <MRMON108> Controller ID:  2   Reassign write operation failed:   PD   01:0:9      Location   0x187295800#012Event ID:108

Message from syslogd@nas-0-0 at Sep  3 15:55:44 ...
 MR_MONITOR[3089]: <MRMON108> Controller ID:  2   Reassign write operation failed:   PD   01:0:9      Location   0x187295800#012Event ID:108

Message from syslogd@nas-0-0 at Sep  3 15:55:44 ...
 MR_MONITOR[3089]: <MRMON108> Controller ID:  2   Reassign write operation failed:   PD   01:0:9      Location   0x187295800#012Event ID:108
[lab@master ~]$
```

### 부팅 시 화면이 보이지 않는 경우

* 방법 1: `Ctrl+Alt+Backspace` 를 누르면 화면의 해상도가 조절된다. 이를 이용해 아이콘을 보이게 할 수 있다.
* 방법 2: `Ctrl+Alt+(F1~F9)` 를 이용해 화면을 전환하면 로그인 되어있는 화면을 찾을 수 있다.
