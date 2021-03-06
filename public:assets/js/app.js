$.getJSON('/articles', function(data) {

  for (var i = 0; i<data.length; i++){

    $('#articles ul').append('<li data-id="' + data[i]._id + '">' +
    '<div class="collapsible-header"><i class="material-icons">label</i>'+data[i].title +
    '</br>' + 
    '<p>' + data[i].link + '</p>' +
    '</div>'+'</li>');
  }
});

$(document).on('click', 'li', function(){

  $('#notes').empty();

  var thisId = $(this).attr('data-id');


  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })

    .done(function( data ) {
      console.log(data);
      // the title of the article
      $('#notes').append('<h2>' + data.title + '</h2>'); 
      // an input to enter a new title
      $('#notes').append('<input id="titleinput" name="title" >'); 
      // a textarea to add a new note body
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 
      // a button to submit a new note, with the id of the article saved to it
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();
    });

  $('#titleinput').val("");
  $('#bodyinput').val("");
});