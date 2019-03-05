jQuery(function($) {
  'use strict';

  const inputForm = $('.input');
  const $subscribeForm = $('#subscribe-form');
  const subscriptionBtn = $('#submit-form-subscribe');

  /**
   * MailChimpForm configuration
   */
  $('#contact-us').MailChimpForm({
    url:'https://mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=d87b64561f',
    fields: '0:EMAIL,1:FNAME,2:COMPANY,3:WEBSITE,4:MESSAGE',
    inputSelector:'.input',
    submitSelector: '#submit-form',
    onFail: function(errMsg) {
      let $genErr = $('#mc-general-error');
      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => { $genErr.html(''); }, 5000);
    },
    onOk: function(okMsg) {
      window.location = `/contact-successful/?mc-message=${okMsg}`;
    }
  });

  $subscribeForm.MailChimpForm({
    url: 'https://mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&amp;id=e75049837b',
    fields: '0:EMAIL',
    inputSelector: '.input',
    submitSelector: '#submit-form-subscribe',
    onFail: function(errMsg) {
      let $genErr = $('#mc-general');
      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => { $genErr.html(''); }, 5000);
    },
    onOk: function(okMsg) {
      window.location = `/contact-successful/?mc-message=${okMsg}`;
    }
  });

  $subscribeForm.on('submit', function(e) {
    e.preventDefault();
    $(subscriptionBtn).trigger('click');
  });

  $('#subscribe-form-blog').MailChimpForm({
    url: 'https://mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&amp;id=e75049837b',
    fields: '0:EMAIL',
    inputSelector: '.input',
    submitSelector: '#submit-blog-subscride',
    onFail: function(errMsg) {
      let $genErr = $('#mc-general');
      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => { $genErr.html(''); }, 5000);
    },
    onOk: function(okMsg) {
      window.location = `/contact-successful/?mc-message=${okMsg}`;
    }
  });

  /**
   * mc:input:error event handler
   */
  inputForm.on('mc:input:error', function() {
    $(this).addClass('error');
  });

  /**
   * mc:input:error event handler
   */
  inputForm.on('mc:input:ok', function() {
    $(this).removeClass('error');
  });
});
