(function (Drupal, drupalSettings) {
  Drupal.behaviors.glossaryTerm = {
    attach: function (context) {
      // Get the glossary terms from drupalSettings.
      let terms = drupalSettings.glossary_term && drupalSettings.glossary_term.terms ? drupalSettings.glossary_term.terms : {};

      // Iterate through each glossary term in the content.
      let glossaryTerms = document.querySelectorAll('.glossary-term');
      glossaryTerms.forEach(function (term) {
        let keyword = term.textContent;
        let description = terms[keyword];
        console.log(description);

        if (description) {
          // Create the tooltip element with the description.
          let tooltip = document.createElement('span');
          tooltip.className = 'glossary-termtext';
          tooltip.textContent = description;

          // Append the tooltip element after the keyword element.
          term.parentNode.insertBefore(tooltip, term.nextSibling);
        }
      });
    }
  };
})(Drupal, drupalSettings);