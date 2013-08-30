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
  var t = $('#text-area');
  var w_t = w_win;
  var h_t = h_win;

  // Set wrapper, line number, and text area height x width for the first time
  t.isEditable = true;
  w_t = w_win - 5;
  h_t = h_win - 70;
  t.css('width', w_t);
  t.css('height', h_t);

  // Set wrapper, line number, and text area height x width when window resized
  win.resize(function() {
    w_win = win.width();
    h_win = win.height();
    w_t = w_win - 5;
    h_t = h_win - 70;
    t.css('width', w_t);
    t.css('height', h_t);
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

});
