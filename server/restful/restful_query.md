# RESTFUL
## http에서 query는 무엇이고 언제 사용하는가?
<div class="pull-right">  업데이트 :: 2018.06.14 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [RESTFUL](#restful)
	* [http에서 query는 무엇이고 언제 사용하는가?](#http에서-query는-무엇이고-언제-사용하는가)
		* [01. 쿼리](#01-쿼리)
		* [02. 어떤 질문이 더 Restful일까요 ?](#02-어떤-질문이-더-restful일까요)
		* [03. 그럼 장단점은 ?](#03-그럼-장단점은)

<!-- /code_chunk_output -->

### 01. 쿼리

쿼리 구성요소는 비 계층적 데이터 검색을 위한 것입니다.

가계도 보다는 본질적으로 계층적인 것들은 거의 없습니다.

> 쿼리 구성 요소에 비계층적 데이터가 포함되어 있습니다.

### 02. 어떤 질문이 더 Restful일까요 ?

GET :: /myservice/api/v1/grandparents/{grandparentID}/parents/children?search={text}

GET :: /myservice/api/v1/parents/{parentID}/children?search={text}

GET :: /myservice/api/v1/children?search={text}&grandparentID={id}&parentID=${id}

사실은 모두 같은 방식으로 행동하고 의미합니다.

URL의 마지막 리소스는 자식이며 클라이언트가 자식 리소스에서 동작하고 있습니다.

RESTful 아키텍처 스타일의 주요 전제 조건은 응용 프로그램 상태 전환을 하이퍼 미디어로 서버에서 전달해야한다는 것입니다.

사람들은 URI의 구조에 대해 "RESTful URIs"를 만들기 위해 노력했지만 REST에 관한 공식적인 문헌은 실제로 이것에 관해서는 거의 이야기하지 않았다.

> REST 문학에서 말하는 것은 HTTP를 전송 프로토콜로 사용하려는 경우
> 프로토콜 사양의 공식 요구 사항을 준수해야하며
> "http를 사용하여 http를 계속 사용하면서 http를 사용한다고 선언 할 수는 없습니다"

### 03. 그럼 장단점은 ?

첫번째와 두번째는 올바른 길로 가고 있으나 세번째는 문제점이 보입니다.

이해력과 유지보수성에 관한한, 그것들은 분명히 주관적이고 클라이언트 개발자의 이해 수준과 디자이너의 설계 턱에 ​​달려 있습니다.

> 계층적 데이터는 경로 및 경로매개변수로 나타납니다.

> 비계층적 데이터는 쿼리에서 나타납니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: https://softwareengineering.stackexchange.com/questions/270898/designing-a-rest-api-by-uri-vs-query-string?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa ](https://softwareengineering.stackexchange.com/questions/270898/designing-a-rest-api-by-uri-vs-query-string?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

[링크2 :: ]()
