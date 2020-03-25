---
layout: post
title: "파이썬의 스핑크스(Sphinx)를 이용한 문서화"
image: /images/2017-09-07/cover.svg
description: >
  스크립트를 잘 문서화 시켜두는 것은 곧 기존 코드의 재사용성을 높이고 개발 생산성을 증가시킵니다.
  개발하면서 문서화까지 작업할 수 있는 파이썬의 스핑크스(Sphinx)라는 강력한 문서화 도구를 이용해 파이썬 패키지 또는
  스크립트를 문서화 시키는 방법에 대하여 자세히 알아봅니다.
tags: [sphinx, python documentation]
share: true
comments: true
---


## 문서 생성하기

[Sphinx](http://www.sphinx-doc.org/en/stable/)는 쉽게 문서를 생성할 수 있도록 `sphinx-quickstart`라는 유틸리티를
제공한다. 대화 형식으로 몇 가지 물어보는 설정 항목에 대답하고 나면 문서화를 바로 시작할 수 있도록 여러 파일들을 일일이
만들어 줄 필요 없이 자동으로 생성해 준다. 자, 그럼 단계별로 따라가 보자.

### Step 1. 루트 디렉토리

첫 번째로 문서를 저장해 놓을 경로를 물어본다. 보통 현재 디렉토리 내에 'doc' 이라는 이름의 폴더를 만들어 보관하므로
`doc`을 입력해 주었다.

```
$ sphinx-quickstart
Welcome to the Sphinx 1.4.1 quickstart utility.

Please enter values for the following settings (just press Enter to
accept a default value, if one is given in brackets).

Enter the root path for documentation.
> Root path for the documentation [.]: doc
```

### Step 2. 빌드 디렉토리

Sphinx는 기본적으로 우리가 만든 RestructuredText(reST, rst) 파일들을 이용하여 HTML 파일들을 만드는 과정으로 문서화를
진행한다. 여기서 rst 파일들을 소스, HTML 파일들을 빌드된 결과물이라고 한다. 두 번째로 이 빌드된 결과물이 담길
'빌드 디렉토리'를 '소스 디렉토리'와 분리하여 관리할 것인지를 물어본다. 소스와 빌드 디렉토리를 분리하지 않으면
`doc/_build`라는 폴더에 빌드를 저장하게 되고, 따로 구분하여 쓸 것이라면 `doc/_source`와 `doc/_build` 디렉토리가 따로
생성된다. 개인적으로 소스와 빌드를 분리해 놓고 사용하는 편을 좋아해서 'y' 라고 입력하였다.

```
You have two options for placing the build directory for Sphinx output.
Either, you use a directory "_build" within the root path, or you separate
"source" and "build" directories within the root path.
> Separate source and build directories (y/n) [n]: y
```

### Step 3. 추가적으로 생성되는 폴더의 머릿글자

세 번째로, Sphinx 는 루트 디렉토리 `doc` 내에 두 가지 폴더를 더 생성하는데,
템플릿이 담길 '_templates' 폴더와 이미지, CSS, Javascript 등과 같은 정적 파일들이 담길 '_static' 폴더이다.
생성할 폴더의 이름 앞에 붙는 prefix를 결정할 수 있다. 여기에선 기본값을 사용할 것이므로 엔터를 쳐서 넘어간다.

```
Inside the root directory, two more directories will be created; "_templates"
for custom HTML templates and "_static" for custom stylesheets and other static
files. You can enter another prefix (such as ".") to replace the underscore.
> Name prefix for templates and static dir [_]:
```

### Step 4. 프로젝트에 대한 정보

프로젝트에 관한 내용을 물어본다. 프로젝트의 이름과 저자명을 입력한다. 그리고 프로젝트의 버전과 릴리즈 정보를 입력한다.

```
The project name will occur in several places in the built documentation.
> Project name: project
> Author name(s): Sukjun Kim

Sphinx has the notion of a "version" and a "release" for the
software. Each version can have multiple releases. For example, for
Python the version is something like 2.5 or 3.0, while the release is
something like 2.5.1 or 3.0a1.  If you don't need this dual structure,
just set both to the same value.
> Project version: 1.0
> Project release [1.0]:
```

### Step 5. 문서화 언어 설정

문서가 어떤 언어로 쓰여질지를 묻는 항목이다. 영어로 작성될 것이므로 그냥 기본값을 사용한다.

```
If the documents are to be written in a language other than English,
you can select a language here by its language code. Sphinx will then
translate text that it generates into that language.

For a list of supported codes, see
http://sphinx-doc.org/config.html#confval-language.
> Project language [en]:
```

### Step 6. 소스 파일의 확장자

Sphinx 는 기본적으로 RestructuredText 형식을 소스 파일로 사용한다. 이 소스 파일의 확장자를 입력한다.
기본값 그대로 사용할 것이므로 이 역시 엔터를 쳐서 넘어간다.

```
The file name suffix for source files. Commonly, this is either ".txt"
or ".rst".  Only files with this suffix are considered documents.
> Source file suffix [.rst]:
```

### Step 7. 문서의 시작 지점 설정

문서의 시작 지점을 설정하는 부분이다. 'index' 라는 이름을 그대로 사용할 것이므로 엔터를 쳐서 넘어간다.

```
One document is special in that it is considered the top node of the
"contents tree", that is, it is the root of the hierarchical structure
of the documents. Normally, this is "index", but if your "index"
document is a custom template, you can also set this to another filename.
> Name of your master document (without suffix) [index]:
```

### Step 8. 추가 기능 선택

추가 기능들을 사용할 것인지를 물어본다. 파이썬 스크립트를 보고 자동으로 문서를 만들어주는 'autodoc',
문서 간 참조를 위한 'intersphinx' 등 추가 기능에 대해 'y'를 입력하였다.

```
Sphinx can also add configuration for epub output:
> Do you want to use the epub builder (y/n) [n]:

Please indicate if you want to use one of the following Sphinx extensions:
> autodoc: automatically insert docstrings from modules (y/n) [n]: y
> doctest: automatically test code snippets in doctest blocks (y/n) [n]:
> intersphinx: link between Sphinx documentation of different projects (y/n) [n]: y
> todo: write "todo" entries that can be shown or hidden on build (y/n) [n]: y
> coverage: checks for documentation coverage (y/n) [n]:
> imgmath: include math, rendered as PNG or SVG images (y/n) [n]:
> mathjax: include math, rendered in the browser by MathJax (y/n) [n]:
> ifconfig: conditional inclusion of content based on config values (y/n) [n]:
> viewcode: include links to the source code of documented Python objects (y/n) [n]: y
> githubpages: create .nojekyll file to publish the document on GitHub pages (y/n) [n]:
```

### Step 9. 빌드 스크립트 생성

make를 통해 문서를 간편히 빌드할 수 있도록 해주는 부가 파일들을 만들건지를 물어본다.
리눅스에서 사용할 것이므로 Makefile 만 만들고 윈도우용 .bat 파일은 따로 만들지 않기로 했다.

```
A Makefile and a Windows command file can be generated for you so that you
only have to run e.g. `make html' instead of invoking sphinx-build
directly.
> Create Makefile? (y/n) [y]:
> Create Windows command file? (y/n) [y]: n

Creating file doc/conf.py.
Creating file doc/index.rst.
Creating file doc/Makefile.
```

### Step 10. 설정 완료

초기 설정이 모두 완성되었다! html 문서를 빌드하려면 이제 `make html`과 같이 입력하여 간편하게 문서를 만들 수 있다.

```
Finished: An initial directory structure has been created.

You should now populate your master file doc/index.rst and create other documentation
source files. Use the Makefile to build the docs, like so:
   make builder
where "builder" is one of the supported builders, e.g. html, latex or linkcheck.
```


## 참고

* [tech.ssut - Python 문서화, Sphinx로 아주 간단하게 시작해보기](https://tech.ssut.me/2015/07/28/start-python-documentation-using-sphinx/)
* [Sphinx로 TIL 문서 페이지 만들기](https://songyunseop.github.io/post/2017/11/setting-til-page-with-sphinx/)