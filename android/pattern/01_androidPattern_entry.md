# ANDROID PATTERN
## 안드로이드에서 많이 사용하는 패턴은 ???.

<div class="pull-right"> 문스코딩 - 2018.01.29 </div>

---


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ANDROID PATTERN](#android-pattern)
	* [안드로이드에서 많이 사용하는 패턴은 ???.](#안드로이드에서-많이-사용하는-패턴은)
		* [01. SOLID](#01-solid)
		* [02. 생성 패턴 (Creational Patterns)](#02-생성-패턴-creational-patterns)
		* [03. 구조 패턴 (Structural Patterns)](#03-구조-패턴-structural-patterns)
		* [04. 행위 패턴 (Behavioral Patterns)](#04-행위-패턴-behavioral-patterns)

<!-- /code_chunk_output -->


**용어정리**
```

```

### 01. SOLID

SOLID - 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙을 소개한 것.

- S(SRP) 단일 책임 원칙 (Single Responsibility Principle)
    - 한 클래스는 하나의 책임만 가진다.
- O(OCP) 개방 - 패쇄 원칙 (Open/Closed Principle)
    - 소프트웨어 요소는 확자에 열려 있으나 변경에 닫혀 이어야 한다.
- L(LSP) 리스코프 치환 원칙 (Liskov Substitution Principle)
    - 프로그램 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.
- I(ISP) 인터페이스 분리 원칙 (Inteface Segregation Principle)
    - 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.
- D(DIP) 의존관계 역전 원칙 (Dependency inversion Principle)
    - 프로그래머는 추상화에 의존해야지, 구체화에 의존하면 안된다.

### 02. 생성 패턴 (Creational Patterns)

- 추상 팩토리 패턴 :: 동일한 주제의 다른 팩토리를 묶어 준다.
- 빌더 패턴 :: 셍성(Construction)과 표기(Respresentation)를 분리해 복잡한 객체를 생성한다.
- 팩토리 메서드 패턴 :: 생성할 객체의 클래스를 국한하지 않고 객체를 생성한다.
- 프로토타입 패턴 :: 기존 객체를 복제함으로써 객체를 생성한다,
- 싱글톤 패턴 :: 한 클래승 한 객체만 존재하도록 한다.

### 03. 구조 패턴 (Structural Patterns)

- 어탭터 패턴 :: 인터페이스가 호환되지 않는 클래스들을 함께 이용할 수 있도록, 타 클래스의 인터페이스를 기존 인터페이스에 덧씌운다.
- 브맂지 패턴 :: 추상화와 구현을 분리해 둘을 각각 따라 발전 시킬 수 있다.
- 합성 패턴 :: 0개 1개 혹은 그 이상의 객체를 묶어 하나의 객체로 이용할 수 있다.
- 데코레이터 패턴 :: 기존 객체의 매서드를 새로운 행동을 추가하거나 오버라이드 할 수 있다.
- 파사드 패턴 :: 많은 분량의 코드에 접근할 수 있는 단순한 인터페이스를 제공한다.
- 플라이 웨이트 패턴 :: 다수의 유사한 객체를 생성 조작하는 비용을 절감할 수 있다.
- 프록시 패턴 :: 접근 조절, 비용 절감, 복잡도 감소를 위해 접근이 힘든 객체에 대한 대역을 제공한다.

### 04. 행위 패턴 (Behavioral Patterns)

- 책임 연쇄 패턴 :: 일련의 처리 객체들에 명령을 대행합니다.
- 커맨드 패턴 :: 작업과 매개변수를 묶어놓은 객체를 생성합니다.
- 해석자 패턴 :: 특정 언어를 구현합니다
- 반복자 패턴 :: 내부 구조를 드러내지 않고 객체의 구성요소들을 순차적으로 접근합니다
- 중개자 패턴 :: 둘 이상의 클래스가 가지고 있는 매서드 들을 알고 있는 유일한 클래스로 클래스들을 느슨하게 연결합니다.
- 메멘토 패턴 :: 객체를 이선 상태로 복구하는 능력을 제공합니다.
- 옵저버 패턴 :: 옵저버 객체들이 이벤트를 볼 수 있게 하는 패턴

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 안드로이드 디자인 패턴](https://brunch.co.kr/@oemilk/12)

[링크2 :: 디자인 패턴 정리 문서](http://wiki.gurubee.net/pages/viewpage.action?pageId=1507372)


Copyright (c) 2017 Copyright Holder All Rights Reserved.
