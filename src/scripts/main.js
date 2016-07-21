$(function(){
  $(".watch-video").click(function(){
    $(".overlay, .video").fadeIn();
  });

  $(".close-overlay").click(function(){
    $(".overlay, .overlay > div").fadeOut();
  });
});