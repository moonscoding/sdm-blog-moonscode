<div class="pull-right"> 업데이트 :: 2018.11.12 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[@Secured](#secured)
-	[dependency](#dependency)
-	[manuel](#manuel)

<!-- /code_chunk_output -->

### @Secured

-	security-context.xml -> @Secured 어노테이션을 사용하면 좀 더 편하고 지관적인 권한 부여 가능
-	권한이 필요한 부분에 선언하는데 class, method 단위까지 지정할 수 있음

### dependency

> pom.xml

```xml
<dependency>
    <groupid>cglib</groupid>
    <artifactid>cglib</artifactid>
    <version>${cglib.version}</version>
</dependency>
```

> servlet-context.xml

```xml
<!-- @Secured 어노테이션 설정 -->
<security:global-method-security
        pre-post-annotations="enabled"
        secured-annotations="enabled"
        proxy-target-class="true"
        access-decision-manager-ref="accessDecisionManager"/>

<!-- 기본 rolePrefix를 제거하기 위한 설정 (기본적으로 권한 이름에 "ROLE_"이 붙는 것을 삭제) -->
<bean id="accessDecisionManager" class="org.springframework.security.access.vote.AffirmativeBased">
    <constructor-arg>
        <list>
            <bean class="org.springframework.security.access.vote.RoleVoter">
                <property name="rolePrefix" value=""></property>
            </bean>
            <bean class="org.springframework.security.access.vote.AuthenticatedVoter"/>
        </list>
    </constructor-arg>
    <property name="allowIfAllAbstainDecisions" value="false"></property>
</bean>
```

-	AffirmativeBased 클래스에 RoleVoter 와 AuthenticatedVoter 2개를 설정한 것

### manuel

> 접근권한 1개

```java
@Secured("ROLE_ADMIN")
public String accessOnlyAdmin() {

}
```

> 접근권한 여러개

```java
@Secured({"ROLE_ADMIN", "ROLE_USER"})
public String accessAll() {

}
```

-	만약 접근권한이 없는 사용자가 접근하게 되면 403 ERROR 발생.

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
