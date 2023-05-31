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
  Drupal.behaviors.glossaryTermTooltips = {
    attach: function (context, settings) {
      console.log('here')
      // Verificar si la propiedad 'terms' existe en el objeto de configuración de Drupal.
      if (
        typeof settings.glossary_term !== 'undefined' &&
        typeof settings.glossary_term.terms !== 'undefined'
      ) {
        // Obtén los términos del glosario del objeto de configuración de Drupal.
        let glossaryTerms = settings.glossary_term.terms;
        console.log(glossaryTerms);

        // Agrega tooltips a los nodos que contienen palabras clave del glosario.
        $(once('glossaryTooltip', '.glossary-highlight', context)).each(function () {
          let term = $(this).text().trim();
          

          // Verifica si el término está en el glosario.
          if (term in glossaryTerms) {
            let description = glossaryTerms[term];
            let tooltipOptions = {
              content: description,
              position: { my: 'left top', at: 'left bottom', collision: 'flipfit' },
              show: { effect: 'fade', duration: 300 },
              hide: { effect: 'fade', duration: 300 },
            };

            // Agrega el tooltip utilizando jQuery UI Tooltip.
            $(this).tooltip(tooltipOptions);
          }
        });
      }
    }
  };
})(jQuery);