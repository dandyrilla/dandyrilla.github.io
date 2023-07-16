---
layout: post
title: "NVIDIA GPU 모니터링 방법"
description: NVIDIA GPU 를 모니터링 할 수 있는 nvidia-smi 명령어의 사용법과 출력 결과를 살펴본다.
tags: [nvidia-smi]
comments: true
share: true
---

## nvidia-smi 명령어가 알려주는 정보들

GPU 사용량은 아래 그림에서 **4B** 항목을 보시면 되고, GPU 메모리 사용량은 **3C** 항목을 확인하시면
됩니다. 더욱 자세한 내용들은 5개의 섹션별로 나누어 아래에 설명해 두었으니 참고 부탁드립니다.

[![image](/images/2023-07-09/nvidia-smi-desc-kr.png "Description of nvidia-smi output")](/images/2023-07-09/nvidia-smi-desc-kr.png)

### Section 1: 날짜 및 드라이버 버전

![image](/images/2023-07-09/nvidia-smi-sec1.png "Section 1, Date and driver version")

* **1A**: nvidia-smi 명령이 수행된 시각입니다. 요일, 월, 일, 시:분:초, 년도의 형식으로
  출력됩니다.
* **1B**: nvidia-smi 명령의 버전과 현재 시스템에 설치된 NVIDIA GPU 드라이버의 버전입니다.
  GPU 드라이버가 설치될 때 nvidia-smi 명령도 같이 설치되므로 두 버전은 항상 같게 출력되게 됩니다.
* **1C**: 권장 CUDA 버전입니다. 현재 시스템에 설치된 CUDA 버전이 아님에 유의합니다. 현재 시스템에
  설치된 GPU 드라이버 버전과 호환성 측면에서 권장되는 버전이 표시되는 것입니다. 현재 시스템에 설치된
  CUDA 버전을 확인하려면 `nvcc --version` 명령을 이용합니다.

### Section 2: GPU 정보 및 물리적인 상태

![image](/images/2023-07-09/nvidia-smi-sec2.png "Section 2, GPU info and physical status")

* **2A**: GPU 에 매겨지는 번호입니다. 여기에서는 총 8개의 GPU 가 보이며, 0 부터 7 까지의 번호가 
  매겨져 있습니다.
* **2B**: GPU 모델명을 나타냅니다. 모델명이 긴 경우 뒷부분이 잘려서 표시되는데, 이런 경우에는
  `nvidia-smi -L` 명령어로 전체 모델명을 확인할 수 있습니다.
* **2C**: Persistence Mode 를 의미합니다. GPU 커널 모듈의 활성화 상태가 표시됩니다. 기본적으로
  커널 모듈은 해제되어 있는 상태(Off 표시)이며, GPU 를 사용하는 작업이 수행될 때 자동으로 커널 모듈을
  활성화(On 표시)합니다.
* **2D**: GPU 마다 부착된 팬이 돌아가는 속도를 나타냅니다. GPU 온도가 높을수록 냉각을 위해 팬이 더
  빠르게 돌아가게 됩니다.
* **2E**: GPU 온도입니다. 단위는 섭씨(℃)입니다.
* **2F**: GPU 성능 수준이 표시된 부분입니다. P0 (가장 높은 성능) 부터 P15 (가장 낮은 성능) 까지
  표시될 수 있습니다만, 자주 볼 수 있는 성능 수준은 아래와 같습니다:
  * P0/P1 - 최대 3D 성능
  * P2/P3 - 균형적인 3D 성능
  * P8 - 기본 HD 비디오 재생
  * P10 - DVD 재생
  * P12 - 최소 유휴상태 전원소비
* **2G**: GPU 가 최대 사용할 수 있는 전력 대비 현재 사용중인 전력이 표시되고 있습니다.

### Section 3: GPU 장착 위치 및 메모리 사용량

![image](/images/2023-07-09/nvidia-smi-sec3.png "Section 3, GPU's PCIe bus address and memory usage")

* **3A**: GPU 가 장착된 PCIe 버스의 주소입니다. 이는 유지보수 시 GPU 의 위치를 알아내는 데 매우
  중요한 정보로 사용됩니다.
* **3B**: 해당 GPU 가 모니터 화면 출력에 사용되고 있는지의 여부입니다. On 또는 Off 로 표시됩니다.
* **3C**: 사용 가능한 GPU 메모리의 총 용량 대비 현재 사용량이 표시되고 있습니다. CPU 메모리와
  마찬가지로 GPU 사용 시에도 GPU 메모리가 초과되지 않도록 신경써야 합니다.

### Section 4: GPU 사용량 및 멀티 인스턴스 정보

![image](/images/2023-07-09/nvidia-smi-sec4.png "Section 4, GPU usage and multi instance info")

* **4A**: 연산하는 과정에서 GPU 에서 발생된 에러 정도를 나타낸 수치입니다. 0 부터 시작하여 에러가
  발생할 수록 점점 증가하게 됩니다. 지원하지 않는 경우에는 N/A 로 표시됩니다.
* **4B**: GPU 사용량입니다. 0 ~ 100% 범위로 표시됩니다.
* **4C**: Compute Mode 라는 뜻으로, GPU 의 공유 접근 방법을 표시합니다. 기본값은 Default (0)
  로 표시되며, 이는 여러 스레드가 해당 GPU 를 동시에 공유하면서 사용할 수 있다는 의미입니다.

### Section 5: GPU 를 사용 중인 프로세스들

![image](/images/2023-07-09/nvidia-smi-sec5.png "Section 5, List of processes using GPU")

* **5A**: 특정 프로세스가 사용하고 있는 GPU 번호입니다.
* **5B**: GPU Instance ID 를 의미하며, MIG 모드가 활성화 되어있을 때 표시됩니다.
* **5C**: Compute Instance ID 를 의미하며, 각각의 GPU instance 에 대해 매겨지는 compute
  instance 의 번호입니다.
* **5D**: 프로세스 ID 입니다.
* **5E**: 프로세스가 사용하고 있는 GPU 모드 입니다. 다음의 3가지 값으로 표현됩니다.
  * G: 그래픽(Graphics) 모드로, 비디오 렌더링을 위한 전문가용 3D 그래픽 또는 게임 사용 시에 주로
    표시됩니다.
  * C: 계산(Compute) 모드로, Tensorflow 나 Pytorch 등을 사용하는 딥러닝 모델의 학습 또는
    인퍼런스 시에 주로 표시됩니다.
  * C+G: 위의 두 모드가 동시에 사용될 때 표시됩니다.
* **5F**: 프로세스 이름입니다. 실행한 명령어가 표시됩니다.
* **5G**: 해당 프로세스의 GPU 메모리 사용량입니다.
