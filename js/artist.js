var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");
// todo-list


function loadTodos() {
  $.ajax({
    url: 'https://exfintoraya.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        let newHTML = `<li><input type="checkbox" name="todo" value="0"><span> ${data[i].description} </span></li>`

        $("#todo-list").append(newHTML)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });//aaa
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'http://localhost:3000/artist.js',
      url: 'https://exfintoraya.herokuapp.com/artist',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        // agregar código aqui para poner los datos del todolist en el el html
        //ASD
        let newHTML = `<li><input type="text" name="todo" value="0"><span> ${data.description} </span></li>`

        $("#artist-list").append(newHTML)

      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

$('#create-playlist').on('click', function(){
  window.location = './playlist.html'
})

$("#logout-button").on("click", function(){
  window.location = "./index.html"
})
