// nl2br function
String.prototype.nl2br = function() {
  return this.replace(/\n/g, "<br>");
}

// Load file function
var loadFile = function() {
  var fileTemp = $('#inputFile')[0].files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(evt) {
    var fileBuffer = evt.target.result;;
    $('#text-area').val(fileBuffer);
  };
  fileReader.readAsText(fileTemp, 'UTF-8');
}

// Save file function
var saveFile = function() {
  var filename = $('#newFileName').val();
  var text = $('#text-area').val();
  var BB = Blob;
	saveAs(
    new BB(
      [text],
      {type: "text/plain;charset=" + document.characterSet}
		),
    (filename) + ".txt"
	);
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
  var t = $('#text-area');
  var w_t = w_win;
  var h_t = h_win;
  
  // Line number properties
  var l = $('#line-number');
  var w_l = 45;
  var a_l = false;
  
  // Set #text-area height and width
  t.isEditable = true;
  w_t = w_win - 5;
  h_t = h_win - 70;
  t.css('width', w_t);
  t.css('height', h_t);
  l.css('height', h_t);

  win.resize(function() {
    w_win = win.width();
    h_win = win.height();
    if (a_l) {
      w_t = w_win - w_l - 5;
    } else {
      w_t = w_win - 5;
    }
    h_t = h_win - 70;
    t.css('width', w_t);
    t.css('height', h_t);
    l.css('height', h_t);
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
  $('#text-area').bind('input keypress propertychange', function() {
    var c_l = $('#text-area').val().split('\n');      
    $('#line-number').html('');
    for (i = 0; i < c_l.length; i++) {
      $('#line-number').html($('#line-number').html() + (i+1) + '<br/>');
    }
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $('#line-number').animate({
        scrollTop: $('#line-number').height()
      });
    }
  });
  $('#text-area').bind('scroll', function() {
    $('#line-number').animate({
      scrollTop: $(this).scrollTop()
    });
  });

});
