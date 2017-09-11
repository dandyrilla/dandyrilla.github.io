---
layout: post
title: "공유 라이브러리 에러들"
description: "공유 라이브러리와 연관되어 자주 접하는 에러들을 기록합니다."
tags: [shared library, so, linux, compile error]
comments: true
share: true
---








### no version information available 에러

해당 공유라이브러리는 찾았으나 버전 정보를 찾지 못하는 에러

### undefined reference 에러

마찬가지로 해당 공유 라이브러리는 찾았으나 라이브러리 안에 해당하는 함수가 없어서 나는 에러. 보통 구버전의 공유 라이브러리를 사용하려고 할 때 나타난다.

samtools 컴파일 시에 나타났던 에러였다.

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


### 참고 명령어

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