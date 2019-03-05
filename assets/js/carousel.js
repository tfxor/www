jQuery(function ($) {
  'use strict';

  const $plans = $('.plans-blocks');
  const $wrapper = $('.carousel-plans');
  const $carouselSchema = $('.carousel-schema');

  $wrapper.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    centerMode: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 2000,
        settings: 'unslick'
      },
      {
        breakpoint: 680,
        settings: {
          infinite: true,
          dots: true,
          centerMode: true,
          focusOnSelect: true,
          slidesToShow: 1,
          initialSlide: 0,
          arrows: false
        }
      },
    ]
  });

  $carouselSchema.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 2000,
        settings: 'unslick'
      },
      {
        breakpoint: 992,
        settings: {
          infinite: false,
          dots: true,
          focusOnSelect: true,
          slidesToShow: 2,
          initialSlide: 1,
          arrows: true
        }
      },
      {
        breakpoint: 680,
        settings: {
          infinite: false,
          dots: true,
          slidesToShow: 1,
          initialSlide: 0,
          arrows: true
        }
      }
    ]
  });

  $(window).on('resize', function () {
    if ($(window).width() < 680) {
      $plans.not('.slick-center').removeClass('active');
    }
  });

  function hideUnfocused() {
    $('.hidden-link').not('.slick-center').addClass('hidden');
    $plans.not('.slick-center').removeClass('active');
  }

  $plans.on('click', function () {
    hideUnfocused();
    $(this).find('.hidden-link').removeClass('hidden');
    $(this).addClass('active');

    $plans.each(function () {
      $(this).removeClass('active');
    });

    $(this).addClass('active');
  });
});
