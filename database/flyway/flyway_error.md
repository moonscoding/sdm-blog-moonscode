> Schema 이미 있을 때

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Invocation of init method failed; nested exception is org.flywaydb.core.api.FlywayException: Found non-empty schema(s) `sdm` without schema history table! Use baseline() or set baselineOnMigrate to true to initialize the schema history table.

> DBdriver에 Database 생략했을 때

Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Invocation of init method failed; nested exception is org.flywaydb.core.internal.exception.FlywaySqlException: Unable to create schema `null`

> Versioned Migration 문제

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Invocation of init method failed; nested exception is org.flywaydb.core.api.FlywayException: Validate failed: Detected failed migration to version 1 (manage table)

> Repeatable Migration

-	Repeatable Migration 스크립트에 문제발생시, 해당 실패로그가 flyway_schema_history에서 없어지지 않으면 발생
	-	`개발단계`라면 flyway_schema_history의 실패로그를 삭제하고 재시작
	-	`운영단계`라면 절대 스크립트를 편집하지 마세요.

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Invocation of init method failed; nested exception is org.flywaydb.core.api.FlywayException: Validate failed: Detected failed repeatable migration: \<`문제가있는SQL파일이름`\>

> temp_name

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'globalFlyway' defined in com.nexon.dr.config.FlywayConfig: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.flywaydb.core.Flyway]: Factory method 'globalFlyway' threw exception; nested exception is org.flywaydb.core.api.FlywayException: Found non-empty schema(s) `dr_global` without schema history table! Use baseline() or set baselineOnMigrate to true to initialize the schema history table.

> temp_name

org.flywaydb.core.api.FlywayException: Found non-empty schema(s) `dr_log_c` without schema history table! Use baseline() or set baselineOnMigrate to true to initialize the schema history table.
