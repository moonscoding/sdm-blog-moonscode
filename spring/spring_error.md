> 스프링 프로젝트 생성후 최초에러

-	자바버전 1.8 설정문제

java.lang.IllegalStateException: LifecycleProcessor not initialized - call 'refresh' before invoking lifecycle methods via the context: Root WebApplicationContext: startup date [Thu Nov 15 15:19:40 KST 2018]; root of context hierarchy

> ?

org.springframework.beans.factory.BeanDefinitionStoreException: Failed to read candidate component class: file [C:\supermoon\sample\sdm-spring-mvc-flyway\target\spring\WEB-INF\classes\sdm\domain\Member.class]; nested exception is org.springframework.core.NestedIOException: ASM ClassReader failed to parse class file - probably due to a new Java class file version that isn't supported yet: file [C:\supermoon\sample\sdm-spring-mvc-flyway\target\spring\WEB-INF\classes\sdm\domain\Member.class]; nested exception is java.lang.IllegalArgumentException

> ?

org.springframework.web.client.ResourceAccessException: I/O error on POST request for "https://hooks.slack.com/services/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": sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target; nested exception is javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
