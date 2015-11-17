$(document).ready(function(){
  var element = document.getElementsByTagName("textarea")[0];
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
