---
layout: post
title: "공유 라이브러리 에러들"
description: "공유 라이브러리와 연관되어 자주 접하는 에러들을 기록합니다."
tags: [shared library, so, linux, compile error]
comments: true
share: true
---

### cannot open shared object file

해당 공유 라이브러리를 찾지 못해서 나는 에러. 주로 HPC 컴퓨팅 시에 각 노드들의 환경이 달라 많이 발생한다.

```
libstdc++.so.5: cannot open shared object file: No such file or directory
libgcc_s.so.1: cannot open shared object file: No such file or directory
```

---

### undefined reference to

해당 공유 라이브러리는 존재하지만 라이브러리 안에 해당하는 함수가 없어서 나는 에러. 보통 구버전의 공유 라이브러리를
사용하려고 할 때 나타난다.

samtools 컴파일 시에 나타났던 에러

```
gcc -pthread -o samtools bam_index.o bam_plcmd.o sam_view.o bam_cat.o bam_md.o bam_reheader.o bam_sort.o bedidx.o kprobaln.o bam_rmdup.o bam_rmdupse.o bam_mate.o bam_stat.o bam_color.o bamtk.o bam2bcf.o bam2bcf_indel.o errmod.o sample.o cut_target.o phase.o bam2depth.o padding.o bedcov.o bamshuf.o faidx.o stats.o stats_isize.o bam_flags.o bam_split.o bam_tview.o bam_tview_curses.o bam_tview_html.o bam_lpileup.o libbam.a htslib-1.2.1/libhts.a  -lcurses  -lm -lz

bedidx.o: In function `bed_read':
/home/lab/bin/samtools-1.2/bedidx.c:170: undefined reference to `gzopen64'

phase.o: In function `loadpos':
/home/lab/bin/samtools-1.2/phase.c:507: undefined reference to `gzopen64'

bedcov.o: In function `main_bedcov':
/home/lab/bin/samtools-1.2/bedcov.c:98: undefined reference to `gzopen64'

collect2: ld returned 1 exit status
make: *** [samtools] Error 1
```

---

### no version information available

bigWigToWig 를 실행시켰을 때 다음과 같은 에러 메시지가 나타난다.

```
bin/ucsc/bigWigToWig: /lib64/libz.so.1: no version information available (required by bin/ucsc/bigWigToWig)
```

원인: 해당 공유라이브러리는 찾았으나 버전 정보를 찾지 못하는 에러. 하지만 실행에 문제를 일으키지는 않는 경우가 많다.

`readelf -V {exec}`: ELF 실행 파일의 현재 버전 정보를 보는 명령어

---

### 공유 라이브러리들이 위치하는 장소

각 bin, include, lib, lib64, share, man 폴더들이 위치한다.

* `/bin` :
* `/include` :
* `/lib` : 라이브러리 기본 폴더
* `/lib64` : 64비트 전용 라이브러리를 저장하는 폴더
* `/share` : 
* `/man` : 라이브러리에 대한 도움말(man 페이지)이 담겨있는 폴더

---

### 현재 실행 파일이 사용하고 있는 공유 라이브러리들의 목록

`ldd (executable file)`: 현재 실행 파일이 사용하고 있는 공유 라이브러리들의 목록을 확인하는 명령어

```
$ ldd samtools
    linux-vdso.so.1 =>                        (0x00007fffcefff000)
    libncurses.so.5 => /lib64/libncurses.so.5 (0x00000033fca00000)
    libm.so.6       => /lib64/libm.so.6       (0x000000301e400000)
    libz.so.1       => /lib64/libz.so.1       (0x00000030da600000)
    libpthread.so.0 => /lib64/libpthread.so.0 (0x000000301ec00000)
    libc.so.6       => /lib64/libc.so.6       (0x000000301e000000)
    libtinfo.so.5   => /lib64/libtinfo.so.5   (0x00000033fce00000)
    libdl.so.2      => /lib64/libdl.so.2      (0x000000301e800000)
    /lib64/ld-linux-x86-64.so.2               (0x000000301dc00000)
```

`ldconfig -v`: 현재 불러오고 있는 공유 라이브러리의 목록들을 확인하는 명령어