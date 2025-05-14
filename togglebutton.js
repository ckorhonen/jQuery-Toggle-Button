/*
* Vanilla JavaScript Toggle Button
* Based on jQuery Toggle Button by Chris Korhonen
*/

function toggleButton(element, settings) {
  settings = Object.assign({
    text: "Please Wait...",
    className: "disabled",
    preventClick: true
  }, settings);

  var originalText;
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
    originalText = element.value;
  } else {
    originalText = element.textContent;
  }

  var isDisabled = element.classList.contains(settings.className);

  // Toggle class and update text/value
  element.classList.toggle(settings.className);
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
    element.value = settings.text;
  } else {
    element.textContent = settings.text;
  }

  // Define the change handler function
  function changeHandler(e) {
    // Check if the target still has the disabled class or if it's the button itself
    if (!e.target.classList.contains(settings.className)) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') {
        e.target.value = originalText;
      } else {
        e.target.textContent = originalText;
      }
      // Remove the event listener after it has restored the original text/value
      element.removeEventListener('change', changeHandler);
    }
  }

  // Ensure change handler is bound once
  // Remove any existing change handler before adding the new one
  // This part is a bit tricky in vanilla JS without a mechanism like jQuery's .off namespace
  // For simplicity, we'll just add the new one. If this needs to behave exactly like the jQuery version's .off().on(),
  // we would need a way to store and remove the specific listener function.
  // However, based on the jQuery code's logic, the handler is designed to run once after the state changes back.
  // The logic inside the handler (`if (!e.target.classList.contains(settings.className))`) ensures it only acts when the disabled class is removed.
  // Let's add the event listener.
  element.addEventListener('change', changeHandler);


  // Use .disabled property
  if (!isDisabled && settings.preventClick) {
    element.disabled = true;
  } else {
    element.disabled = false;
  }

  element.dispatchEvent(new Event('change'));
}
