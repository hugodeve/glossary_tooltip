function sendMessageToBackgroundScript(message) {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage(message, function (response) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.glossaryTooltip = {
    attach: function (context) {
      var selector = drupalSettings.glossaryTooltip && drupalSettings.glossaryTooltip.selector ? drupalSettings.glossaryTooltip.selector : '.glossary-tooltip';

      $(selector, context).each(function () {
        var $term = $(this);

        if (!$term.hasClass('glossary-tooltip-processed')) {
          var $tooltip = $('<div class="glossary-tooltip-tooltip"></div>');
          var description = drupalSettings.glossaryTooltip.terms[$term.text()];
          $tooltip.text(description);
          $term.hover(
            function () {
              $tooltip.appendTo('body');
            },
            function () {
              $tooltip.remove();
            }
          );
          $term.mousemove(function (e) {
            $tooltip.css({
              top: e.clientY + 10,
              left: e.clientX + 10
            });
          });

          $term.addClass('glossary-tooltip-processed');

          // Send a message to the background script and wait for the response
          sendMessageToBackgroundScript({ processedTerm: $term.text() })
            .then(function (response) {
              // Handle the response from the background script
              console.log(response);
            })
            .catch(function (error) {
              // Handle any errors that occurred
              console.error(error);
            });
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);