$(function() {

  var loadFile = function() {
    var fileTemp = $('#text-open')[0].files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(evt) {
      var fileBuffer = evt.target.result;
      $('#text-content').val(fileBuffer);
    };
    fileReader.readAsText(fileTemp, 'UTF-8');
  }

  var saveFile = function() {
    var textBuffer = $('#text-content').val();
    var textFile = new Blob([textBuffer], {type:'text/plain'});
    var fileName = $('#text-filename').val();

    var fileDownload = document.createElement("a");
    fileDownload.download = fileName;
    fileDownload.innerHTML = "Download File";
    fileDownload.href = window.webkitURL.createObjectURL(textFile);
    fileDownload.click();
  }

  $('#open-file').click(function() {
    $('#text-open').click();
    $('#text-open').change(function() {
      $('#text-file').val($(this).val());
      loadFile();
    });
  });

  $('#save-file').click(function() {
    saveFile();
  });

});
