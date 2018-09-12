

> Java 버전확인

```
/usr/libexec/java_home -V
```

```
Matching Java Virtual Machines (4):
    10.0.1, x86_64:	"Java SE 10.0.1"	/Library/Java/JavaVirtualMachines/jdk-10.0.1.jdk/Contents/Home
    1.8.0_181, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home
    1.6.0_65-b14-468, x86_64:	"Java SE 6"	/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
    1.6.0_65-b14-468, i386:	"Java SE 6"	/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
```

> Java 버전교체

```
export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_181`
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
```

> Java 버전확인

```
java -version
```
