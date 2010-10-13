var words = {};
var word_counter = 0;
var initial_words = {'Warble': '[Knowledge] in 140 characters or less'};
var linkify = /[\[\]]/g;

function check(a_tag) {
  //TODO Check if word exists if so put it at top, else put it up.
  return false;
}
function recount(e) {
  var length = document.getElementById('data').value.length;
  $('#remaining')
    .html(length)
    .toggleClass('warning', 130 < length && length <= 140)
    .toggleClass('error', 140 < length);
}

function replace_brace(match) {
  if(match == '['){
    return '[<a href="#" onclick="javascript:check(this);">';
  }
  return '</a>]';
}

function parse_links(definition) {
  return definition.replace(linkify, replace_brace);
}

function add_closer(word_id, word) {
  var close_button = document.createElement('div');
  $('#'+word_id+' hr').after(close_button);

  //Span to float it to the right
  var span = document.createElement('span');
  $('#'+word_id+' div')
    .append(span);
  
  var a_tag = document.createElement('a');
  $(span)
    .addClass('tool')
    .append('[').append(a_tag).append(']');
  
  $(a_tag)
    .attr('href', '#')
    .text('X')
    .click(function(e) {
      //Stop the edition process
      e.stopPropagation();
      remove(word_id, word);
  });
}

function remove(word_id, word) {
  words[word] = undefined;
  $('#' + word_id).remove();
  $.post('delete_warble', word, function(data){
    //TODO Check RC
  }, 'json');
}

function load_word(word, definition) {
  if(words[word] == undefined) {
    var word_id = 'word_' + word_counter;
    word_counter++;
    var new_concept = $('.sample').clone()
      .removeClass('sample')
      .insertAfter('.sample')
      .attr('id', word_id)
      .mouseover(function() { $('#'+word_id).addClass('highlight'); })
      .mouseout(function() { $('#'+word_id).removeClass('highlight'); })
      .click(function() { edit($('#'+word_id)); })
      .children('dt').text(word).end(); //This puts the word

    add_closer(word_id, word);

    var dd = new_concept.children('dd');
  } else {
    dd = words[word];
  }
  dd.html(parse_links(definition));
  words[word] = dd;
}

function edit(dd) {
  var data = document.getElementById('data');
  var word = dd.children('dt').text();
  var definition = dd.children('dd').text();
  data.value = word + ':' + definition;
  recount();
}

function add_definition(e) {
  if(e.keyCode == 13) {
    e.preventDefault();
    var text = document.getElementById('data').value;
    var i = text.search(':');
    if(i > 0 && text.length - i > 1) {
      var word = text.substr(0, i);
      var definition = text.substr( i+1 );
      definition = jQuery.trim(definition);

      load_word(word, definition);

      var send_data = {};
      send_data[word] = definition;
      $.post('warble', send_data, function(data) {
        //TODO check RC.
      },'json');

      document.getElementById('data').value = '';
    }
  }
}

$(document).ready(function() {
  $('#data')
    .keyup(recount)
    .keydown(add_definition)
    .focus();
  recount();

  for(var w in initial_words) {
    load_word(w, initial_words[w]);
  }
});
