$('#myCarousel').carousel({
    interval: 4000
});
        
    $(function(){

//First get all animated elements in var text
var text = $(".aniElement");
// start animating first elemnt to trigger animation sequence
var animationType = ($(text[0]).data('animation'))
$(".active").find(".aniElement").first().removeClass('hidden');
$(".active").find(".aniElement").first().addClass(animationType);

  
  $('#myCarousel').on('slid.bs.carousel', function () {
   // console.log('Slide no 2 should become visible now');
   $(".active").find(".aniElement").first().removeClass('hidden');
      console.log($(".active").find(".aniElement").first());
     var anType = $(".active").find(".aniElement").first().data('animation');
  //     console.log($(".active").find(".aniElement").first());
  $(".active").find(".aniElement").first().addClass(anType);
})
//  
$("#myCarousel").on('slide.bs.carousel', function (){
  $(".active").find(".aniElement").addClass('hidden');
});
  
  $.each(text, function (index, element) {
    $(element).on("animationend", function() {
   //  console.log(element);
        var next = $(element).next();
        var classname = $(element).data('animation');
          $(element).removeClass('hidden');
        $(element).removeClass(classname);

        if (next) {
          var addanmation = $(next).data('animation');
          $(next).removeClass('hidden');
          $(next).addClass(addanmation);

        }
    });
    });
});