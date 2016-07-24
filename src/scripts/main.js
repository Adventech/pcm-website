$(function(){
  $(".watch-video").click(function(){
    $(".overlay, .video").fadeIn();
  });

  $(".close-overlay").click(function(){
    $(".overlay, .overlay > div").fadeOut();
  });

  $("li.register > a").click(function(){
    $(".overlay, .register-form").fadeIn();
    return false;
  });
});