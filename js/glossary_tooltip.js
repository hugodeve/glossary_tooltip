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
      let selector = drupalSettings.glossaryTooltip && drupalSettings.glossaryTooltip.selector ? drupalSettings.glossaryTooltip.selector : '.glossary-tooltip';

      $(selector, context).each(function () {
        let $term = $(this);

        if (!$term.hasClass('glossary-tooltip-processed')) {
          let termText = $term.text();
          let description = drupalSettings.glossaryTooltip.terms[termText];
          console.log(description)
          let $tooltip = $('<div class="glossary-tooltip-tooltip"></div>');
          let $content = $('<div class="glossary-tooltip-content"></div>');
          let $description = $('<span class="glossary-tooltip-description"></span>').html(highlightTerms(description, termText));
          let $readMore = $('<a class="glossary-tooltip-read-more" href="#"></a>').text('Read more');

          $content.append($description, $readMore);
          $tooltip.append($content);

          $term.hover(
            function () {
              $term.append($tooltip);
            },
            function () {
              $tooltip.remove();
            }
          );

          $term.addClass('glossary-tooltip-processed');
        }
      });
    }
  };

  function highlightTerms(text, term) {
    let regex = new RegExp('(' + term + ')', 'gi');

    let highlightedText = text.replace(regex, '<span class="glossary-tooltip-highlight">$1</span>');

    return highlightedText;
  }
})(jQuery, Drupal, drupalSettings);