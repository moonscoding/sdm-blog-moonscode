1. 자바 버전 확인

java -version

	톰캣 8.0은 Java SE 7 이후 버전을 필요로 한다.

2. 톰캣 다운로드

	http://tomcat.apache.org/download-80.cgi 페이지에 접근한 다음

	Core : tar.gz 버전을 다운로드 한 후, 파일을 압축 해제(더블클릭) 한다.

3. 파일 이동

터미널에 들어간 이후 아래와 같이 입력하여 배포 경로에 파일을 이동 시켜준다.

	sudo mkdir -p /usr/local

	sudo mv ~/Downloads/apache-tomcat-8.0.8 /usr/local

4. 다음 최신 버전을 손쉽게 배포하기 위해 아래와 같이 링크를 걸어준다.

	sudo rm -f /Library/Tomcat

	sudo ln -s /usr/local/apache-tomcat-8.0.8 /Library/Tomcat

5. 톰캣폴더의 접근권한을 부여한다.

	sudo chown -R <로그인_아이디> /Library/Tomcat

6. 쉘 실행 권한 부여

	sudo chmod +x /Library/Tomcat/bin/\*.sh

7. 톰캣 시작

	/Library/Tomcat/bin/startup.sh

8. 톰캣 종료

	/Library/Tomcat/bin/shutdown.sh
