/*
* jQuery Toggle Button
* by Chris Korhonen (sourcebottle.net)
* http://github.com/ckorhonen/jQuery-Toggle-Button
*
* Licensed under the MIT License:
* http://www.opensource.org/licenses/mit-license.php
*/

$.fn.toggleButton = function(settings) {
  settings = $.extend({
    text: "Please Wait...",
    className: "disabled",
    preventClick: true
  }, settings);

  var originalText = $(this).text();
  if(!originalText){
    originalText = $(this).val(); // Use .val() for input elements
  }
  
  var isDisabled = $(this).hasClass(settings.className);
  
  // Toggle class and update text/value
  $(this).toggleClass(settings.className);
  if ($(this).is('input, textarea, button')) {
    $(this).val(settings.text);
  } else {
    $(this).text(settings.text);
  }
  
  // Ensure change handler is bound once using .off().on()
  $(this).off('change.toggleButton').on('change.toggleButton', function(e) {
    // Check if the target still has the disabled class or if it's the button itself
    if (!$(e.target).hasClass(settings.className)) {
       if ($(e.target).is('input, textarea, button')) {
        $(e.target).val(originalText);
      } else {
        $(e.target).text(originalText);
      }
    }
  });
  
  // Use .prop() for disabled property
  if (!isDisabled && settings.preventClick) {
    $(this).prop('disabled', true);
  } else {
    $(this).prop('disabled', false);
  }
  
  $(this).trigger('change');
};