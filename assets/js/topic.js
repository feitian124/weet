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

  $('.topic .header .delete').click(function(){
    if(confirm('确认删除该话题吗?')){
      var topic_id = $('.topic .header .delete').data('id');
      console.log('删除吧:' + topic_id);
      $.ajax({
        url: '/topic/'+topic_id,
        type: 'DELETE',
        success: function(data,status){
          console.log("success, Data: " + data + ", Status: " + status);
          location.href = "/topic";
        },
        error: function(req, status) {
          console.log("error, req: " + data + ", Status: " + status);
          alert('出错了~~');
        }
      });
    } else {
      console.log('不删除');
    }
  });
});
