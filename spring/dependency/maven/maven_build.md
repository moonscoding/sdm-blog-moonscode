<div class="pull-right"> 업데이트 :: 2018.11.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[maven build](#maven-build)
-	[code](#code)

<!-- /code_chunk_output -->

### maven build

### pom.xml

```xml
<project>

    <profiles>
        <profile>
            <id>local</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <environment>local</environment>
            </properties>
        </profile>
        <profile>
            <id>real</id>
            <properties>
                <environment>real</environment>
            </properties>
        </profile>          
        <profile>
            <id>dev</id>
            <properties>
                <environment>dev</environment>
            </properties>
        </profile>
    </profiles>

  <build>
        <resources>
            <resource>
                <directory>src/main/resources/${environment}</directory>
            </resource>
        </resources>
    </build>

</project>
```

### Link

http://dreambringer.tistory.com/15

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
