(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          form.querySelector('.loading').classList.remove('d-block');
          if (response.ok) {
            form.querySelector('.sent-message').classList.add('d-block');
            form.reset();
          } else {
            response.json().then(data => {
              throw new Error(data.error || 'Form submission failed.');
            });
          }
        })
        .catch(error => {
          form.querySelector('.error-message').innerHTML = error;
          form.querySelector('.error-message').classList.add('d-block');
        });
    });
  });
})();