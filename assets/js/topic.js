$(document).ready(function(){
  var element = document.getElementById("simpleMDE");
  var value = $("#origin_content").val();

  if(element) {
    var simplemde = new SimpleMDE({
      element: element,
      spellChecker: false,
      autoDownloadFontAwesome: false,
      initialValue: value
    });
  }
});
