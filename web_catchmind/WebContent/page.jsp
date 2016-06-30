<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div>
    <span>Subject:</span>
    <input id="subject" type="text" />
    <br />
    <span>Content:</span>
    <input id="content" type="text" />
  </div>
  <div>
    <input type="submit" value="Send message" onclick="send()" />
  </div>
  <div id="messages"></div>
  <script type="text/javascript">
  
  	var path = location.pathname.split("/");
	var url = location.host;
	if( path.length > 1)
		url += '/'+path[1];
  
    var webSocket = 
      new WebSocket("ws://"+url+"/websocket");

    webSocket.onerror = function(event) {
      onError(event);
    };

    webSocket.onopen = function(event) {
      onOpen(event);
    };

    webSocket.onmessage = function(event) {
      onMessage(event);
    };

    function onMessage(event) {
      var json = JSON.parse(event.data);
      document.getElementById('messages').innerHTML 
        = '<br />Received server response!'
        + '<br />Subject: ' + json.subject
        + '<br />Content: ' + json.content;
    }

    function onOpen(event) {
      alert('Connection established');
    }

    function onError(event) {
      alert('Error');
    }

    function send() {
      var subject = document.getElementById('subject').value;
      var content = document.getElementById('content').value;
      var json = { 
        "subject" : subject,
        "content" : content
      };
      
      
      webSocket.send(JSON.stringify(json));
      return false;
    }
  </script>

</body>
</html>