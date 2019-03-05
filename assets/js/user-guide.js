/* eslint-disable */

jQuery(function($) {
  'use strict';

  /**
   * Init Flatdoc runner
   * (uses https://github.com/MitocGroup/atm/blob/master/docs/get-started-3rd-party.md)
   * @type {Flatdoc.runner}
   */
  var runner = new Flatdoc.runner({
    fetcher: Flatdoc.file('https://mitocgroup.github.io/atm/get-started-3rd-party.md')
  });

  runner.run();

});
