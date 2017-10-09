---
layout: post
title: "리눅스 모니터링하기"
description: "리눅스의 모니터링 방법을 알아봅니다."
tags: [linux, monitoring]
comments: true
share: true
---


### iostat

마스터의 상태

```
$ iostat
Linux 2.6.32-279.14.1.el6.x86_64 (sirna1.snu.ac.kr)  10/09/2017  _x86_64_  (4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.99    0.00    1.18    0.36    0.00   97.47

Device:            tps   Blk_read/s   Blk_wrtn/s   Blk_read   Blk_wrtn
sda               1.80         8.89        30.06  155051140  524240872
```

계산용 노드의 상태

```
Linux 2.6.32-279.14.1.el6.x86_64 (node01.local)  10/09/2017  _x86_64_  (4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           4.37    0.00    0.20    0.22    0.00   95.21

Device:            tps   Blk_read/s   Blk_wrtn/s   Blk_read   Blk_wrtn
sda               0.14         1.05         2.55   18389786   44459328
```

데이터 저장용 노드의 상태

```
$ iostat
Linux 2.6.32-279.14.1.el6.x86_64 (mirna1.local)  10/09/2017  _x86_64_  (48 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.92    0.00    0.28    0.13    0.00   98.67

Device:            tps   Blk_read/s   Blk_wrtn/s    Blk_read    Blk_wrtn
sda               0.19         4.38        10.87    52238066   129615256
sdb               0.00         0.00         0.00        9256         121
sdc              52.76      4048.59      6020.97 48260634060 71772156041
sdd               2.57       254.35       323.18  3031974964  3852463963
```

-x 옵션을 이용하면 더욱 자세한 정보를 보여줍니다.

```
$ iostat -x
Linux 2.6.32-279.14.1.el6.x86_64 (mirna1.local)  10/09/2017  _x86_64_  (48 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.92    0.00    0.28    0.13    0.00   98.67

Device:         rrqm/s   wrqm/s     r/s     w/s   rsec/s   wsec/s avgrq-sz avgqu-sz   await  svctm  %util
sda               0.01     1.20    0.03    0.15     4.38    10.87    81.41     0.00    5.07   0.42   0.01
sdb               0.00     0.00    0.00    0.00     0.00     0.00     9.72     0.00    0.43   0.42   0.00
sdc               0.04     0.46   25.32   27.44  4048.52  6020.91   190.85     0.21    3.97   0.52   2.77
sdd               0.00     0.00    1.10    1.46   254.35   323.18   224.95     0.02    6.63   0.39   0.10
```