(function ($, Drupal) {
  Drupal.behaviors.glossaryTooltip = {
    attach: function (context) {
      $('.glossary-tooltip', context).each(function () {
        let description = $(this).data('description');
        console.log(description)
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
})(jQuery, Drupal);