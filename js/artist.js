var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var s = document.querySelectorAll("input[type=checkbox]");
// Artists-list


function loadArtists() {
  $.ajax({
    url: 'https://exfintoraya.herokuapp.com/artists',
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
        // addArtist(data[i]._id, data[i].description, data[i].completed)
        let newHTML = `<li><input  name="artist" value="0"><span> ${data[i].description} </span></li>`

        $("#artist-list").append(newHTML)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });//aaa
}

loadArtists()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newartist]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'http://localhost:3000/artist',
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
        // agregar código aqui para poner los datos del Artistslist en el el html
        //ASD
        let newHTML = `<li><input type="text" name="artist" value="0"><span> ${data.description} </span></li>`

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
