$(document).ready(function () {
   $('#open-menu').on('click', function () {
       $('#main-nav').addClass('visible');
       $('.dark-overlay').addClass('visible');
   });

   $('#close-menu').on('click', function () {
      $('#main-nav').removeClass('visible');
      $('.dark-overlay').removeClass('visible');
   });
});