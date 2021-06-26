$(document).ready(function(){

    let options = {
      startAngle: -1.55,
      size: 100,
      value: 0.85,
      fill: {gradient: ['#a445b2', '#fa4299']}
    }
  
    const div = $('.circle-text');
  
    div.append('<p class="envelope" style="left:10px;">Submetidos</p>');
  
    $(".circle .bar").circleProgress(options).on('circle-animation-progress',
    function(event, progress, stepValue){
      $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
    });
    $(".js .bar").circleProgress({
      value: 0.10
    });
  
  });
  
  