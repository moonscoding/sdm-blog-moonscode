# 사용하세요 ! MARK_DOWN (feat. ATOM)

#### 마크다운 (in atom) 에서 사용하는 단축키

Moon's Coding - 2017.12.17

<hr>

#### 00. 기본 - space 와 enter

space : 한번 = 여러번

enter : 한번 = 줄바꿈, 여러번 = 단락 변경 , 다중 = \<br/>

#### 01. 헤더 (header)

- 큰제목 : 문서 제목

```
  This is H1
  =============
```

This is H1
=============

- 작은 제목 : 문서 부제목

```
  This is H2
  -------------
```

This is H2
-------------

- 글머리 : 1~6

```
  # This is H1
  ## This is H2
  ### This is H3
  #### This is H4
  ##### This is H5
  ###### This is H6
```

# This is H1
## This is H2
### This is H3
#### This is H4
##### This is H5
###### This is H6

#### 02. 인용구 BlockQuote

```
    > This is BlockQuote.

    > This is BlockQuote.
    >> This is BlockQuote.
```
> This is BlockQuote.

> This is BlockQuote.
>> This is BlockQuote.

#### 03. 목록

- 순서 있는 목록

```
  1. 첫번째
  2. 두번쨰
  3. 세번째
```

1. 첫번째
2. 두번쨰
3. 세번째

- 순서 없는 목록

```
- 빨강
  - 녹색
    - 파랑

- 빨강
- 녹색
- 파랑
```

- 빨강
  - 녹색
    - 파랑

- 빨강
- 녹색
- 파랑

#### 04. 코드

- 코드 인용

```
    `
        코드인용
    `
```

`
    코드인용
`

- 블록 인용

```
    [방법 1] 공백 4칸

    ()()()() 블록 인용

    [방법 2] ``` ```

    ```
      블록 인용
    ```

    [방법3] <pre></pre>
    <pre>
        블록 인용
    </pre>
```

    블록 인용

```
블록 인용
```

<pre>블록 인용</pre>

#### 05. 수평선

```
    <hr/>
    ---
    ***
    ___
```

<hr/>

---

***

___

#### 06. 링크

```
    # 그냥 URL
    url

    # 인라인 링크
    [구글](URL)

    # 참조 링크
    [텍스트][참조명]
    [참조명]: URL
```

[구글](www.google.com)

#### 07. 강조

```
    [이태릭]
    *이태릭*
    _이태릭_

    [강조]
    **강조**
    __강조__

    [이태릭+강조]
    ***이태릭 + 강조***
    ___이태릭 + 강조___

    [밑줄]
    <u>밑줄</u>

    [취소선]
    ~~취소선~~

    [하이라이트]
    ==하이라이트==
```

*이태릭*

_이태릭_

**강조**

__강조__

***이태릭+강조***

___이태릭+강조___

<u>밑줄</u>

~~취소선~~

==하이라이트==

#### 08. 이미지

```
    [기본이미지]
    ![Alt text](http://placehold.it/100x100)

    [링크이미지]
    [![](http://placehold.it/100x100)](http://placehold.it/100x100)

    [이미지크기변경]
    <img src="http://placehold.it/100x100" width="50" height="50" />
```

![Alt text](http://placehold.it/100x100)

[![](http://placehold.it/100x100)](http://placehold.it/100x100)

<img src="http://placehold.it/100x100" width="50" height="50" />


~~**이미지 shortcut 사용방법 (markdown preview enhanced 에서 지원)**~~

~~1. [s] + [c] + p~~
~~2. image helper 검색~~
~~3. 이미지 경로 선택~~

**사용하지않음 -> 경로가 /asset/~ 으로 새로 설정됨**

#### 09. 표

- 기본

```
    1  | 2  | 3
    -- | -- | --
       |    |  
```

1  | 2  | 3
-- | -- | --
   |    |  

- 정렬

```
    왼쪽정렬|가운데정렬|오른쪽정렬
    --|:--:|--:
    왼쪽정렬이|가운데정렬|오른쪽정렬
    1|1|1
```

왼쪽정렬|가운데정렬|오른쪽정렬
--|:--:|--:
왼쪽정렬이|가운데정렬|오른쪽정렬
1|1|1

#### 10. 주석

```
    \- 주석
    \- 리스트
    \- 무시
```

\- 주석
\- 리스트
\- 무시

#### 11. 정렬

```
    <center>가운데정렬</center>
    <div class="pull-left">왼쪽정렬</div>
    <div class="pull-right">오른쪽정렬</div>
```

<center>가운데정렬</center>
<div class="pull-left">왼쪽정렬</div>
<div class="pull-right">오른쪽정렬</div>





<hr/>

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](https://gist.github.com/ihoneymon/652be052a0727ad59601)**

**참조 : [링크2](https://steemit.com/kr/@nand/markdown)**
