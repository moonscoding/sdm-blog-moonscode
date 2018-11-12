<div class="pull-right"> 업데이트 :: 2018.11.12 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[@Cacheable](#cacheable)
	-	[ex](#ex)
	-	[key](#key)
	-	[custom](#custom)
	-	[confition](#confition)
-	[@CachePut](#cacheput)
-	[@CacheEvict](#cacheevict)
-	[@Caching](#caching)

<!-- /code_chunk_output -->

### @Cacheable

-	실제함수를 실행시키지 않고 캐시된 값을 반환합니다.

#### ex

```java
@Cacheable("user")
public User findOne(Strign email) {

}
```

-	email정보를 가지고 User를 캐싱하는 함수

#### key

-	cache는 키밸류 저장소이므로 메서드를 호출할때 해당키로 변환되어야 합니다.
-	cache 추상화는 다음 알고리즘에 기반을 둔 KeyGeneator를 사용
	-	파라미터가 없으면 0 반환
	-	파라미터가 하나만 있으면 해당 인스턴스 반환
	-	파라미터가 둘 이상 있으면 모든 파라미터의 해시를 계산한 키 반환

#### custom

```java
@Cacheable(value="books", key="#isbn")
public Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)

@Cacheable(value="books", key="#isbn.rawNumber")
public Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)

@Cacheable(value="books", key="T(someType).hash(#isbn)")
public Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)
```

#### confition

-	조건부캐싱
	-	if
	-	unless

```java
@Cacheable(value="books", condition="#name.length < 32")
public Book findBook(String name)
```

### @CachePut

-	메소드 실행에 영향을 주지않고 캐시를 갱신해야 하는 경우
-	메소드는 항상 실행하고 그 결과를 @CachePut 옵션에 따라 캐시에 보관

### @CacheEvict

-	캐시추상화로 캐시 스토어의 생성뿐 아니라 제거도 할 수 있음
-	캐시에서 오래되거나 사용하지 않는 데이터를 제거하는데 유용

```java
@CacheEvict(value="books", allEntries=true)
public void loadBooks(InputStream batch)
```

-	allEntries
	-	한 지역의 전체 캐시르 모두 지워야 할때 다음 옵션을 사용

### @Caching

-	조건이나 키 표현식이 캐시에 따라 다른 경우
-	@Caching에서 중첩된 @Cacheable, @CachePut, @CacheEvict 같은 메소드에 다수 사용 가능

```java
@Caching(evict={ @CacheEvict("primary"), @CacheEvict(value="secondary", key="#p0") })
public Book importBooks(String deposit, Date date)
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
