// file: js/script.js


 /**
 * Validates the user's completion of each of the form's elements.
 */
(function formValidiation() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() == false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    submitted = true;
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false)
})();
