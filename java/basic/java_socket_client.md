# Java
## Socket Client
<div class="pull-right">  업데이트 :: 2018.07.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Java](#java)
	* [Socket Client](#socket-client)
		* [01. Java Socket Client](#01-java-socket-client)
		* [02. Sample](#02-sample)

<!-- /code_chunk_output -->

### 01. Java Socket Client

Java Socket Client 예제입니다.

NIO Blocking Socket입니다.

- 동작마다 스레드 처리가 되있습니다.
- Queue를 이용해서 데이터 처리합니다.
- 싱글톤 처리가 되있습니다.

### 02. Sample

```java
public class MySocket {

    /* Field */
    private static MySocket instance;
    public SocketChannel socketChannel;
    public Charset charset = Charset.forName("UTF-8");
    private Queue<String> postQueue = new LinkedList<>(); // 전송할 데이터를 담아두는 Queue
    private boolean busy = false; // Queue를 사용하고 있는지

    /* Constructor */
    public MySocket() throws RuntimeException {
        // == singleton ==
        if(instance != null) return;
        instance = this;
        startSocket();
    }

    /* GetInstance */
    public static MySocket getInstance() {
        return instance;
    }

    /* StartSocket */
    public void startSocket() throws RuntimeException {
        Thread thread = new Thread() {
            @Override
            public void run() {
                try {
                    socketChannel = SocketChannel.open();

                    // ### 블로킹방식 (명시적) ###
                    socketChannel.configureBlocking(true);

                    // ### connect(new InetSocketAddress) ###
                    socketChannel.connect(new InetSocketAddress(Define.HOST , Define.PORT));

                } catch (IOException err) {
                    // TODO 오류 - 서버
                    err.printStackTrace();
                }
                receive();
            }
        };
        thread.start();
    }

    /* StopSocket */
    public void stopSocket() {
        try {
            if(socketChannel != null && socketChannel.isOpen()) {
                socketChannel.close();
            }
        } catch (IOException e) {
            // TODO 오류 - 서버
            e.printStackTrace();
        }
    }

    /* Receive */
    public void receive() {
        while(true) {
            try {

                // == read ==
                ByteBuffer byteBuffer = ByteBuffer.allocate(Define.BUFFER_SIZE); // 1024
                int byteCount = socketChannel.read(byteBuffer);
                if(byteCount == -1) throw new IOException();

                byteBuffer.flip();
                String response = charset.decode(byteBuffer).toString();

                // == route ==
                route(response);
            } catch (IOException e) {
                // TODO 오류 - 서버
                e.printStackTrace();
                break;
            }
        }
    }

    /* Route */
    private void route ( String response ) {
        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject token = (JSONObject) jsonParser.parse(response);
            String type = token.get(Define.DATA_TYPE).toString();

            System.out.println(type);

            switch (type) {
                // TODO 분기
            }
        } catch (ParseException e) {
            // TODO 오류 - 문자열 OR 버퍼크기
        }
    }

    /* Send */
    public void send( String request ) {

        postQueue.offer(request);
        if(!busy) {
            busy = true;
            post();
        }
    }

    /* Post */
    private void post() {
        String request = postQueue.poll();
        Thread thread = new Thread() {
            @Override
            public void run() {
                try {
                    try {
                        // == write ==
                        System.out.println(request);
                        ByteBuffer byteBuffer = charset.encode( request );
                        socketChannel.write(byteBuffer);

                        // == queue ==
                        if(postQueue.size() > 0) {
                            post();
                        } else {
                            busy = false;
                        }
                    } catch (NotYetConnectedException errA) {
                        errA.printStackTrace();
                    }
                } catch (IOException errB) {
                    // TODO 오류 - 서버
                    errB.printStackTrace();
                }
            }
        };
        thread.start();
    }
}
```



---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
