var state = "expanded";
//Check if navbar is expanded or minimized and handle 
$('#navbar-toggle').click(function() {
    if (state == "expanded") {
        $('.sidebar').css('margin-left', '-180px');
        state = "minimized";
    } else {
        if (state == "minimized") {
            $('.sidebar').css('margin-left', '0px');
            state = "expanded";
        }
    }
});

// user content
$('.btn-expand-collapse').click(function(e) {
	$('.navbar-primary').toggleClass('collapsed');
});

//  carousel
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
	