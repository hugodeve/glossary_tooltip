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

(function ($) {
  Drupal.behaviors.glossary_tooltip = {
    attach: function (context) {
      $(once('glossary-tooltip', '.glossary-highlight', context)).each(function () { 
        const $term = $(this);
        const description = $term.data('description');
        const truncatedDescription = truncateDescription(description, 100);
        const $tooltipContent = $('<span class="glossary-tooltiptext">' + truncatedDescription + '</span>');
        const $readMoreLink = $('<a href="/glossary/' + encodeURIComponent($term.text()) + '">Read more</a>');
        
        $term.addClass('glossary-term');
        $term.addClass('glossary-tooltip');

        $term.append($tooltipContent);
        $term.append($readMoreLink);

        $term.hover(
          function () {
            $tooltipContent.show();
          },
          function () {
            $tooltipContent.hide();
          }
        );
      });
    }
  };

  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      let truncatedString = description.substring(0, maxLength);
      const lastSpaceIndex = truncatedString.lastIndexOf(' ');
      truncatedString = truncatedString.substring(0, lastSpaceIndex);
      return truncatedString;
    }
    return description;
  }
})(jQuery);