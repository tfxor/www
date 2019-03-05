jQuery(function($) {
  'use strict';

  const $line = $('.line');
  const $input = $('.input');
  const $menu = $('#menu-toggle');

  $menu.click(function() {
    $(this).toggleClass('open');
    $('.logo-block').toggleClass('open-menu');

    if ($menu.hasClass('open')) {
      $('html').css('overflow', 'hidden');
      $('.mob-hidden').addClass('hidden');
    } else {
      $('html').css('overflow', 'scroll');
      $('.mob-hidden').removeClass('hidden');
    }
  });

  $(window).on('scroll', function() {
    const $element = $('.logo-hide, .plans-page, .main-bg, .all-pages, .header-bg');
    if ($(this).scrollTop() > 0) {
      $element.addClass('scroll-block');
      $line.hide();
    } else {
      $element.removeClass('scroll-block');
      $line.show();
    }
  });

  $input.hover(
    function() { $(this).parent().addClass('focus_input'); },
    function() { $(this).parent().removeClass('focus_input'); }
  );

  $('.question-block, .close-answer').on('click', function() {
    $(this).parent().find('.show-me').toggleClass('hidden');
    $(this).parent().find('.open').toggleClass('hidden');
    $(this).parent().find('.close').toggleClass('hidden');
  });

  let $btn1 = $('#switch');
  let $btn2 = $('#switch_second');

  function checked($btn){
    $('.plans-check').toggleClass('yearly-price');
    $('.table-plans').toggleClass('table-yearly-price');

    $btn.prop('checked', !$btn.prop('checked'));
  }

  $btn1.on('change', function() {
    checked($btn2);
  });

  $btn2.on('change', function() {
    checked($btn1);
  });

  $('.team-show-more, .team-less-more, .info, .avatar').on('click', function(e) {
    e.preventDefault();

    let $parentBlock = $(this).parents('.blocks');
    let $hiddenBlock = $parentBlock.find('.hidden-block');

    $parentBlock.find('.team-less-more').toggleClass('hidden');
    $parentBlock.find('.team-show-more').toggleClass('hidden');

    $hiddenBlock.toggleClass('hidden');
    $parentBlock.find('.info').toggleClass('dots');

    if ($hiddenBlock.hasClass('hidden')) {
      $('html, body').animate({
        scrollTop: $parentBlock.offset().top - 80
      }, 200);
    }
  });

  $('.hidden-link').on('click', function(e) {
    e.preventDefault();

    let $plans = $('.table-plans');
    $plans.children('.cols').removeClass('active');
    $('html, body').animate({
      scrollTop: $plans.offset().top - 165
    }, 1400);

    let plan = $(this).data('plan');
    $(`.${plan}`).addClass('active');
  });

  if ($('.plans-blocks').hasClass('slick-center')) {
    $('.slick-center').find('.hidden-link').removeClass('hidden');
  }
});
