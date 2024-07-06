const addUserBlock = document.querySelector('.addUser');
const usernameForm = document.querySelector('#addUsername');
const chatPage = document.querySelector('.chatRoom');

var username = null;
var stompClient = null;

var colors = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];

function connect(event) {
  username = document.querySelector('#username').value.trim();
  if (username) {
    addUserBlock.classList.add('hidden');
    chatPage.classList.remove('hidden');

    var socket = new SockJs('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
  }
  event.preventDefault();
}

function onConnected() {
  // Subscribe to the Public Topic
  stompClient.subscribe('/topic/public', onMessageRecieved);

  // Send username to the server
  stompClient.send('/app/chat.addUser', {}, JSON.stringify({ sender: username, type: JOIN }));
}

usernameForm.addEventListener('submit', connect, true);
