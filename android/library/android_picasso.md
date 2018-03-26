# Android Lib를 통한 간단 코드 적용기

## Anrdroid 이미지를 다루는 간편한 방법

<div class="pull-right"> 문스코딩 - 2018.02.05 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [Anrdroid 이미지를 다루는 간편한 방법](#anrdroid-이미지를-다루는-간편한-방법)
		* [01. Picasso](#01-picasso)
		* [02. Picasso의 기능들](#02-picasso의-기능들)
		* [03. 로컬 저장소 이용](#03-로컬-저장소-이용)

<!-- /code_chunk_output -->


**용어정리**
```

```

### 01. Picasso

**code1**

```java
private Bitmap DownloadImage(String url)
{
    Bitmap bitmap = null;
    InputStream in = null;

    try
    {
        in = OpenHttpGETConnection(url);
        bitmap = BitmapFactory.decodeStream(in); in.close();
    }
    catch (Exception e)
    {
        Log.d("DownloadImage", e.getLocalizedMessage());
    }

    return bitmap;
}
```

**code2**

```java
Picasso.with(context)
        .load("http://placekitten.com/200/300")
        .into(imageView);
```

### 02. Picasso의 기능들

```java
.placeholder(R.mipmap.loading) //can be a resource or a drawable
.error(R.drawable.sad_taco) //fallback image if error
.fit() //reduce the image size to the dimensions of imageView
.resize(imgWidth, imgHeight) //resizes the image in pixels
.centerCrop() //or .centerInside()
.rotate(90f) //or rotate(degrees, pivotX, pivotY)
.noFade() //don't fade all fancy-like
```

- 피카소가 그림을 실제 다운로드 해주므로 기다리는 봉안 보여줄 placeholder 이미지를 설정합니다.
    - 로컬앱의 그림을 보여줄 수도 있습니다.
    - 만약 에러가 발생하면 기본 이미지를 보여줄 수도 있습니다.
- 이미지 뷰의 dimension이 맞게 자동으로 이미지를 맞출수 있습니다.
    - 직접 리사이즈할 픽셀을 너ㅎ어서 리사이즈 할 수도 있습니다.
- 중앙에 맞게 자르거나 중앙에 맞게 넣거나 센터에 맞춰 회전하거나 중앙이 아닌 지점을 기준으로 회전하는 작업을 할 수 있습니다.
- Medium.com 에서 보던 효과처럼 이미지를 자동으로 흐릿하게 해줍니다.
    - noFade 옵션으로 이 기능을 제거 할 수 있습니다.

### 03. 로컬 저장소 이용

```java
Picasso.with(context).load(R.drawable.salsa).into(imageView1);
Picasso.with(context).load("file:///asset/salsa.png").into(imageView2);
Picasso.with(context).load(new File(...)).into(imageView3);
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
