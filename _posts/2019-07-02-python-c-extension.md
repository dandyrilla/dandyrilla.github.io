---
layout: post
title: "파이썬3 에서 C 모듈 만들고 사용하기"
description: "C 언어로 작성한 모듈을 파이썬에서 사용할 수 있게 모듈화 시키고 이를 이용하는 예제를 살펴보겠습니다."
tags: [Python, C extension, shared library]
share: true
comments: true
---

인터프리터 언어인 파이썬으로는 많은 양의 계산을 하기에는 속도가 느립니다. 이럴 때마다 계산을 많이 해야하는 핵심이 되는
부분만 C 언어로 작성하여 모듈로 사용하면 효율적입니다. Python 2 에서 C 언어로 작성한 모듈을 사용하는 예제들은 쉽게 찾을
수 있었지만, Python 3 로 넘어오면서 몇 가지 바뀐 것들로 인해 Python 2 를 기준으로 설명된 예제들을 따라했더니 되지 않는
경우가 많았습니다. 이 포스팅은 Python 3 를 사용하는 사람들을 대상으로 작성하였습니다.

먼저, C 모듈을 만들어 볼 겁니다. 다음과 같이 `mylib.c` 라는 파일명으로 다음과 같은 내용으로 입력해주면 됩니다.

```c
#include "Python.h"

static PyObject*
mylib_add(PyObject *self, PyObject *args)
{
    char* str;
    int len;

    if (!PyArg_ParseTuple(args, "s", &str))
        return NULL;

    len = strlen(str);

    return Py_BuildValue("i", len);
}

static PyMethodDef
spam_methods[] = {
    {"add", spam_strlen, METH_VARARGS, "count a string length"},
    {NULL, NULL, 0, NULL}
};

static struct PyModuleDef
spam_module = {
    PyModuleDef_HEAD_INIT,
    "spam",
    "It is test module",
    -1, spam_methods
};

PyMODINIT_FUNC
PyInit_spam(void)
{
    return PyModule_Create(&spam_module);
}
```

