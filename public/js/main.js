var socket = io.connect();
//socket.on('news', function (data) {
 //   console.log(data);
 // socket.emit('my other event', { my: 'data' });
//});
var textarea = document.querySelector("#textarea");
textarea.addEventListener('keyup', function(event) {
	//socket.emit('senddata', this.value);
})

var response = document.querySelector("#chat"); 
socket.on('getdata', function(data){
	response.innerHTML+="<p>"+data+"</p>";
})

var bottom = document.querySelector('#bottom');
bottom.addEventListener('click',function(){
	socket.emit('senddata',textarea.value);
});