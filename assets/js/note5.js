$(function() {

  var win = $(window);
  var w_win = win.width();
  var h_win = win.height();

  // Set #text-area height and width
  var t = $('#text-area');
  var w_t = w_win - 5;
  var h_t = h_win - 70;
  t.css('width', w_t);
  t.css('height', h_t);

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
  $('#loadFile').click(function() {
    loadFile();
  });

});

// Load file function
var loadFile = function() {
  var fileTemp = $('#inputFile')[0].files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(evt) {
    var fileBuffer = evt.target.result;
    $('#text-area').val(fileBuffer);
  };
  fileReader.readAsText(fileTemp, 'UTF-8');
}
