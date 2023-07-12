---
layout: post
title: "nvidia-smi 출력 결과물을 pandas 데이터프레임으로 받아보자"
tags: [nvidia-smi, pandas, dataframe]
comments: true
share: true
---

다음과 같이 subprocess 모듈과 pandas 라이브러리를 이용하여 nvidia-smi 결과를 pandas dataframe 형태로 받아볼 수 있다.
주기적으로 nvidia-smi 결과를 어딘가에 실행하여 저장해두어야 하는 일이 있을 때 활용할 수 있다.

```python
from subprocess import check_output

import pandas as pd


# https://nvidia.custhelp.com/app/answers/detail/a_id/3751/~/useful-nvidia-smi-queries
columns = ['timestamp', 'name', 'pci.bus_id', 'driver_version', 'pstate',
           'pcie.link.gen.max', 'pcie.link.gen.current',
           'temperature.gpu', 'utilization.gpu', 'utilization.memory',
           'memory.total', 'memory.free', 'memory.used']

qstring = ','.join(columns)
command = ['nvidia-smi', f'--query-gpu={qstring}', '--format=csv']

output = check_output(command, encoding='utf-8').strip()
lines = output.split('\n')

rows = []
keys = [column.replace('.', '_') for column in lines[0].split(', ')]
for line in lines[1:]:
    values = line.split(', ')
    rows.append(dict(tuple(zip(keys, values))))
df = pd.DataFrame(rows)

print(df.to_string())

#                  timestamp                        name        pci_bus_id driver_version pstate pcie_link_gen_max pcie_link_gen_current temperature_gpu utilization_gpu [%] utilization_memory [%] memory_total [MiB] memory_free [MiB] memory_used [MiB]
# 0  2023/07/13 03:00:50.261  NVIDIA GeForce RTX 2080 Ti  00000000:1D:00.0     470.182.03     P2                 3                     3              42                 0 %                    0 %          11019 MiB           333 MiB         10686 MiB
# 1  2023/07/13 03:00:50.263  NVIDIA GeForce RTX 2080 Ti  00000000:1F:00.0     470.182.03     P2                 3                     3              42                 0 %                    0 %          11019 MiB           442 MiB         10577 MiB
# 2  2023/07/13 03:00:50.265  NVIDIA GeForce RTX 2080 Ti  00000000:20:00.0     470.182.03     P2                 3                     3              42                 4 %                    2 %          11019 MiB           348 MiB         10671 MiB
# 3  2023/07/13 03:00:50.268  NVIDIA GeForce RTX 2080 Ti  00000000:21:00.0     470.182.03     P2                 3                     3              41                 4 %                    2 %          11019 MiB          1156 MiB          9863 MiB
# 4  2023/07/13 03:00:50.271  NVIDIA GeForce RTX 2080 Ti  00000000:22:00.0     470.182.03     P2                 3                     3              41                 0 %                    0 %          11019 MiB           333 MiB         10686 MiB
# 5  2023/07/13 03:00:50.273  NVIDIA GeForce RTX 2080 Ti  00000000:23:00.0     470.182.03     P2                 3                     3              40                 0 %                    0 %          11019 MiB           333 MiB         10686 MiB
# 6  2023/07/13 03:00:50.275  NVIDIA GeForce RTX 2080 Ti  00000000:24:00.0     470.182.03     P2                 3                     3              42                 0 %                    0 %          11019 MiB           333 MiB         10686 MiB
```
