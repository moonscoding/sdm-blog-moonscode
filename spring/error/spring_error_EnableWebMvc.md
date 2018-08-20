
- @EnableWebMvc 선언시발생

```
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'requestMappingHandlerAdapter' defined in org.springframework.web.servlet.config.annotation.DelegatingWebMvcConfiguration: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter]: Factory method 'requestMappingHandlerAdapter' threw exception; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'mvcValidator' defined in org.springframework.web.servlet.config.annotation.DelegatingWebMvcConfiguration: Invocation of init method failed; nested exception is java.lang.NoClassDefFoundError: javax/xml/bind/ValidationException
```

> 원인불명
