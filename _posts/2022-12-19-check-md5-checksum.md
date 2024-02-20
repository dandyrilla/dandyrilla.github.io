---
layout: post
title: "How to check MD5 checksum of a downloaded file"
tags: [md5, checksum]
comments: true
share: true
---

When downloading files for patching or drivers you may need to verify the file
is complete. This can be done by verifying the MD5 checksum from the steps
below on your PC or Mac workstation.

## Windows

### Step 1

Open the Windows command line. Press Windows + R, type cmd and press Enter.
(Alternative: You can also open command prompt or Windows PowerShell from the
Start menu, of course.)

### Step 2

Go to the folder that contains the file whose MD5 checksum you want to check
and verify. Command: Type `cd` followed by the path to the folder.
(Tip: You can drag and drop a folder from Windows Explorer to insert the path.)

### Step 3

Type the command below

```
certutil -hashfile <file> MD5
```

Replace <file> with the filename.

Tip: You can use the Tab key to have Windows complete the file name.
Example to get the MD5 hash for the file Example.txt:

```
certutil -hashfile Example.txt MD5
```

### Step 4

Press Enter.
Compare the resulting checksum to what you expect:

```
Microsoft Windows [Version 10.0.19042.964]
(c) Microsoft Corporation. All rights reserved.

C:\Users\sukjun> cd Downloads

C:\Users\sukjun\Downloads> certutil -hashfile Example.txt MD5
MD5 hash of Example.txt
a5d0173a59
CertUtil: -hashfile command completed successfully.

C:\Users\sukjun\Downloads>
```

## Mac

### Step 1

Open Terminal

### Step 2

Navigate to the folder that contains the file whose MD5 checksum you want to
verify.

### Step 3

You can open Terminal right at a folder from Finder.

### Step 4

Type md5 followed by the filename

```
md5 <file>
```

(Dragging and dropping: You can also type md5, then drag and drop the file you
want to check onto the Terminal window.)