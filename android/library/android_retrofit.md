# Android Lib를 통한 간단 코드 적용기

## Retrofit을 통한 간결한 통신 구축

<div class="pull-right"> 문스코딩 - 2018.02.08 </div>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [Retrofit을 통한 간결한 통신 구축](#retrofit을-통한-간결한-통신-구축)
		* [01.](#01)
		* [02.](#02)
		* [동기적으로 코드 받기](#동기적으로-코드-받기)
		* [레시피 로스팅](#레시피-로스팅)
		* [URL 바꾸기](#url-바꾸기)

<!-- /code_chunk_output -->

---

**용어정리**
```

```

### 01.

네트워킹에 모두 Async Task를 사용하는 분이라면 다음과 같은 장점이 있는 Retrofit을 권장합니다.

- 안전한 형변환
- 인증 기능 내부 지원
- Gson을 사용할 경우 POJO로 JSON 파싱

Gson에 대해 학습하지 않았다면 먼저 학습하세요.
Gson 팩토리에 데이터를 넘기겠습니다. Retrofit 은 RXjava로 지원합니다.


### 02.

Retrofit은 동기적으로나 비동기적으로 HTTP 요청을 실행 할 수 있게 해줍니다.

```java
public interface TacoApi {
    // Request method and URL specified in the annotation
    // Callback for the parsed response is the last parameter

    @GET("random/")
    Call<Taco> randomTaco(@Query("full-taco") boolean full);

    @GET("contributions/")
    Call<List<Contributor>> getContributors();

    @GET("contributions/{name}")
    Call<Contributor> getContributors(@Path("name") String username));

    @POST("recipe/new")
    Call<Recipe> createRecipe(@Body Recipe recipe);
}
```


### 동기적으로 코드 받기

동기적으로 받는 코드는 다음과 같습니다.

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("http://taco-randomizer.herokuapp.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build();

// Create an instance of our TacoApi interface.
TacoApi tacoApi = retrofit.create(TacoApi.class);

// Create a call instance for a random taco
Call<Taco> call = tacoApi.randomTaco(true);

// Fetch a random taco
// Do this off the main thread
Taco taco = call.execute().body();
```

### 레시피 로스팅

```java
Recipe recipe = new Recipe();
Call<Recipe> call = tacoApi.createRecipe(recipe);
call.enqueue(new Callback<Recipe>() {
    @Override
    public void onResponse(Call<Recipe> call, Response<Recipe> response) {

    }

    @Override
    public void onFailure(Call<Recipe> call, Throwable t) {

    })
```
call.enqueue를 사용했습니다.
enqueue는 비동기적으로 요청을 만들고 응답과 실패, 두 가지 콜백을 주는 일입니다.
이런 조건을 가지고 원하는 것은 무엇이든 할 수 가 있습니다.

### URL 바꾸기

새로운 버전을 작업하는 경우 전체 URL을 넘기고 해당 메서드를 애너테이트할 수 있습니다.

```java
//Change the base url
@POST("http://taco-randomizer.herokuapp.com/v2/taco")
private Call<Taco> getFromNewAPI();

//Add headers
@Headers({"User-Agent: tacobot"})
@GET("contributions/")
private Call<List<Contributor>> getContributors();
```

이 방식으로 URL을 건너뛸 수 있고. 필요하면 헤더도 추가할 수 있습니다.
랜덤 타코를 얻으려면 아래 같은 코드를 사용합니다.

```java
private void getNextTaco() {
    ...
    loadTacoDescription();
}

private void loadTacoDescription() {
    Call<Taco> call = tacoApi.randomTaco(false);
    call.enqueue(new Callback<Taco>() {
        @Override
        public void onResponse(Call<Taco> call, Response<Taco> response) {
        //Set description from response
        Taco taco = response.body;
        //TODO: implement
        saveTaco(taco);
    }

    @Override
    public void onFailure(Call<Taco> call, Throwable t) {
        //Show error
    }
}
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
