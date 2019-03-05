jQuery(function ($) {
  'use strict';

  /**
   * Parse confirmation message and append it to the page
   */
  function confirmationMessage() {
    let location = document.location.toString();
    if (location.toString().indexOf('?mc-message=') > 0) {
      let message = (location.split('?mc-message='))[1];

      $('#mc-message').text(decodeURI(message || ''));
    }
  }

  confirmationMessage();
});
