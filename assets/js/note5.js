"use strict"; 

var filename = 'blank.txt';
var fontsize = '14';
var state = true;

var note5 = {

  blank: function() {
    var save = true;
    if (!state) {
      save = confirm('The file is not saved. Are you sure want to create a new file?');
    }
    if (save) {
      $('.editor').val('');
      state = true;
    }
  },

  open: function() {
    var save = true;
    if (!state) {
      save = confirm('The file is not saved. Are you sure want to open a new file?');
    }
    if (save) {
      $('.file').click();
      $('.file').on('change', function() {
        var filetemp = $('.file')[0].files[0];
        filename = filetemp.name;
        var filereader = new FileReader();
        filereader.onload = function(evt) {
          var filebuffer = evt.target.result;;
          $('.editor').val(filebuffer);
          $('.file').replaceWith($('.file').val('').clone(true));
        };
        filereader.readAsText(filetemp, 'UTF-8');
      });
      state = true;
    }
  },

  download: function() {
    filename = prompt('Download as', filename);
    if (filename) {
      var text = $('.editor').val();
      var textfile = new Blob([text], {type:'text/plain'});
      var downloadlink = document.createElement('a');
      downloadlink.download = filename;
      downloadlink.innerHTML = 'Download File';
      downloadlink.href = window.webkitURL.createObjectURL(textfile);
      downloadlink.click();
    }
  },

  undo: function() {
    formatText('undo');
  },

  redo: function() {
    formatText('redo');
  },

  all: function() {
    $('textarea').select();
  },

  plus: function() {
    fontsize = fontsize + 2;
    $('.editor').css('font-size', fontsize + 'px');
  },

  minus: function() {
    fontsize = fontsize - 2;
    $('.editor').css('font-size', fontsize + 'px');
  },

  normal: function() {
    $('.editor').css('font-size', '14px');
  },

  about: function() {
    alert('note5' + "\n" + 'Pure HTML5 Text Editor' + "\n" + 'Author: fitra@gpl' + "\n" + 'License: GPL Version 3');
  }

};

// trigger file state
$('.editor').keyup(function() {
  state = false;
});
// dropdown menu handler
$('.bar').on('click', function() {
  $('.menu ul').hide();
  $(this).next().css('display', 'block');
  $(this).next().css('z-index', '2');
  $(this).next().on('mouseleave', '', function() {
    $(this).hide();
  });
});
// action handler
$('.action').on('click', function() {
  var action = $(this).data('action');
  $(this).parent().parent().hide();
  note5[action]();
});
// get font size
fontsize = parseInt($('.editor').css('font-size'));