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
  Drupal.behaviors.glossaryTooltip = {
    attach: function (context) {
      $('.glossary-highlight', context).each(function () {
        alert('estoy aqui');
        const $term = $(this);
        const description = $term.data('description');
        const truncatedDescription = truncateDescription(description, 100);

        $term.addClass('glossary-term');
        $term.attr('title', truncatedDescription);
        $term.tooltip({
          show: { delay: 500 },
          hide: { delay: 0 }
        });
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