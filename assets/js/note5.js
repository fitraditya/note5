// Load file function
var loadFile = function() {
  var fileTemp = $('#inputFile')[0].files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(evt) {
    var fileBuffer = evt.target.result;;
    $('#text-area').val(fileBuffer);
    $('#text-area').change();
    if ($('#text-area')[0].scrollHeight > $('#text-area').height()) {
      $('#text-area').css('height', 'auto');
      $('#text-area').height($('#text-area')[0].scrollHeight);
    }
  };
  fileReader.readAsText(fileTemp, 'UTF-8');
}

// Save file function
var saveFile = function() {
  var filename = $('#newFileName').val();
  var text = $('#text-area').val();
  var textfile = new Blob([text], {type:'text/plain'});
  var downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.innerHTML = 'Download File';
  downloadLink.href = window.webkitURL.createObjectURL(textfile);
  downloadLink.click();
}

// Undo / Redo function
var formatText = function(act, sel) {
  document.execCommand(act, false, sel);
}

$(function() {

  // Window properties
  var win = $(window);
  var w_win = win.width();
  var h_win = win.height();

  // Text area properties
  var w = $('#wrapper');
  var t = $('#text-area');
  var w_w = w_win;
  var h_w = h_win;
  var w_t = w_win;
  var h_t = h_win;

  // Line number properties
  var l = $('#line-number');
  var w_l = 65;
  var a_l = false;

  // Set wrapper, line number, and text area height x width for the first time
  t.isEditable = true;
  w_t = w_win - 5;
  h_t = h_win - 70;
  w.css('height', h_t);
  t.css('width', w_t);
  t.css('height', h_t);
  l.css('height', h_t);

  // Set wrapper, line number, and text area height x width when window resized
  win.resize(function() {
    w_win = win.width();
    h_win = win.height();
    if (a_l) {
      w_t = w_win - w_l - 5;
    } else {
      w_t = w_win - 5;
    }
    h_t = h_win - 70;
    w.css('height', h_t);
    t.css('width', w_t);
  });

  // Customize input file
  $('#openFile').click(function() {
    $('#inputFile').click();
    $('#inputFile').change(function() {
      $('#inputFileName').val($(this).val());
    });
  });

  // Load file action
  $('#loadFile').on('click', '', function() {
    loadFile();
  });

  // Save file action
  $('#saveFile').on('click', '', function() {
    saveFile();
  });

  // Undo / Redo action
  $('#undoAction').on('click', '', function() {
    formatText('undo');
  });
  $('#redoAction').on('click', '', function() {
    formatText('redo');
  });

  // Line Number action
  /* Adjust textarea height */
  $('#wrapper').on('keyup', 'textarea', function() {
    if (this.scrollHeight > h_t) {
      $(this).css('height', 'auto');
      $(this).height(this.scrollHeight);
    }
  });
  $('#wrapper').find('textarea').keyup();
  /* Line numbering */
  $('#text-area').bind('input change keypress propertychange', function() {
    var c_l = $('#text-area').val().split('\n');
    $('#line-number').html('');
    for (i = 0; i < c_l.length; i++) {
      $('#line-number').html($('#line-number').html() + (i+1) + '<br/>');
    }
    if ($('#line-number')[0].scrollHeight > h_t) {
      $('#line-number').css('height', 'auto');
      $('#line-number').height($('#line-number')[0].scrollHeight);
    }
  });
  /* Toggle line number */
  $('#lineNumberAction').on('click', '', function() {
    if (a_l) {
      w_t = w_win - 5;
      $('#text-area').css('width', w_t);
      $("#line-number").hide();
      a_l = false;
    } else {
      w_t = w_win - w_l - 5;
      $('#text-area').css('width', w_t);
      $("#line-number").show();
      a_l = true;
    }
  });

});
