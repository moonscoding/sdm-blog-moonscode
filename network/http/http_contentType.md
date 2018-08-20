# NodeJS
## Content_Type
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [NodeJS](#nodejs)
	* [Content_Type](#content_type)
		* [01. 웹 개발자들을 위한 중요한 MIME 타입](#01-웹-개발자들을-위한-중요한-mime-타입)
		* [02. Content Type](#02-content-type)
		* [03. encoding](#03-encoding)
		* [04. MIME](#04-mime)
		* [05. 멀티파트타입](#05-멀티파트타입)
		* [06. 정확한 MIME 타입 설정의 중요성](#06-정확한-mime-타입-설정의-중요성)
		* [07. MIME 스니핑](#07-mime-스니핑)
		* [08. 4 The Content-Type Header Field](#08-4-the-content-type-header-field)

<!-- /code_chunk_output -->

### 01. 웹 개발자들을 위한 중요한 MIME 타입

- application/octet-stream
  - 이 타입은 이진 파일을 위한 기본값입니다.

- text/plain

- text/css

- text/html

- 이미지타입

- 오디오타입

- application/json
  - {key:value}의 형태로 전송

- application/x-www-form-urlencoded
  - key-value&key=value...의 형태로 전송

- multipart/*
  - 하나 이상의 다른 데이터 집합이 단일 본문에 결합되는 여러 부분 메시지의 경우 "다중 부분" Content-Type 필드가 엔터티의 머리글에 나타나야합니다.
  - multipart/form-data
    - 브라우저에서 서버로 HTML Form의 내용을 전송 시 사용할 수 있습니다.
    - 파트는 그 자체로 개체이며 자신만의 HTTP 헤더를 가지는데, 파일 업로드 필드를 위한 헤더로는 Content-Disposition,
    - 그리고 가장 일반적인 것 중 하나인 Content-Type이 있습니다
  - multipart/byteranges
    - 브라우저로 회신하는 부분적인 응답 전송의 컨텍스트 내에서 사용됩니다.
    - MIME 타입은 문서가 각각의 요청된 범위들 중 하나인 몇 가지 파트들로 구성되어 있음을 알려주기 위해 사용됩니다.


### 02. Content Type

HTTP Header에 쓰이는 Content-Type이란 무엇일까요?

request에 실어 보내는 데이터(body)의 type의 정보를 표현합니다.

'Text타입'으로는 text/css, text/javascript, text/html, text/plain등이 있습니다.

### 03. encoding

'encoding'을 해야합니다.

'applcation/x-www-form-urlencoded'를 사용할 경우,

body 인코딩이 해당 framework 혹은 library에서 자동으로 되는지 확인 후 안되면 해줘야한다.

### 04. MIME

> MIME 타입이란 클라이언트에게 전송된 문서의 다양성을 알려주기 위한 메커니즘입니다.

전자 우편을 위한 인터넷 표준 포맷입니다.

전자 우편은 ASCII 문자를 사용해서 전송되기 때문에 8비트 이상의 코드를 사용하는

문자나 이진 파일들은 MIME 포맷으로 변환되어 SMTP로 전송됩니다.

MIME (영어: Multipurpose Internet Mail Extensions)

ex.
- text/plain
- text/html
- image/jpeg
- ...

### 05. 멀티파트타입

> 멀티파트 타입은 일반적으로 다른 MIME 타입들을 지닌 개별적인 파트들로 나누어지는 문서의 카테고리를 가리킵니다.

즉, 이 타입은 합성된 문서를 나타내는 방법입니다.

- multipart/form-data
- multipart/byteranges


### 06. 정확한 MIME 타입 설정의 중요성

대부분의 웹 서버들은 기본 타입 중 하나인 ==application/octet-stream== MIME 타입을 사용해 알려지지 않은 타입의 리소스를 전송합니다.

보안상의 이유로, 대부분의 브라우저들은 그런 리소스에 대한 사용자화된 기본 동작 설정을 허용하지 않으며 그것을 사용하려면 디스크에 저장할 것을 사용자에게 강제합니다.

정확치 않게 구성된 서버들의 몇 가지 일반적 사례들은 다음의 파일 타입에서 일어납니다

- 인코딩된 RAR 파일
- 오디오와 비디오 파일
- 개인적인 파일 타입

### 07. MIME 스니핑

MIME 타입이 없을 때, 혹은 클라이언트가 타입이 잘못 설정됐다고 판단한 어떤 다른 경우에,

브라우저들은 MIME 스니핑을 시도할 수도 있는데, 이는 리소스를 훑어보고 정확한 MIME 타입을 추축해내는 것입니다.

각각의 브라우저들은 이런 과정을 다른 방식으로, 다른 환경 속에서 처리해냅니다.

이런 과정에 관한 몇 가지 보안 관련 사항들이 있는데, 몇몇 MIME 타입들은 실행 가능한 컨텐츠를 나타내고 다른 타입들은 그렇지 않기 때문입니다.

서버들은 Content-Type 중에 ==X-Content-Type-Options==를 전송하여 이런 MIME 스니핑을 차단할 수 있습니다.

### 08. 4 The Content-Type Header Field

> Content-Type 필드의 목적은 수신 사용자 에이전트가 데이터를 사용자에게 제시하거나
> 적절한 방식으로 데이터를 처리 할 수있는 적절한 에이전트 또는 메커니즘을 선택할 수 있도록 몸체에 포함 된 데이터를 충분히 설명하는 것입니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: https://jae-kwang.github.io/blog/2017/10/16/form-vs-ajax/](https://jae-kwang.github.io/blog/2017/10/16/form-vs-ajax/)

[링크2 :: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

[링크3 :: http Media Types 규격](https://www.iana.org/assignments/media-types/media-types.xhtml)

[링크4 :: 4 The Content-Type Header Field](https://www.w3.org/Protocols/rfc1341/4_Content-Type.html)
