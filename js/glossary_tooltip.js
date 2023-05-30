(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.glossaryTooltip = {
    attach: function (context) {
      $(drupalSettings.glossary_tooltip.selector, context).each(function () {
        var description = $(this).data('description');
        $(this).tooltip({
          content: description,
          show: {
            effect: 'slide',
            duration: 300
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);